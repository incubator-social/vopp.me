import CreateNewPasswordPage from '@/src/pages/auth/CreateNewPasswordPage';

export default function Page({ searchParams }: { searchParams: { token?: string } }) {
  return <CreateNewPasswordPage token={searchParams?.token} />;
}
