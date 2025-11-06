'use client';

import { useState } from 'react';
import { AdminLayout } from '@/components/admin/admin-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Trash2, Download, Mail } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const initialSubscribers = [
  {
    id: 1,
    email: 'john.doe@example.com',
    subscribedAt: '2025-11-15',
    status: 'Active',
  },
  {
    id: 2,
    email: 'jane.smith@example.com',
    subscribedAt: '2025-11-14',
    status: 'Active',
  },
  {
    id: 3,
    email: 'mike.johnson@example.com',
    subscribedAt: '2025-11-13',
    status: 'Active',
  },
  {
    id: 4,
    email: 'sarah.williams@example.com',
    subscribedAt: '2025-11-12',
    status: 'Active',
  },
  {
    id: 5,
    email: 'david.brown@example.com',
    subscribedAt: '2025-11-11',
    status: 'Unsubscribed',
  },
];

export default function NewsletterManagement() {
  const [subscribers, setSubscribers] = useState(initialSubscribers);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSendEmailOpen, setIsSendEmailOpen] = useState(false);
  const [emailSubject, setEmailSubject] = useState('');
  const [emailMessage, setEmailMessage] = useState('');

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this subscriber?')) {
      setSubscribers(subscribers.filter(s => s.id !== id));
      toast.success('Subscriber deleted successfully');
    }
  };

  const handleExport = () => {
    const activeSubscribers = subscribers.filter(s => s.status === 'Active');
    const csvContent = activeSubscribers.map(s => s.email).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'subscribers.csv';
    a.click();
    toast.success('Subscriber list exported successfully');
  };

  const handleSendEmail = () => {
    if (!emailSubject.trim() || !emailMessage.trim()) {
      toast.error('Please fill in both subject and message');
      return;
    }

    const activeSubscribers = subscribers.filter(s => s.status === 'Active');
    toast.success(`Email sent to ${activeSubscribers.length} subscribers`);
    setIsSendEmailOpen(false);
    setEmailSubject('');
    setEmailMessage('');
  };

  const filteredSubscribers = subscribers.filter(subscriber =>
    subscriber.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = {
    total: subscribers.length,
    active: subscribers.filter(s => s.status === 'Active').length,
    unsubscribed: subscribers.filter(s => s.status === 'Unsubscribed').length,
    thisMonth: subscribers.filter(s => {
      const subscribedDate = new Date(s.subscribedAt);
      const now = new Date();
      return subscribedDate.getMonth() === now.getMonth() && 
             subscribedDate.getFullYear() === now.getFullYear();
    }).length,
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Newsletter Management</h1>
          <p className="mt-2 text-gray-600">Manage email subscribers and send newsletters</p>
        </div>

        {/* Stats */}
        <div className="grid gap-6 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Subscribers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Active</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.active}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Unsubscribed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{stats.unsubscribed}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">This Month</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.thisMonth}</div>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search subscribers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button onClick={() => setIsSendEmailOpen(true)}>
            <Mail className="mr-2 h-4 w-4" />
            Send Email
          </Button>
          <Button variant="outline" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>

        {/* Subscribers Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Subscribers ({filteredSubscribers.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="pb-3 text-left font-medium">Email</th>
                    <th className="pb-3 text-left font-medium">Subscribed Date</th>
                    <th className="pb-3 text-left font-medium">Status</th>
                    <th className="pb-3 text-right font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSubscribers.map((subscriber) => (
                    <tr key={subscriber.id} className="border-b last:border-0">
                      <td className="py-4">{subscriber.email}</td>
                      <td className="py-4">{subscriber.subscribedAt}</td>
                      <td className="py-4">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            subscriber.status === 'Active'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {subscriber.status}
                        </span>
                      </td>
                      <td className="py-4 text-right">
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(subscriber.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Send Email Dialog */}
        <Dialog open={isSendEmailOpen} onOpenChange={setIsSendEmailOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Send Newsletter Email</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="rounded-lg bg-blue-50 p-3">
                <p className="text-sm text-blue-800">
                  This email will be sent to {stats.active} active subscribers
                </p>
              </div>

              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  placeholder="Enter email subject"
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Enter email message"
                  value={emailMessage}
                  onChange={(e) => setEmailMessage(e.target.value)}
                  rows={8}
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsSendEmailOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSendEmail}>
                  <Mail className="mr-2 h-4 w-4" />
                  Send Email
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
