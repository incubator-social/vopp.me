'use client';

import GithubIcon from '@/src/shared/assets/icons/github-svgrepo-com.svg';
import GoogleIcon from '@/src/shared/assets/icons/google-svgrepo-com-1.svg';
import styles from './OAuthButtons.module.scss';

export const OAuthButtons = () => {
  return (
    <div className={styles.oauthContainer}>
      <button type="button" className={styles.oauthButton}>
        <GoogleIcon className={styles.oauthIcon} />
      </button>
      <button type="button" className={styles.oauthButton}>
        <GithubIcon className={styles.oauthIcon} />
      </button>
    </div>
  );
};
