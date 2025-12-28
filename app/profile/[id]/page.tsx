'use client';

import { useParams } from 'next/navigation';
import InfinitePosts from '@/src/features/posts/ui/InfinityPosts/InfinityPosts';
import styles from './page.module.scss';
import { useAuth } from '@/src/features/auth/lib/useAuth';
import { ProfileHeader } from '@/src/features/profile/ui/ProfileHeader/ProfileHeader';
import { usePublicProfile } from '@/src/features/profile/lib/usePublicProfile';
import { usePostModalQuery } from '@/src/shared/hooks/usePostModalQuery';
import { PostModalController } from '@/src/widgets/post-modal/';

export default function UserProfilePage() {
  const params = useParams<{ id: string }>();
  const userId = parseInt(params.id);
  const { user } = useAuth();
  const { profile, isLoading: profileLoading, error: profileError } = usePublicProfile(userId);
  const isMyProfile = user?.userId === userId;

  const { openPost } = usePostModalQuery();

  if (isNaN(userId)) {
    return <div>Invalid user ID</div>;
  }

  if (profileError) {
    return <div>Error loading profile</div>;
  }

  if (profileLoading || !profile) {
    return (
      <div className={styles.container}>
        <div>Loading profile...</div>
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
      <InfinitePosts userId={userId} onPostClick={openPost} />
      <PostModalController />
    </div>
  );
}
