'use client';

import { ReactNode } from 'react';
import { AdminSidebar } from './admin-sidebar';
import { AdminAuthCheck } from './admin-auth-check';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export function AdminLayout({ children }: { children: ReactNode }) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('admin_authenticated');
    toast.success('Logged out successfully');
    router.push('/admin/login');
  };

  return (
    <AdminAuthCheck>
      <div className="flex h-screen bg-gray-100">
        <AdminSidebar />
        <div className="flex-1 overflow-auto">
          <header className="bg-white shadow-sm">
            <div className="flex h-16 items-center justify-between px-8">
              <h2 className="text-2xl font-semibold text-gray-800">Admin Panel</h2>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">Welcome, Admin</span>
                <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                  A
                </div>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </header>
          <main className="p-8">{children}</main>
        </div>
      </div>
    </AdminAuthCheck>
  );
}
