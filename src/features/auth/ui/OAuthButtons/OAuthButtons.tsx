import { gitHubOAuthUrl, googleOAuthUrl } from '@/src/shared/lib/auth';
import styles from './OAuthButtons.module.scss';
import { Button } from '@/src/shared/ui/Button';
import Link from 'next/link';

import GithubIcon from '@/src/shared/assets/icons/github-svgrepo-com.svg';
import GoogleIcon from '@/src/shared/assets/icons/google-svgrepo-com-1.svg';

export const OAuthButtons = () => {
  return (
    <div className={styles.oauthContainer}>
      <Button variant={'buttonText'} size={{ minWidth: 36, padding: 0 }} className={styles.button} asChild={true}>
        <Link href={googleOAuthUrl}>
          <GoogleIcon style={{ width: '36px', height: '36px' }} />
        </Link>
      </Button>

      <Button variant={'buttonText'} size={{ minWidth: 36, padding: 0 }} className={styles.button} asChild={true}>
        <Link href={gitHubOAuthUrl}>
          <GithubIcon style={{ width: '36px', height: '36px' }} />
        </Link>
      </Button>
    </div>
  );
};
