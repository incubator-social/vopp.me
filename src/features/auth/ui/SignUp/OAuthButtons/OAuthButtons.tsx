import { ROUTES } from '@/src/shared/config/routes';
import styles from './OAuthButtons.module.scss';
import { Button } from '@/src/shared/ui/Button';
import Link from 'next/link';

import GithubIcon from '@/src/shared/assets/icons/github-svgrepo-com.svg';
import GoogleIcon from '@/src/shared/assets/icons/google-svgrepo-com-1.svg';

export const OAuthButtons = () => {
  const githubAuthLink = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/github/login?redirect_url=${process.env.NEXT_PUBLIC_APP_URL}${ROUTES.AUTH.GET_TOKEN_FROM_GITHUB}`;

  return (
    <div className={styles.oauthContainer}>
      <Button variant={'buttonText'} size={{ minWidth: 36, padding: 0 }} className={styles.button} asChild={true}>
        <GoogleIcon style={{ width: '36px', height: '36px' }} />
      </Button>

      <Button variant={'buttonText'} size={{ minWidth: 36, padding: 0 }} className={styles.button} asChild={true}>
        <Link href={githubAuthLink}>
          <GithubIcon style={{ width: '36px', height: '36px' }} />
        </Link>
      </Button>
    </div>
  );
};
