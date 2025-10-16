'use client';
import { useGetPublicUserCountQuery } from '@/src/entities/user/api/userApi';

export const HomeRegisteredUsers = () => {
  // 📌 общее количество пользователей
  const { data: usersData, isFetching: isFetchingUsers, error: usersError } = useGetPublicUserCountQuery();

  if (isFetchingUsers) return <div>Загрузка...</div>;
  if (usersError) return <div>Ошибка загрузки</div>;

  return <p>Всего зарегистрированных пользователей: {usersData?.totalCount ?? 0}</p>;
};
