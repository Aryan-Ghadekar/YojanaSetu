import type { ReactNode } from 'react';
import TricolorBar from '../ui/TricolorBar';
import PublicHeader from './PublicHeader';
import PublicFooter from './PublicFooter';

interface PublicLayoutProps {
  children: ReactNode;
}

const PublicLayout = ({ children }: PublicLayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <TricolorBar />
      <PublicHeader />
      <main className="flex-1">{children}</main>
      <PublicFooter />
    </div>
  );
};

export default PublicLayout;
