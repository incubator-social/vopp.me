import type { Metadata } from 'next';
import StoreProvider from '@/app/providers/store/StoreProvider';
import { AlertProvider } from '@/src/shared/ui/Alerts/AlertProvider';
import '@/src/shared/styles/index.scss';
import styles from './layout.module.scss';
import { Header } from '@/src/widgets/Header/Header';
import { SidebarWrapper } from '@/src/widgets/SidebarWrapper/SidebarWrapper';

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
            <SidebarWrapper />
            <main className={styles.main}>{children}</main>
          </AlertProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
