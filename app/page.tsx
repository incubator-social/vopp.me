import { headers } from 'next/headers';

export default async function Home() {
  const header = await headers();

  const searchParams = new URLSearchParams(header.get('x-nextjs-query') || '');
  const code = searchParams.get('code');

  console.log(code);

  return (
    <div style={{ padding: '10px' }}>
      <main>
        <h1>VOPP.ME</h1>
      </main>
    </div>
  );
}
