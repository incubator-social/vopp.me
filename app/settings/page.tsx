'use client';
import { withAuth } from '@/src/shared/hoc/withAuth';

function SettingsPage() {
  return <div>PROFILE SETTINGS</div>;
}

export default withAuth(SettingsPage, { requireAuth: true });
