import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin | 2wenty3',
  description: 'Store management dashboard',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ minHeight: '100vh' }}>
      {children}
    </div>
  );
}
