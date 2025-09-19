'use client';

import { CreateNewPasswordForm } from '@/src/features/auth/ui/reset-confirm/CreateNewPassword/CreateNewPasswordForm/CreateNewPasswordForm';
import Card from '@/src/shared/ui/Card/Card';

export default function CreateNewPasswordPage() {
  return (
    <Card>
      <CreateNewPasswordForm />
    </Card>
  );
}
