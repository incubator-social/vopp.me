'use client';

import { useParams } from 'next/navigation';
import InfinitePosts from '@/src/features/posts/ui/InfinityPosts/InfinityPosts';
import styles from './page.module.scss';
import { useAuth } from '@/src/features/auth/lib/useAuth';
import { PostModal } from '@/src/widgets/post/ui/PostModal/PostModal';
import { useState } from 'react';
import { ProfileHeader } from '@/src/features/profile/ui/ProfileHeader/ProfileHeader';
import { usePublicProfile } from '@/src/features/profile/lib/usePublicProfile';

export default function UserProfilePage() {
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const params = useParams<{ id: string }>();
  const userId = parseInt(params.id);
  const { user } = useAuth();
  const { profile, isLoading: profileLoading, error: profileError } = usePublicProfile(userId);
  const isMyProfile = user?.userId === userId;

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

  // {isMyProfile && (
  //   <Button variant={'buttonSecondary'} asChild={true}>
  //     <Link href={ROUTES.SETTINGS}>Profile Settings</Link>
  //   </Button>
  // )}
  // {/* Уберем эту кнопку, нужна для демонстрации, так же передаю id хардкодом */}
  // <button onClick={() => setOpen(true)}>Open post</button>
  // <PostModal open={open} setOpenPostModal={setOpen} postId={562} />

  return (
    <div className={styles.container}>
      <ProfileHeader
        profile={profile}
        isMyProfile={isMyProfile}
        onFollowClick={handleFollowClick}
        onMessageClick={handleMessageClick}
      />
      <InfinitePosts userId={userId} onPostClick={setSelectedPostId} />
      {selectedPostId && (
        <PostModal open={true} setOpenPostModal={(open) => !open && setSelectedPostId(null)} postId={selectedPostId} />
      )}
    </div>
  );
}
