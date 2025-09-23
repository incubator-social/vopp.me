import ConfirmCodePage from '@/app/auth/confirm-code/ConfirmCodePage';

export default async function HomePage({
  searchParams
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;

  const code = params?.code || undefined;

  console.log(code);

  if (!code) {
    return (
      <div style={{ padding: '10px' }}>
        <main>
          <h1>VOPP.ME</h1>
        </main>
      </div>
    );
  }

  return <ConfirmCodePage code={code} />;
}
