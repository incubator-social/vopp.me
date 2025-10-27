'use client';

import { useParams } from 'next/navigation';
import InfinitePosts from '@/src/features/posts/ui/InfinityPosts';

export default function UserProfilePage() {
  const params = useParams<{ id: string }>();
  const userId = parseInt(params.id);

  if (isNaN(userId)) {
    return <div>Неверный ID пользователя</div>;
  }

  return (
    <div style={{ padding: 20, maxWidth: 1200, margin: '0 auto' }}>
      <h1>Профиль пользователя {userId}</h1>
      <InfinitePosts userId={userId} />
    </div>
  );
}
