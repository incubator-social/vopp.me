import styles from './page.module.css';
import { Input } from '@/src/components/ui/Input/Input';

export default function Home() {
  return (
    <div className={styles.page}>
      <div>VOPP.ME</div>
      <Input placeholder="VOPP.ME" />
      <main className={styles.main}></main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
