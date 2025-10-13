'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/src/shared/ui/Button/Button';
import { ROUTES } from '@/src/shared/config/routes';
import { useAuth } from '@/src/features/auth/lib/useAuth';

export default function UserProfilePage() {
  const params = useParams<{ id: string }>();
  const userId = params.id;
  const { user } = useAuth();
  const isMyProfile = user?.userId === Number(params.id);

  return (
    <div style={{ padding: 20 }}>
      <h1>Профиль пользователя {userId}</h1>

      {isMyProfile && (
        <Button variant={'buttonSecondary'} asChild={true}>
          <Link href={ROUTES.SETTINGS}>Profile Settings</Link>
        </Button>
      )}
    </div>
  );
}
