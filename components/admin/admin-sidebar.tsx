'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Plane,
  MapPin,
  Calendar,
  Mail,
  Users,
  Settings,
  LogOut,
  Image,
  MessageSquare,
  FileText,
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Hero Tours', href: '/admin/hero-tours', icon: Image },
  { name: 'Tours', href: '/admin/tours', icon: Plane },
  { name: 'Destinations', href: '/admin/destinations', icon: MapPin },
  { name: 'Bookings', href: '/admin/bookings', icon: Calendar },
  { name: 'Contacts', href: '/admin/contacts', icon: Mail },
  { name: 'Newsletter', href: '/admin/newsletter', icon: Users },
  { name: 'Testimonials', href: '/admin/testimonials', icon: MessageSquare },
  { name: 'Footer', href: '/admin/footer', icon: FileText },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-screen w-64 flex-col bg-gray-900 text-white">
      <div className="flex h-16 items-center justify-center border-b border-gray-800">
        <h1 className="text-xl font-bold">Door to India Admin</h1>
      </div>
      
      <nav className="flex-1 space-y-1 px-2 py-4">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-gray-800 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <Icon className="h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-gray-800 p-4">
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-800 hover:text-white">
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </div>
    </div>
  );
}
