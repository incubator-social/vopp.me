'use client';

import { useParams } from 'next/navigation';

export default function UserProfilePage() {
  const params = useParams<{ id: string }>();
  const userId = params.id;

  return (
    <div style={{ padding: 20 }}>
      <h1>Профиль пользователя {userId}</h1>
      <h2>УРА!!!</h2>
    </div>
  );
}
