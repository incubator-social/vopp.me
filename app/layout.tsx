import type { Metadata } from 'next';

import { Header } from '@/src/widgets/Header';
import { SidebarWrapper } from '@/src/widgets/sidebar-wrapper/ui';
import StoreProvider from '@/app/model/StoreProvider';
import { AlertProvider } from '@/src/shared/ui/Alerts/AlertProvider';
import '@/src/shared/styles/index.scss';

import styles from './layout.module.scss';

export const metadata: Metadata = {
  title: 'Connect with friends and join communities with Vopp.me',
  description: 'Connect with friends and join communities with Vopp.me',
  icons: { icon: '/favicon/favicon.svg' }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <AlertProvider>
            <Header />
            <div className={styles.content}>
              <SidebarWrapper />
              <main className={styles.main}>{children}</main>
            </div>
          </AlertProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
