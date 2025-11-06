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
import { Search, Eye, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const initialContacts = [
  {
    id: 1,
    name: 'Sarah Williams',
    email: 'sarah@example.com',
    phone: '+1234567890',
    subject: 'Tour Inquiry',
    message: 'I would like to know more about your Kerala tour packages for a family of 4.',
    status: 'New',
    createdAt: '2025-11-15',
  },
  {
    id: 2,
    name: 'David Brown',
    email: 'david@example.com',
    phone: '+1987654321',
    subject: 'Booking Modification',
    message: 'I need to change my booking date for the Rajasthan tour. Can we reschedule?',
    status: 'In Progress',
    createdAt: '2025-11-14',
  },
  {
    id: 3,
    name: 'Emily Chen',
    email: 'emily@example.com',
    phone: '+1555666777',
    subject: 'Custom Package Request',
    message: 'Looking for a customized 10-day tour covering North India. Please share options.',
    status: 'Resolved',
    createdAt: '2025-11-13',
  },
];

export default function ContactsManagement() {
  const [contacts, setContacts] = useState(initialContacts);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedContact, setSelectedContact] = useState<any>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [reply, setReply] = useState('');

  const handleStatusChange = (id: number, newStatus: string) => {
    setContacts(contacts.map(c => 
      c.id === id ? { ...c, status: newStatus } : c
    ));
    toast.success(`Contact status updated to ${newStatus}`);
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this contact?')) {
      setContacts(contacts.filter(c => c.id !== id));
      toast.success('Contact deleted successfully');
    }
  };

  const handleViewContact = (contact: any) => {
    setSelectedContact(contact);
    setReply('');
    setIsViewOpen(true);
  };

  const handleSendReply = () => {
    if (!reply.trim()) {
      toast.error('Please enter a reply message');
      return;
    }
    
    // Update status to Resolved
    handleStatusChange(selectedContact.id, 'Resolved');
    toast.success('Reply sent successfully');
    setIsViewOpen(false);
  };

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = 
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.subject.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || contact.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: contacts.length,
    new: contacts.filter(c => c.status === 'New').length,
    inProgress: contacts.filter(c => c.status === 'In Progress').length,
    resolved: contacts.filter(c => c.status === 'Resolved').length,
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Contact Inquiries</h1>
          <p className="mt-2 text-gray-600">Manage customer inquiries and messages</p>
        </div>

        {/* Stats */}
        <div className="grid gap-6 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Inquiries</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">New</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.new}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{stats.inProgress}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Resolved</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.resolved}</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search contacts..."
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
              <SelectItem value="New">New</SelectItem>
              <SelectItem value="In Progress">In Progress</SelectItem>
              <SelectItem value="Resolved">Resolved</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Contacts Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Inquiries ({filteredContacts.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="pb-3 text-left font-medium">Name</th>
                    <th className="pb-3 text-left font-medium">Email</th>
                    <th className="pb-3 text-left font-medium">Subject</th>
                    <th className="pb-3 text-left font-medium">Date</th>
                    <th className="pb-3 text-left font-medium">Status</th>
                    <th className="pb-3 text-right font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredContacts.map((contact) => (
                    <tr key={contact.id} className="border-b last:border-0">
                      <td className="py-4">
                        <div>
                          <p className="font-medium">{contact.name}</p>
                          <p className="text-sm text-gray-600">{contact.phone}</p>
                        </div>
                      </td>
                      <td className="py-4">{contact.email}</td>
                      <td className="py-4">{contact.subject}</td>
                      <td className="py-4">{contact.createdAt}</td>
                      <td className="py-4">
                        <Select
                          value={contact.status}
                          onValueChange={(value) => handleStatusChange(contact.id, value)}
                        >
                          <SelectTrigger className="w-[130px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="New">New</SelectItem>
                            <SelectItem value="In Progress">In Progress</SelectItem>
                            <SelectItem value="Resolved">Resolved</SelectItem>
                          </SelectContent>
                        </Select>
                      </td>
                      <td className="py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewContact(contact)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(contact.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* View Contact Dialog */}
        <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
              <DialogTitle>Contact Details & Reply</DialogTitle>
            </DialogHeader>
            {selectedContact && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Name</p>
                    <p className="text-base">{selectedContact.name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Email</p>
                    <p className="text-base">{selectedContact.email}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Phone</p>
                    <p className="text-base">{selectedContact.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Date</p>
                    <p className="text-base">{selectedContact.createdAt}</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-600">Subject</p>
                  <p className="text-base mt-1">{selectedContact.subject}</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-600">Message</p>
                  <div className="mt-1 rounded-lg bg-gray-50 p-4">
                    <p className="text-base">{selectedContact.message}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-600 mb-2">Reply to Customer</p>
                  <Textarea
                    placeholder="Type your reply here..."
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                    rows={4}
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsViewOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSendReply}>
                    Send Reply
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
