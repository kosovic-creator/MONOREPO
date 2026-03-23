import '../styles/globals.css';
import type { Metadata } from 'next';

import Navbar from './components/Navbar';
import ClientLayout from './ClientLayout';

export const metadata: Metadata = {
  title: 'Admin App',
  description: 'Admin app in SPORT monorepo',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-black min-h-screen">
        <ClientLayout>
          <Navbar />
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
