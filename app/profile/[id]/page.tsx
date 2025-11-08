'use client';

import { useParams } from 'next/navigation';
import InfinitePosts from '@/src/features/posts/ui/InfinityPosts';
import styles from './page.module.scss';
import { useAuth } from '@/src/features/auth/lib/useAuth';
import { ProfileHeader } from '@/src/features/profile/ui/ProfileHeader/ProfileHeader';
import { usePublicProfile } from '@/src/features/profile/lib/usePublicProfile';

export default function UserProfilePage() {
  const params = useParams<{ id: string }>();
  const userId = parseInt(params.id);
  const { user } = useAuth();

  const { profile, isLoading: profileLoading, error: profileError } = usePublicProfile(userId);
  const isMyProfile = user?.userId === Number(params.id);

  if (isNaN(userId)) {
    return <div>Неверный ID пользователя</div>;
  }

  if (profileError) {
    return <div>Ошибка загрузки профиля</div>;
  }

  if (profileLoading || !profile) {
    return (
      <div className={styles.container}>
        <div>Загрузка профиля...</div>
        <InfinitePosts userId={userId} />
      </div>
    );
  }

  const handleFollowClick = () => {
    // Логика подписки/отписки
    console.log('Follow/Unfollow clicked');
  };

  const handleMessageClick = () => {
    // Логика сообщения
    console.log('Message clicked');
  };

  return (
    <div className={styles.container}>
      <ProfileHeader
        profile={profile}
        isMyProfile={isMyProfile}
        onFollowClick={handleFollowClick}
        onMessageClick={handleMessageClick}
      />
      <InfinitePosts userId={userId} />
    </div>
  );
}
