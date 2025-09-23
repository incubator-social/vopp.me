import ConfirmCodePage from '@/app/auth/confirm-code/ConfirmCodePage';

export default async function HomePage({
  searchParams
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;

  const code = params?.code || undefined;
  const email = params?.code || undefined;

  console.log(code);
  console.log(email);

  if (!code && !email) {
    return (
      <div style={{ padding: '10px' }}>
        <main>
          <h1>VOPP.ME</h1>
        </main>
      </div>
    );
  }

  return <ConfirmCodePage code={code} email={email} />;
}
