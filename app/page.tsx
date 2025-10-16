import { HomePublicPosts } from '@/src/widgets/homePublicPosts/ui/HomePublicPosts';
import { HomeRegisteredUsers } from '@/src/widgets/homeRegisteredUsers/ui/HomeRegisteredUsers';

export default function HomePage() {
  return (
    <div style={{ padding: '10px' }}>
      <h1>VOPP.ME</h1>
      {/* Счётчик пользователей */}
      <HomeRegisteredUsers />
      {/* Список постов */}
      <HomePublicPosts />
    </div>
  );
}
