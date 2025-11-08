import { Avatar } from '@/src/shared/ui/Avatar/Avatar';
import { Button } from '@/src/shared/ui/Button/Button';
import styles from './ProfileHeader.module.scss';
import Link from 'next/link';
import { ROUTES } from '@/src/shared/config/routes';

interface ProfileHeaderProps {
  profile: {
    id: number;
    userName: string;
    aboutMe: string;
    avatars: Array<{ url: string }>;
    userMetadata: {
      following: number;
      followers: number;
      publications: number;
    };
    isFollowing?: boolean;
  };
  isMyProfile: boolean;
  onFollowClick?: () => void;
  onMessageClick?: () => void;
}

export const ProfileHeader = ({ profile, isMyProfile, onFollowClick, onMessageClick }: ProfileHeaderProps) => {
  return (
    <div className={styles.header}>
      {/* Аватар */}
      <div className={styles.avatarContainer}>
        <Avatar src={profile.avatars[0]?.url} name={profile.userName} size={204} className={styles.avatar} />
      </div>

      {/* Информация */}
      <div className={styles.info}>
        <div className={styles.usernameRow}>
          <h1 className={styles.username}>{profile.userName}</h1>

          {/* Кнопки действий */}
          <div className={styles.actions}>
            {isMyProfile ? (
              <Button variant="buttonSecondary" asChild>
                <Link href={ROUTES.SETTINGS}>Profile Settings</Link>
              </Button>
            ) : (
              <>
                <Button variant="buttonPrimary" onClick={onFollowClick}>
                  {profile.isFollowing ? 'Unfollow' : 'Follow'}
                </Button>
                <Button variant="buttonOutline" onClick={onMessageClick}>
                  Message
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Статистика */}
        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statNumber}>{profile.userMetadata.publications}</span>
            <span className={styles.statLabel}>posts</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNumber}>{profile.userMetadata.followers}</span>
            <span className={styles.statLabel}>followers</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNumber}>{profile.userMetadata.following}</span>
            <span className={styles.statLabel}>following</span>
          </div>
        </div>

        {/* Био */}
        <p className={styles.bio}>{profile.aboutMe}</p>
      </div>
    </div>
  );
};
