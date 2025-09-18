import type { Metadata } from 'next';
import styles from './layout.module.scss';
import StoreProvider from '@/app/providers/StoreProvider';
import { AlertProvider } from '@/src/shared/ui/Alerts/AlertProvider';
import { Header } from '@/src/widgets/Header/Header';
import '@/src/shared/styles/index.scss';

export const metadata: Metadata = {
  title: 'Vopp.me',
  description: 'Social media vopp.me'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <AlertProvider>
            <Header />
            <main className={styles.main}>{children}</main>
          </AlertProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
