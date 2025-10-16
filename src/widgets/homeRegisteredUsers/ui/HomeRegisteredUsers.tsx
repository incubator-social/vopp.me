'use client';
import { useAppDispatch, useAppSelector } from '@/app/providers/store/hooks';
import { useGetPublicUsersQuery, userApi } from '@/src/entities/user/api/userApi';
import { useEffect, useRef } from 'react';

type Props = {
  initialUsersCount: number;
};

export const HomeRegisteredUsers = ({ initialUsersCount }: Props) => {
  const dispatch = useAppDispatch();
  const dataFromCache = useAppSelector((state) => userApi.endpoints.getPublicUsers.select()(state).data);
  // 📌 общее количество пользователей
  const needHydrateStateRef = useRef(!!initialUsersCount && !dataFromCache);

  const { data, isFetching, error } = useGetPublicUsersQuery(undefined, { skip: needHydrateStateRef.current });
  useEffect(() => {
    if (needHydrateStateRef.current) {
      needHydrateStateRef.current = false;
      const thunk = userApi.util.upsertQueryData('getPublicUsers', undefined, { totalCount: initialUsersCount });
      dispatch(thunk);
    }
  }, [dispatch, initialUsersCount]);

  const dataForRender = data?.totalCount || initialUsersCount;

  if (isFetching) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка загрузки</div>;

  return <p>Всего зарегистрированных пользователей: {dataForRender ?? 0}</p>;
};
