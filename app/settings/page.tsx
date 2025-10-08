import { redirect } from 'next/navigation';
import { ROUTES } from '@/src/shared/config/routes';

export default function Settings() {
  redirect(`${ROUTES.SETTINGS}?part=info`);
}
