'use client';

import { SignUpForm } from '@/src/features/auth/sign-up/ui/SignUpForm';
import Card from '@/src/shared/ui/Card/Card';
import GithubIcon from '@/src/shared/assets/icons/github-svgrepo-com.svg';
import GoogleIcon from '@/src/shared/assets/icons/google-svgrepo-com-1.svg';

import styles from './SignUpPage.module.scss';

export default function SignUpPage() {
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        <Card className={styles.card}>
          {/* Заголовок */}
          <h1 className={styles.title}>Sign Up</h1>

          {/* Блок OAuth */}
          <div className={styles.oauthSection}>
            <div className={styles.oauthContainer}>
              <button type="button" className={styles.oauthButton}>
                <GithubIcon className={styles.oauthIcon} />
              </button>
              <button type="button" className={styles.oauthButton}>
                <GoogleIcon className={styles.oauthIcon} />
              </button>
            </div>
          </div>

          {/* Форма регистрации */}
          <SignUpForm />

          {/* Ссылка на вход */}
          <div className={styles.signInSection}>
            <span className={styles.signInText}>Do you have an account?</span>
            <a href="/auth/sign-in" className={styles.signInLink}>
              Sign In
            </a>
          </div>
        </Card>
      </div>
    </div>
  );
}
