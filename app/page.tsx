import { Header } from '@/src/components/Header/Header';

export default function Home() {
  return (
    <div style={{ padding: '10px' }}>
      <div>
        <Header />
        <h1>VOPP.ME</h1>
      </div>
      <main>{/* КОНТЕНТ */}</main>
      <footer>
        <p className="small-text">© 2025 Все права защищены</p>
      </footer>
    </div>
  );
}
