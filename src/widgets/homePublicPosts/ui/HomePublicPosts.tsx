'use client';
import { useAppDispatch, useAppSelector } from '@/app/providers/store/hooks';
import { postsApi, useGetPublicPostsQuery } from '@/src/entities/post/api/postsApi';
import { PostsResponse } from '@/src/entities/post/model/posts.schemas';
import { HomePostCard } from '@/src/widgets/HomePostCard/ui/HomePostCard';
import { useEffect, useRef } from 'react';
import styles from './HomePublicPosts.module.scss';

type Props = {
  initialPosts: PostsResponse;
};

export const HomePublicPosts = ({ initialPosts }: Props) => {
  const dispatch = useAppDispatch();
  const defaultArgs = {
    endCursorPostId: 0,
    pageSize: 4,
    sortBy: 'createdAt',
    sortDirection: 'desc' as const
  };
  // проверяем кэш, достаем его из стора
  const dataFromCache = useAppSelector((state) => postsApi.endpoints.getPublicPosts.select(defaultArgs)(state).data);

  // ref нужен, чтобы гидрировать только один раз, дальше будем скипать
  const needHydrateStateRef = useRef(!!initialPosts.items && !dataFromCache?.items);

  const {
    data: postsData,
    isFetching,
    error
  } = useGetPublicPostsQuery(defaultArgs, {
    skip: needHydrateStateRef.current,
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnReconnect: true
  });

  useEffect(() => {
    if (needHydrateStateRef.current) {
      needHydrateStateRef.current = false;
      const thunk = postsApi.util.upsertQueryData('getPublicPosts', {}, initialPosts);
      dispatch(thunk);
    }
  }, [dispatch, initialPosts]);

  const dataForRender = postsData?.items || initialPosts.items;

  if (isFetching && !dataForRender) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка загрузки</div>;

  return (
    <div>
      <ul className={styles.container}>
        {dataForRender.map((post) => (
          <li key={post.id}>
            <HomePostCard post={post} />
          </li>
        ))}
      </ul>
    </div>
  );
};
