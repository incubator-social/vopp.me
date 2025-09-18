import Link from 'next/link';
import s from './not-found.module.scss';
import ArrowBackOutline from '@/src/shared/assets/icons/arrow-back-outline.svg';

export default function NotFoundPage() {
  return (
    <main className={s.main}>
      <h1 className={s.title}>404 – Страница не найдена</h1>
      <p className={s.text}>К сожалению, запрошенная страница не существует или была удалена.</p>

      <Link href="/" className={s.backLink}>
        <ArrowBackOutline />
        <span>Вернуться на главную</span>
      </Link>
    </main>
  );
}
