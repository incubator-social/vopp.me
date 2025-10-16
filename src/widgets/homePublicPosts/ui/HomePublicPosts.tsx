'use client';
import { useAppDispatch, useAppSelector } from '@/app/providers/store/hooks';
import { postsApi, useGetPublicPostsQuery } from '@/src/entities/post/api/postsApi';
import { PostsResponse } from '@/src/entities/post/model/posts.schemas';
import { useEffect, useRef } from 'react';

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
  // проверяем кэш
  const dataFromCache = useAppSelector((state) => postsApi.endpoints.getPublicPosts.select(defaultArgs)(state).data);

  // ref нужен, чтобы гидрировать только один раз
  const needHydrateStateRef = useRef(!!initialPosts.items && !dataFromCache?.items);

  const {
    data: postsData,
    isFetching,
    error
  } = useGetPublicPostsQuery(defaultArgs, { skip: needHydrateStateRef.current });

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
    <ul>
      {dataForRender.map((post) => (
        <li key={post.id} style={{ marginBottom: '20px' }}>
          <p>
            <strong>{post.userName}</strong>: {post.description}
          </p>
          {post.images[0] && (
            <img src={post.images[0].url} alt={post.description ?? ''} width={200} style={{ borderRadius: 8 }} />
          )}
        </li>
      ))}
    </ul>
  );
};
