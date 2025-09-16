import styles from './layout.module.scss';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <section className={styles.wrapper}>{children}</section>;
}
