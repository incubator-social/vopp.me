import { PostsResponse, PostsResponseSchema } from '@/src/entities/post/model/posts.schemas';
import MainPage from '@/src/features/MainPage/MainPage';

export default async function HomePage() {
  const responsePulicPosts = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/public-posts/all/0?pageSize=4&sortBy=createdAt&sortDirection=desc`
  );
  const dataPublicPosts = (await responsePulicPosts.json()) as PostsResponse;
  const posts = PostsResponseSchema.parse(dataPublicPosts);

  return <MainPage posts={posts} />;
}
