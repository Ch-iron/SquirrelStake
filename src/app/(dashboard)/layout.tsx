import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { Toaster } from '@/components/ui/sonner';

function OrbBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-cyan-500/20 blur-[120px]" />
      <div className="absolute -right-40 top-1/3 h-[400px] w-[400px] rounded-full bg-emerald-500/15 blur-[120px]" />
      <div className="absolute -bottom-40 left-1/3 h-[450px] w-[450px] rounded-full bg-blue-500/15 blur-[120px]" />
    </div>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <OrbBackground />
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0">
        <Header />
        <main className="flex-1 p-4 md:p-6">
          {children}
        </main>
      </div>
      <Toaster richColors position="bottom-right" />
    </div>
  );
}
