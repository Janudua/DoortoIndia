'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export function AdminAuthCheck({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Skip auth check for login page
    if (pathname === '/admin/login') {
      return;
    }

    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem('admin_authenticated') === 'true';
    
    if (!isAuthenticated) {
      router.push('/admin/login');
    }
  }, [pathname, router]);

  // If on login page, render children immediately
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  // For other admin pages, check authentication
  if (typeof window !== 'undefined') {
    const isAuthenticated = localStorage.getItem('admin_authenticated') === 'true';
    if (!isAuthenticated) {
      return null;
    }
  }

  return <>{children}</>;
}
