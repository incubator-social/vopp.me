import { HomePublicPosts } from './HomePublicPosts';
import { HomeRegisteredUsers } from './HomeRegisteredUsers';
import styles from './MainPage.module.scss';
import { PostsResponse } from '@/src/entities/post/model/posts.schemas';

type Props = {
  posts: PostsResponse;
};
export default async function MainPage({ posts }: Props) {
  return (
    <div className={styles.container}>
      <HomeRegisteredUsers usersCount={posts.totalUsers} />
      <HomePublicPosts initialPosts={posts} />
    </div>
  );
}
