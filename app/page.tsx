import { Input } from '@/src/components/ui/Input/Input';
import { Textarea } from '@/src/components/ui/Textarea';

export default function Home() {
  return (
    <div style={{ padding: '10px' }}>
      <div>
        <h1>VOPP.ME</h1>
      </div>
      <main>
        <Textarea placeholder={'HHH'} resize={'vertical'} label={'Email'} />
        <p className="regular-text-16">Добро пожаловать! Это пример текста.</p>

        <p className="bold-text-14">Это жирный текст 14px.</p>

        <a href="#">Обычная ссылка</a>
        <br />

        <a href="#" className="small-link">
          Маленькая ссылка
        </a>
      </main>
      <footer>
        <p className="small-text">© 2025 Все права защищены</p>
      </footer>
    </div>
  );
}
