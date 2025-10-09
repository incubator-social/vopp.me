'use client';
import { withAuth } from '@/src/shared/hoc/withAuth';

function SettingsPage() {
  return <h1>PROFILE SETTINGS</h1>;
}

export default withAuth(SettingsPage, { requireAuth: true });
