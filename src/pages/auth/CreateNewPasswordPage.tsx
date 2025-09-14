import { CreateNewPasswordForm } from '@/src/features/auth/reset-confirm/ui/CreateNewPasswordForm';
import Card from '@/src/shared/ui/Card/Card';

type Props = { token?: string };

export default function CreateNewPasswordPage({ token }: Props) {
  return (
    <Card>
      <CreateNewPasswordForm token={token} />
    </Card>
  );
}
