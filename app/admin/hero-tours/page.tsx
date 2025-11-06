'use client';

import { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/admin-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { HeroToursService } from '@/lib/data-service';

const initialHeroTours = [
  {
    id: 1,
    title: 'Golden Triangle Tour',
    subtitle: 'Delhi, Agra & Jaipur',
    description: 'Experience the iconic cities of North India',
    image: '/shimla-manali-honeymoon.jpg',
    featured: true,
    order: 1,
  },
  {
    id: 2,
    title: 'Kerala Backwaters',
    subtitle: 'Houseboat Experience',
    description: 'Serene journey through scenic waterways',
    image: '/kerala-honeymoon-houseboat.jpg',
    featured: true,
    order: 2,
  },
  {
    id: 3,
    title: 'Rajasthan Heritage',
    subtitle: 'Royal Palaces Tour',
    description: 'Explore magnificent forts and palaces',
    image: '/rajasthan-palace-honeymoon.jpg',
    featured: true,
    order: 3,
  },
];

export default function HeroToursManagement() {
  const [heroTours, setHeroTours] = useState(initialHeroTours);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingTour, setEditingTour] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    image: '',
    featured: true,
    order: 1,
  });

  // Load hero tours from localStorage on mount
  useEffect(() => {
    const savedHeroTours = HeroToursService.getAll();
    if (savedHeroTours.length > 0) {
      setHeroTours(savedHeroTours);
    } else {
      // Initialize with default hero tours if none exist
      HeroToursService.save(initialHeroTours);
    }
  }, []);

  // Save hero tours to localStorage whenever they change
  useEffect(() => {
    if (heroTours.length > 0) {
      HeroToursService.save(heroTours);
    }
  }, [heroTours]);

  const handleAdd = () => {
    if (!formData.title || !formData.subtitle || !formData.description || !formData.image) {
      toast.error('Please fill in all fields');
      return;
    }

    const newTour = {
      id: Math.max(...heroTours.map(t => t.id), 0) + 1,
      ...formData,
    };

    setHeroTours([...heroTours, newTour]);
    toast.success('Hero tour added successfully');
    setIsAddOpen(false);
    setFormData({ title: '', subtitle: '', description: '', image: '', featured: true, order: 1 });
  };

  const handleEdit = (tour: any) => {
    setEditingTour(tour);
    setFormData({
      title: tour.title,
      subtitle: tour.subtitle,
      description: tour.description,
      image: tour.image,
      featured: tour.featured,
      order: tour.order,
    });
    setIsEditOpen(true);
  };

  const handleUpdate = () => {
    if (!formData.title || !formData.subtitle || !formData.description || !formData.image) {
      toast.error('Please fill in all fields');
      return;
    }

    setHeroTours(heroTours.map(tour =>
      tour.id === editingTour.id ? { ...tour, ...formData } : tour
    ));
    toast.success('Hero tour updated successfully');
    setIsEditOpen(false);
    setEditingTour(null);
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this hero tour?')) {
      setHeroTours(heroTours.filter(tour => tour.id !== id));
      toast.success('Hero tour deleted successfully');
    }
  };

  const filteredTours = heroTours.filter(tour =>
    tour.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tour.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Hero Section Tours</h1>
            <p className="mt-2 text-gray-600">Manage featured tours displayed on homepage hero section</p>
          </div>
          <Button onClick={() => setIsAddOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Hero Tour
          </Button>
        </div>

        {/* Stats */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Hero Tours</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{heroTours.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Featured</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {heroTours.filter(t => t.featured).length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Active Slots</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{heroTours.length}/5</div>
              <p className="text-xs text-gray-500 mt-1">Recommended: 3-5 tours</p>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search hero tours..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Tours Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredTours.sort((a, b) => a.order - b.order).map((tour) => (
            <Card key={tour.id} className="overflow-hidden">
              <div className="relative h-48">
                <img
                  src={tour.image}
                  alt={tour.title}
                  className="h-full w-full object-cover"
                />
                {tour.featured && (
                  <span className="absolute top-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded">
                    Featured
                  </span>
                )}
                <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                  Order: {tour.order}
                </span>
              </div>
              <CardContent className="p-4">
                <h3 className="font-bold text-lg">{tour.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{tour.subtitle}</p>
                <p className="text-sm text-gray-500 mt-2">{tour.description}</p>
                <div className="flex gap-2 mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => handleEdit(tour)}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(tour.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Add Dialog */}
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add Hero Tour</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Tour Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Golden Triangle Tour"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="subtitle">Subtitle</Label>
                <Input
                  id="subtitle"
                  placeholder="e.g., Delhi, Agra & Jaipur"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Brief description for hero section"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={2}
                />
              </div>
              <div>
                <Label htmlFor="image">Image URL</Label>
                <Input
                  id="image"
                  placeholder="/path/to/image.jpg"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="order">Display Order</Label>
                  <Input
                    id="order"
                    type="number"
                    min="1"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                  />
                </div>
                <div className="flex items-end">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="featured"
                      checked={formData.featured}
                      onCheckedChange={(checked) => setFormData({ ...formData, featured: checked as boolean })}
                    />
                    <Label htmlFor="featured">Featured on Hero</Label>
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsAddOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAdd}>Add Tour</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Edit Dialog */}
        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Edit Hero Tour</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-title">Tour Title</Label>
                <Input
                  id="edit-title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="edit-subtitle">Subtitle</Label>
                <Input
                  id="edit-subtitle"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={2}
                />
              </div>
              <div>
                <Label htmlFor="edit-image">Image URL</Label>
                <Input
                  id="edit-image"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-order">Display Order</Label>
                  <Input
                    id="edit-order"
                    type="number"
                    min="1"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                  />
                </div>
                <div className="flex items-end">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="edit-featured"
                      checked={formData.featured}
                      onCheckedChange={(checked) => setFormData({ ...formData, featured: checked as boolean })}
                    />
                    <Label htmlFor="edit-featured">Featured on Hero</Label>
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsEditOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleUpdate}>Update Tour</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
