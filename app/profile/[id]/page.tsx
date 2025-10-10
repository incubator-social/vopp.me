'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/src/shared/ui/Button/Button';
import { ROUTES } from '@/src/shared/config/routes';

export default function UserProfilePage() {
  const params = useParams<{ id: string }>();
  const userId = params.id;

  return (
    <div style={{ padding: 20 }}>
      <h1>Профиль пользователя {userId}</h1>
      <Button variant={'buttonSecondary'} asChild={true}>
        <Link href={ROUTES.SETTINGS}>Profile Settings</Link>
      </Button>
    </div>
  );
}
