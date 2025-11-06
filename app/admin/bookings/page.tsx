'use client';

import { useState } from 'react';
import { AdminLayout } from '@/components/admin/admin-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, Eye, Check, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';

const initialBookings = [
  {
    id: 1,
    customer: 'John Doe',
    email: 'john@example.com',
    phone: '+1234567890',
    tour: 'Golden Triangle Tour',
    startDate: '2025-12-01',
    travelers: { adults: 2, children: 0 },
    amount: 50000,
    status: 'Pending',
    paymentStatus: 'Pending',
    createdAt: '2025-11-01',
  },
  {
    id: 2,
    customer: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+1987654321',
    tour: 'Kerala Backwaters Honeymoon',
    startDate: '2025-12-15',
    travelers: { adults: 2, children: 0 },
    amount: 70000,
    status: 'Confirmed',
    paymentStatus: 'Paid',
    createdAt: '2025-11-02',
  },
  {
    id: 3,
    customer: 'Mike Johnson',
    email: 'mike@example.com',
    phone: '+1555666777',
    tour: 'Rajasthan Palace Tour',
    startDate: '2025-11-25',
    travelers: { adults: 2, children: 1 },
    amount: 112500,
    status: 'Confirmed',
    paymentStatus: 'Paid',
    createdAt: '2025-10-28',
  },
];

export default function BookingsManagement() {
  const [bookings, setBookings] = useState(initialBookings);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);

  const handleStatusChange = (id: number, newStatus: string) => {
    setBookings(bookings.map(b => 
      b.id === id ? { ...b, status: newStatus } : b
    ));
    toast.success(`Booking status updated to ${newStatus}`);
  };

  const handlePaymentStatusChange = (id: number, newStatus: string) => {
    setBookings(bookings.map(b => 
      b.id === id ? { ...b, paymentStatus: newStatus } : b
    ));
    toast.success(`Payment status updated to ${newStatus}`);
  };

  const handleViewBooking = (booking: any) => {
    setSelectedBooking(booking);
    setIsViewOpen(true);
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = 
      booking.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.tour.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: bookings.length,
    pending: bookings.filter(b => b.status === 'Pending').length,
    confirmed: bookings.filter(b => b.status === 'Confirmed').length,
    totalRevenue: bookings.reduce((sum, b) => sum + b.amount, 0),
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Bookings Management</h1>
          <p className="mt-2 text-gray-600">View and manage customer bookings</p>
        </div>

        {/* Stats */}
        <div className="grid gap-6 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Confirmed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.confirmed}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{stats.totalRevenue.toLocaleString()}</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search bookings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[200px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Confirmed">Confirmed</SelectItem>
              <SelectItem value="Cancelled">Cancelled</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Bookings Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Bookings ({filteredBookings.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="pb-3 text-left font-medium">Customer</th>
                    <th className="pb-3 text-left font-medium">Tour</th>
                    <th className="pb-3 text-left font-medium">Date</th>
                    <th className="pb-3 text-left font-medium">Travelers</th>
                    <th className="pb-3 text-left font-medium">Amount</th>
                    <th className="pb-3 text-left font-medium">Status</th>
                    <th className="pb-3 text-left font-medium">Payment</th>
                    <th className="pb-3 text-right font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.map((booking) => (
                    <tr key={booking.id} className="border-b last:border-0">
                      <td className="py-4">
                        <div>
                          <p className="font-medium">{booking.customer}</p>
                          <p className="text-sm text-gray-600">{booking.email}</p>
                        </div>
                      </td>
                      <td className="py-4">{booking.tour}</td>
                      <td className="py-4">{booking.startDate}</td>
                      <td className="py-4">
                        {booking.travelers.adults}A
                        {booking.travelers.children > 0 && `, ${booking.travelers.children}C`}
                      </td>
                      <td className="py-4">₹{booking.amount.toLocaleString()}</td>
                      <td className="py-4">
                        <Select
                          value={booking.status}
                          onValueChange={(value) => handleStatusChange(booking.id, value)}
                        >
                          <SelectTrigger className="w-[130px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Pending">Pending</SelectItem>
                            <SelectItem value="Confirmed">Confirmed</SelectItem>
                            <SelectItem value="Cancelled">Cancelled</SelectItem>
                            <SelectItem value="Completed">Completed</SelectItem>
                          </SelectContent>
                        </Select>
                      </td>
                      <td className="py-4">
                        <Select
                          value={booking.paymentStatus}
                          onValueChange={(value) => handlePaymentStatusChange(booking.id, value)}
                        >
                          <SelectTrigger className="w-[110px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Pending">Pending</SelectItem>
                            <SelectItem value="Paid">Paid</SelectItem>
                            <SelectItem value="Failed">Failed</SelectItem>
                            <SelectItem value="Refunded">Refunded</SelectItem>
                          </SelectContent>
                        </Select>
                      </td>
                      <td className="py-4 text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewBooking(booking)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* View Booking Dialog */}
        <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Booking Details</DialogTitle>
            </DialogHeader>
            {selectedBooking && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Customer Name</p>
                    <p className="text-base">{selectedBooking.customer}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Email</p>
                    <p className="text-base">{selectedBooking.email}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Phone</p>
                    <p className="text-base">{selectedBooking.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Tour</p>
                    <p className="text-base">{selectedBooking.tour}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Start Date</p>
                    <p className="text-base">{selectedBooking.startDate}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Travelers</p>
                    <p className="text-base">
                      {selectedBooking.travelers.adults} Adults, {selectedBooking.travelers.children} Children
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Amount</p>
                    <p className="text-base font-bold">₹{selectedBooking.amount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Booking Status</p>
                    <p className="text-base">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        selectedBooking.status === 'Confirmed'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {selectedBooking.status}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
