'use client';

import { AdminLayout } from '@/components/admin/admin-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plane, MapPin, Calendar, Mail, Users, TrendingUp, Image, MessageSquare } from 'lucide-react';

const stats = [
  {
    name: 'Total Tours',
    value: '12',
    icon: Plane,
    change: '+12 tours',
    changeType: 'positive',
  },
  {
    name: 'Destinations',
    value: '15',
    icon: MapPin,
    change: '+15 destinations',
    changeType: 'positive',
  },
  {
    name: 'Bookings',
    value: '3',
    icon: Calendar,
    change: 'Active bookings',
    changeType: 'positive',
  },
  {
    name: 'Newsletter Subscribers',
    value: '5',
    icon: Users,
    change: '5 subscribers',
    changeType: 'positive',
  },
  {
    name: 'Hero Tours',
    value: '3',
    icon: Image,
    change: 'Featured on homepage',
    changeType: 'positive',
  },
  {
    name: 'Testimonials',
    value: '3',
    icon: MessageSquare,
    change: 'Customer reviews',
    changeType: 'positive',
  },
];

const recentBookings = [
  { id: 1, customer: 'John Doe', tour: 'Golden Triangle Tour', date: '2025-12-01', status: 'Confirmed' },
  { id: 2, customer: 'Jane Smith', tour: 'Kerala Backwaters', date: '2025-12-15', status: 'Pending' },
  { id: 3, customer: 'Mike Johnson', tour: 'Rajasthan Palace Tour', date: '2025-11-25', status: 'Confirmed' },
  { id: 4, customer: 'Sarah Williams', tour: 'Himalayan Trek', date: '2025-12-10', status: 'Pending' },
];

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-2 text-gray-600">Welcome to your admin panel</p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.name}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.name}</CardTitle>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">{stat.change}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Recent Bookings */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                >
                  <div>
                    <p className="font-medium">{booking.customer}</p>
                    <p className="text-sm text-gray-600">{booking.tour}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm">{booking.date}</p>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        booking.status === 'Confirmed'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {booking.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="cursor-pointer transition-shadow hover:shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plane className="h-5 w-5" />
                Add New Tour
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">Create a new tour package</p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer transition-shadow hover:shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Add Destination
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">Add a new destination</p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer transition-shadow hover:shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                View Messages
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">Check customer inquiries</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
