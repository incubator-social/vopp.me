'use client';

import GithubIcon from '@/src/shared/assets/icons/github-svgrepo-com.svg';
import GoogleIcon from '@/src/shared/assets/icons/google-svgrepo-com-1.svg';
import styles from './OAuthButtons.module.scss';

export const OAuthButtons = () => {
  return (
    <div className={styles.oauthContainer}>
      <GoogleIcon style={{ width: '36px', height: '36px' }} />
      <GithubIcon style={{ width: '36px', height: '36px' }} />
    </div>
  );
};
