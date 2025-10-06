import { EmailVerification } from '@/src/features/auth/ui/EmailVerification';

export default function EmailVerificationExpiredPage() {
  return <EmailVerification emailStatus="expired_without_input" />;
}
