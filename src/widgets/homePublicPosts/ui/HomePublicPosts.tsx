'use client';
import { useGetPostsQuery } from '@/src/entities/post/api/postsApi';

export const HomePublicPosts = () => {
  // 📌 посты
  const { data: postsData, isFetching: isFetchingPosts, error: postsError } = useGetPostsQuery();
  console.log('postsData', postsData);

  if (isFetchingPosts) return <div>Загрузка...</div>;
  if (postsError) return <div>Ошибка загрузки</div>;

  return (
    <ul>
      {postsData?.items.map((post) => (
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
