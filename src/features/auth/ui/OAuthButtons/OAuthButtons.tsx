import { gitHubOAuthUrl, googleOAuthUrl } from '@/src/shared/lib/auth';
import ALink from '@/src/shared/ui/ALink/ALink';
import styles from './OAuthButtons.module.scss';
import { Button } from '@/src/shared/ui/Button';

import GithubIcon from '@/src/shared/assets/icons/github-svgrepo-com.svg';
import GoogleIcon from '@/src/shared/assets/icons/google-svgrepo-com-1.svg';

export const OAuthButtons = () => {
  return (
    <div className={styles.oauthContainer}>
      <Button variant={'buttonText'} size={{ minWidth: 36, padding: 0 }} className={styles.button} asChild={true}>
        <ALink href={googleOAuthUrl}>
          <GoogleIcon style={{ width: '36px', height: '36px' }} />
        </ALink>
      </Button>

      <Button variant={'buttonText'} size={{ minWidth: 36, padding: 0 }} className={styles.button} asChild={true}>
        <ALink href={gitHubOAuthUrl}>
          <GithubIcon style={{ width: '36px', height: '36px' }} />
        </ALink>
      </Button>
    </div>
  );
};
