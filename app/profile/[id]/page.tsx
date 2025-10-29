'use client';

import { useParams } from 'next/navigation';
import InfinitePosts from '@/src/features/posts/ui/InfinityPosts';
import Link from 'next/link';
import { Button } from '@/src/shared/ui/Button/Button';
import { ROUTES } from '@/src/shared/config/routes';
import { useAuth } from '@/src/features/auth/lib/useAuth';

export default function UserProfilePage() {
  const params = useParams<{ id: string }>();
  const userId = parseInt(params.id);
  const { user } = useAuth();
  const isMyProfile = user?.userId === Number(params.id);

  if (isNaN(userId)) {
    return <div>Неверный ID пользователя</div>;
  }

  return (
    <div style={{ padding: 20, maxWidth: 1200, margin: '0 auto' }}>
      <h1>Профиль пользователя {userId}</h1>

      {isMyProfile && (
        <Button variant={'buttonSecondary'} asChild={true}>
          <Link href={ROUTES.SETTINGS}>Profile Settings</Link>
        </Button>
      )}
      <InfinitePosts userId={userId} />
    </div>
  );
}
