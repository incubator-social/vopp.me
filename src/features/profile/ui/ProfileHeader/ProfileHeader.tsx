import { Avatar } from '@/src/shared/ui/Avatar/Avatar';
import { Button } from '@/src/shared/ui/Button/Button';
import styles from './ProfileHeader.module.scss';
import Link from 'next/link';
import { ROUTES } from '@/src/shared/config/routes';
import { useAuth } from '@/src/features/auth/lib/useAuth';
import { PublicProfileResponse } from '@/src/features/profile/lib/api.types';

type ProfileHeaderProps = {
  profile: PublicProfileResponse;
  isMyProfile: boolean;
  onFollowClick?: () => void;
  onMessageClick?: () => void;
};

export const ProfileHeader = ({ profile, isMyProfile, onFollowClick, onMessageClick }: ProfileHeaderProps) => {
  const { isAuth } = useAuth();

  const stats = [
    { label: 'Following', value: profile.userMetadata.following },
    { label: 'Followers', value: profile.userMetadata.followers },
    { label: 'Publications', value: profile.userMetadata.publications }
  ];

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
            {isAuth &&
              (isMyProfile ? (
                <Button variant="buttonSecondary" asChild>
                  <Link href={ROUTES.SETTINGS}>Profile Settings</Link>
                </Button>
              ) : (
                <>
                  <Button variant="buttonPrimary" onClick={onFollowClick} className={styles.followButton}>
                    {profile.isFollowing ? 'Unfollow' : 'Follow'}
                  </Button>
                  <Button variant="buttonSecondary" onClick={onMessageClick} className={styles.messageButton}>
                    Send Message
                  </Button>
                </>
              ))}
          </div>
        </div>

        {/* Статистика */}
        <div className={styles.stats}>
          {stats.map((stat, index) => (
            <div key={index} className={styles.stat}>
              <span className={styles.statNumber}>{stat.value}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Био */}
        <p className={styles.bio}>{profile.aboutMe}</p>
      </div>
    </div>
  );
};
