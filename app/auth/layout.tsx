'use client';

import { withAuth } from '@/src/shared/hoc/withAuth';
import styles from './layout.module.scss';

function AuthLayout({ children }: { children: React.ReactNode }) {
  return <section className={styles.wrapper}>{children}</section>;
}

export default withAuth(AuthLayout, { requireAuth: false });
