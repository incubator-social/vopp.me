import { ROUTES } from '@/src/shared/config/routes';
import styles from './OAuthButtons.module.scss';
import { Button } from '@/src/shared/ui/Button';
import Link from 'next/link';

import GithubIcon from '@/src/shared/assets/icons/github-svgrepo-com.svg';
import GoogleIcon from '@/src/shared/assets/icons/google-svgrepo-com-1.svg';

export const OAuthButtons = () => {
  const googleOAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?scope=${process.env.NEXT_PUBLIC_GOOGLE_SCOPE}&response_type=code&redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URL}&client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}`;

  const gitHubOAuthUrl = `${process.env.NEXT_PUBLIC_BASE_URL}${ROUTES.GITHUB.AUTHORIZATION}?redirect_url=${process.env.NEXT_PUBLIC_APP_URL}/auth/get-token-github-oauth`;

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
