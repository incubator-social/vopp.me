import { PostsResponse, PostsResponseSchema } from '@/src/entities/post/model/posts.schemas';
import { HomePublicPosts } from '@/src/widgets/homePublicPosts/ui/HomePublicPosts';
import { HomeRegisteredUsers } from '@/src/widgets/homeRegisteredUsers/ui/HomeRegisteredUsers';

export default async function HomePage() {
  const responsePulicPosts = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/public-posts/all/0?pageSize=4&sortBy=createdAt&sortDirection=desc`
  );
  const dataPublicPosts = (await responsePulicPosts.json()) as PostsResponse;
  const posts = PostsResponseSchema.parse(dataPublicPosts);

  const responseRegisteredUsers = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/public-user/`);
  const dataCount = await responseRegisteredUsers.json();

  console.log(posts);
  return (
    <div style={{ padding: '10px' }}>
      <HomeRegisteredUsers initialUsersCount={dataCount.totalCount} />
      <HomePublicPosts initialPosts={posts} />
    </div>
  );
}
