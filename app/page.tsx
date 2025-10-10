import GetTokenGoogleComponent from '@/src/features/auth/ui/GetTokenGoogle/page';

export default async function HomePage({
  searchParams
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  return (
    <div style={{ padding: '10px' }}>
      <main>
        <h1>VOPP.ME</h1>
        <GetTokenGoogleComponent searchParams={searchParams} />
      </main>
    </div>
  );
}
