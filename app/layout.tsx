import type { Metadata } from 'next';
import '../src/shared/styles/index.scss';
import StoreProvider from './StoreProvider';
import { AlertProvider } from '@/src/shared/ui/Alerts/AlertProvider';

export const metadata: Metadata = {
  title: 'Vopp.me',
  description: 'Social media vopp.me'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <AlertProvider>{children}</AlertProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
