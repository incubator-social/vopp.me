'use client';

import { withAuth } from '@/src/shared/hoc/withAuth';
import styles from './layout.module.scss';

function AuthLayoutContent({ children }: { children: React.ReactNode }) {
  return <section className={styles.wrapper}>{children}</section>;
}

export default withAuth(AuthLayoutContent, { requireAuth: false });
