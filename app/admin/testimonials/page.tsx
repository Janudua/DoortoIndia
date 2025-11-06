'use client';

import { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/admin-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Plus, Edit, Trash2, Search, Star } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { TestimonialsService } from '@/lib/data-service';

const initialTestimonials = [
  {
    id: 1,
    name: 'John & Sarah Miller',
    location: 'New York, USA',
    tour: 'Golden Triangle Tour',
    rating: 5,
    review: 'Amazing experience! The tour was well-organized and our guide was incredibly knowledgeable. We visited all the iconic landmarks and learned so much about Indian culture and history.',
    image: '/testimonial-1.jpg',
    featured: true,
    date: '2025-10-15',
  },
  {
    id: 2,
    name: 'Emma Thompson',
    location: 'London, UK',
    tour: 'Kerala Backwaters',
    rating: 5,
    review: 'The houseboat experience was absolutely magical. Floating through the serene backwaters, enjoying delicious Kerala cuisine, and watching the sunset was unforgettable.',
    image: '/testimonial-2.jpg',
    featured: true,
    date: '2025-10-20',
  },
  {
    id: 3,
    name: 'Michael Chen',
    location: 'Singapore',
    tour: 'Rajasthan Heritage Tour',
    rating: 4,
    review: 'Incredible palaces and forts! The architecture and history of Rajasthan are breathtaking. Great accommodations and excellent service throughout.',
    image: '/testimonial-3.jpg',
    featured: true,
    date: '2025-10-25',
  },
];

export default function TestimonialsManagement() {
  const [testimonials, setTestimonials] = useState(initialTestimonials);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    tour: '',
    rating: 5,
    review: '',
    image: '',
    featured: true,
    date: new Date().toISOString().split('T')[0],
  });

  // Load testimonials from localStorage on mount
  useEffect(() => {
    const savedTestimonials = TestimonialsService.getAll();
    if (savedTestimonials.length > 0) {
      setTestimonials(savedTestimonials);
    } else {
      // Initialize with default testimonials if none exist
      TestimonialsService.save(initialTestimonials);
    }
  }, []);

  // Save testimonials to localStorage whenever they change
  useEffect(() => {
    if (testimonials.length > 0) {
      TestimonialsService.save(testimonials);
    }
  }, [testimonials]);

  const handleAdd = () => {
    if (!formData.name || !formData.location || !formData.tour || !formData.review) {
      toast.error('Please fill in all required fields');
      return;
    }

    const newTestimonial = {
      id: Math.max(...testimonials.map(t => t.id), 0) + 1,
      ...formData,
    };

    setTestimonials([...testimonials, newTestimonial]);
    toast.success('Testimonial added successfully');
    setIsAddOpen(false);
    setFormData({
      name: '',
      location: '',
      tour: '',
      rating: 5,
      review: '',
      image: '',
      featured: true,
      date: new Date().toISOString().split('T')[0],
    });
  };

  const handleEdit = (testimonial: any) => {
    setEditingTestimonial(testimonial);
    setFormData({
      name: testimonial.name,
      location: testimonial.location,
      tour: testimonial.tour,
      rating: testimonial.rating,
      review: testimonial.review,
      image: testimonial.image,
      featured: testimonial.featured,
      date: testimonial.date,
    });
    setIsEditOpen(true);
  };

  const handleUpdate = () => {
    if (!formData.name || !formData.location || !formData.tour || !formData.review) {
      toast.error('Please fill in all required fields');
      return;
    }

    setTestimonials(testimonials.map(testimonial =>
      testimonial.id === editingTestimonial.id ? { ...testimonial, ...formData } : testimonial
    ));
    toast.success('Testimonial updated successfully');
    setIsEditOpen(false);
    setEditingTestimonial(null);
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this testimonial?')) {
      setTestimonials(testimonials.filter(testimonial => testimonial.id !== id));
      toast.success('Testimonial deleted successfully');
    }
  };

  const filteredTestimonials = testimonials.filter(testimonial =>
    testimonial.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    testimonial.tour.toLowerCase().includes(searchQuery.toLowerCase()) ||
    testimonial.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = {
    total: testimonials.length,
    featured: testimonials.filter(t => t.featured).length,
    avgRating: (testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length).toFixed(1),
    fiveStars: testimonials.filter(t => t.rating === 5).length,
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Testimonials Management</h1>
            <p className="mt-2 text-gray-600">Manage customer reviews and testimonials</p>
          </div>
          <Button onClick={() => setIsAddOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Testimonial
          </Button>
        </div>

        {/* Stats */}
        <div className="grid gap-6 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Testimonials</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Featured</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.featured}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{stats.avgRating} ⭐</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">5-Star Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.fiveStars}</div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search testimonials..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Testimonials Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Testimonials ({filteredTestimonials.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredTestimonials.map((testimonial) => (
                <div key={testimonial.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4 flex-1">
                      {testimonial.image && (
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="h-16 w-16 rounded-full object-cover"
                        />
                      )}
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold">{testimonial.name}</h3>
                          {testimonial.featured && (
                            <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded">
                              Featured
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{testimonial.location}</p>
                        <p className="text-sm text-gray-500 mt-1">Tour: {testimonial.tour}</p>
                        <div className="flex items-center gap-1 mt-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < testimonial.rating
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                          <span className="text-sm text-gray-600 ml-2">
                            {testimonial.rating}/5
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 mt-2">{testimonial.review}</p>
                        <p className="text-xs text-gray-500 mt-2">Posted: {testimonial.date}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(testimonial)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(testimonial.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Add Dialog */}
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
              <DialogTitle>Add Testimonial</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Customer Name *</Label>
                  <Input
                    id="name"
                    placeholder="e.g., John & Sarah Miller"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    placeholder="e.g., New York, USA"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="tour">Tour Name *</Label>
                  <Input
                    id="tour"
                    placeholder="e.g., Golden Triangle Tour"
                    value={formData.tour}
                    onChange={(e) => setFormData({ ...formData, tour: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="rating">Rating *</Label>
                  <Select
                    value={formData.rating.toString()}
                    onValueChange={(value) => setFormData({ ...formData, rating: parseInt(value) })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 Stars</SelectItem>
                      <SelectItem value="4">4 Stars</SelectItem>
                      <SelectItem value="3">3 Stars</SelectItem>
                      <SelectItem value="2">2 Stars</SelectItem>
                      <SelectItem value="1">1 Star</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="review">Review *</Label>
                <Textarea
                  id="review"
                  placeholder="Customer's review..."
                  value={formData.review}
                  onChange={(e) => setFormData({ ...formData, review: e.target.value })}
                  rows={4}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="image">Customer Image URL</Label>
                  <Input
                    id="image"
                    placeholder="/path/to/image.jpg"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="featured"
                  checked={formData.featured}
                  onCheckedChange={(checked) => setFormData({ ...formData, featured: checked as boolean })}
                />
                <Label htmlFor="featured">Display on homepage (Featured)</Label>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsAddOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAdd}>Add Testimonial</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Edit Dialog */}
        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
              <DialogTitle>Edit Testimonial</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-name">Customer Name *</Label>
                  <Input
                    id="edit-name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-location">Location *</Label>
                  <Input
                    id="edit-location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-tour">Tour Name *</Label>
                  <Input
                    id="edit-tour"
                    value={formData.tour}
                    onChange={(e) => setFormData({ ...formData, tour: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-rating">Rating *</Label>
                  <Select
                    value={formData.rating.toString()}
                    onValueChange={(value) => setFormData({ ...formData, rating: parseInt(value) })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 Stars</SelectItem>
                      <SelectItem value="4">4 Stars</SelectItem>
                      <SelectItem value="3">3 Stars</SelectItem>
                      <SelectItem value="2">2 Stars</SelectItem>
                      <SelectItem value="1">1 Star</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="edit-review">Review *</Label>
                <Textarea
                  id="edit-review"
                  value={formData.review}
                  onChange={(e) => setFormData({ ...formData, review: e.target.value })}
                  rows={4}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-image">Customer Image URL</Label>
                  <Input
                    id="edit-image"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-date">Date</Label>
                  <Input
                    id="edit-date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="edit-featured"
                  checked={formData.featured}
                  onCheckedChange={(checked) => setFormData({ ...formData, featured: checked as boolean })}
                />
                <Label htmlFor="edit-featured">Display on homepage (Featured)</Label>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsEditOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleUpdate}>Update Testimonial</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
