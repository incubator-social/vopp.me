import { notFound } from 'next/navigation';
import fs from 'node:fs/promises';
import path from 'node:path';
import Link from 'next/link';
import ArrowBackOutline from '@/src/shared/assets/icons/arrow-back-outline.svg';
import s from './LegalPage.module.scss';
import { ROUTES } from '@/src/shared/config/routes';

export const dynamic = 'force-static';

const LEGAL_TYPES = ['terms', 'privacy'] as const;
const CONTENT_DIR = path.join(process.cwd(), 'src', 'shared', 'content', 'legal');

type PageProps = { params: Promise<{ type: string }> };

export const generateStaticParams = () => LEGAL_TYPES.map((type) => ({ type }));

const readHtml = async (type: string) => {
  try {
    return await fs.readFile(path.join(CONTENT_DIR, `${type}.html`), 'utf-8');
  } catch {
    return null;
  }
};

export default async function Page({ params }: PageProps) {
  const { type } = await params;

  if (!LEGAL_TYPES.includes(type as (typeof LEGAL_TYPES)[number])) {
    notFound();
  }

  const html = await readHtml(type);
  if (!html) notFound();

  return (
    <main className={s.main}>
      <Link href={ROUTES.AUTH.SIGN_UP} className={s.backLink} aria-label="Back to Sign up">
        <ArrowBackOutline />
        <span>Back to Sign up</span>
      </Link>
      <article className={s.article} dangerouslySetInnerHTML={{ __html: html }} />
    </main>
  );
}
