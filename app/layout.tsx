import type { Metadata } from 'next';
import '../src/shared/styles/index.scss';
import { AlertProvider } from '@/src/shared/ui/Alerts/AlertProvider';

export const metadata: Metadata = {
  title: 'Vopp.me',
  description: 'Social media vopp.me'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AlertProvider>{children}</AlertProvider>
      </body>
    </html>
  );
}
