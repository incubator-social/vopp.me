'use client';

import { useParams, useRouter } from 'next/navigation';
import { ROUTES } from '@/src/shared/config/routes';

export default function UserProfilePage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const userId = params.id;

  const handleLinkClick = () => {
    router.push(`${ROUTES.SETTINGS}?part=info`);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Профиль пользователя {userId}</h1>
      <button onClick={handleLinkClick}>Settings</button>
    </div>
  );
}
