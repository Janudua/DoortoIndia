'use client';

import { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/admin-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { toast } from 'sonner';
import { ToursService } from '@/lib/data-service';

const initialTours = [
  {
    id: 1,
    title: 'Golden Triangle Tour',
    category: 'Cultural & Heritage',
    duration: '7 Days / 6 Nights',
    price: 25000,
    description: 'Experience the iconic cities of Delhi, Agra, and Jaipur',
    image: '/taj-mahal-heritage.jpg',
    videoUrl: '',
    featured: true,
  },
  {
    id: 2,
    title: 'Kerala Backwaters Honeymoon',
    category: 'Honeymoon',
    duration: '6 Days / 5 Nights',
    price: 35000,
    description: 'Romantic houseboat cruise through scenic waterways',
    image: '/kerala-honeymoon-houseboat.jpg',
    videoUrl: '',
    featured: true,
  },
  {
    id: 3,
    title: 'Rajasthan Palace Tour',
    category: 'Cultural & Heritage',
    duration: '10 Days / 9 Nights',
    price: 45000,
    description: 'Explore magnificent forts and royal palaces',
    image: '/rajasthan-palace-honeymoon.jpg',
    videoUrl: '',
    featured: false,
  },
  {
    id: 4,
    title: 'Shimla Manali Honeymoon',
    category: 'Honeymoon',
    duration: '5 Days / 4 Nights',
    price: 28000,
    description: 'Romantic getaway in the beautiful Himalayas',
    image: '/shimla-manali-honeymoon.jpg',
    videoUrl: '',
    featured: true,
  },
  {
    id: 5,
    title: 'Varanasi Spiritual Journey',
    category: 'Spiritual',
    duration: '4 Days / 3 Nights',
    price: 18000,
    description: 'Sacred experience in the holiest city of India',
    image: '/museum-ancient-india.jpg',
    videoUrl: '',
    featured: false,
  },
  {
    id: 6,
    title: 'Goa Beach Paradise',
    category: 'Beach',
    duration: '5 Days / 4 Nights',
    price: 22000,
    description: 'Relax on pristine beaches with vibrant nightlife',
    image: '/kerala-honeymoon-houseboat.jpg',
    videoUrl: '',
    featured: true,
  },
  {
    id: 7,
    title: 'Ladakh Adventure',
    category: 'Adventure',
    duration: '8 Days / 7 Nights',
    price: 42000,
    description: 'Thrilling journey through high-altitude landscapes',
    image: '/darjeeling-hills.jpg',
    videoUrl: '',
    featured: false,
  },
  {
    id: 8,
    title: 'Ranthambore Wildlife Safari',
    category: 'Wildlife',
    duration: '3 Days / 2 Nights',
    price: 15000,
    description: 'Tiger spotting in one of India\'s best national parks',
    image: '/sundarbans-wildlife.jpg',
    videoUrl: '',
    featured: false,
  },
  {
    id: 9,
    title: 'South India Temple Tour',
    category: 'Cultural & Heritage',
    duration: '9 Days / 8 Nights',
    price: 38000,
    description: 'Discover ancient temples and rich traditions',
    image: '/taj-mahal-heritage.jpg',
    videoUrl: '',
    featured: false,
  },
  {
    id: 10,
    title: 'Darjeeling & Gangtok Hills',
    category: 'Hill Station',
    duration: '6 Days / 5 Nights',
    price: 27000,
    description: 'Scenic beauty of tea gardens and mountain views',
    image: '/darjeeling-hills.jpg',
    videoUrl: '',
    featured: true,
  },
  {
    id: 11,
    title: 'Udaipur Royal Experience',
    category: 'Cultural & Heritage',
    duration: '4 Days / 3 Nights',
    price: 32000,
    description: 'City of Lakes with magnificent palaces',
    image: '/udaipur-palaces.jpg',
    videoUrl: '',
    featured: false,
  },
  {
    id: 12,
    title: 'Andaman Beach Escape',
    category: 'Beach',
    duration: '7 Days / 6 Nights',
    price: 48000,
    description: 'Crystal clear waters and exotic marine life',
    image: '/kerala-honeymoon-houseboat.jpg',
    videoUrl: '',
    featured: false,
  },
];

export default function ToursManagement() {
  const [tours, setTours] = useState(initialTours);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTour, setEditingTour] = useState<any>(null);

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    duration: '',
    price: '',
    description: '',
    image: '',
    videoUrl: '',
    featured: false,
  });

  // Load tours from localStorage on mount
  useEffect(() => {
    const savedTours = ToursService.getAll();
    if (savedTours.length > 0) {
      setTours(savedTours);
    } else {
      // Initialize with default tours if none exist
      ToursService.save(initialTours);
    }
  }, []);

  // Save tours to localStorage whenever they change
  useEffect(() => {
    if (tours.length > 0) {
      ToursService.save(tours);
    }
  }, [tours]);

  const categories = [
    'Honeymoon',
    'Cultural & Heritage',
    'Adventure',
    'Spiritual',
    'Wildlife',
    'Beach',
    'Hill Station',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingTour) {
      setTours(tours.map(t => t.id === editingTour.id ? { ...formData, id: t.id, price: Number(formData.price) } : t));
      toast.success('Tour updated successfully!');
    } else {
      const newTour = {
        id: tours.length + 1,
        ...formData,
        price: Number(formData.price),
      };
      setTours([...tours, newTour]);
      toast.success('Tour added successfully!');
    }
    
    resetForm();
    setIsDialogOpen(false);
  };

  const handleEdit = (tour: any) => {
    setEditingTour(tour);
    setFormData({
      title: tour.title,
      category: tour.category,
      duration: tour.duration,
      price: tour.price.toString(),
      description: tour.description || '',
      image: tour.image || '',
      videoUrl: tour.videoUrl || '',
      featured: tour.featured,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this tour?')) {
      setTours(tours.filter(t => t.id !== id));
      toast.success('Tour deleted successfully!');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      category: '',
      duration: '',
      price: '',
      description: '',
      image: '',
      videoUrl: '',
      featured: false,
    });
    setEditingTour(null);
  };

  const filteredTours = tours.filter(tour =>
    tour.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tour.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Tours Management</h1>
            <p className="mt-2 text-gray-600">Manage your tour packages</p>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>
                <Plus className="mr-2 h-4 w-4" />
                Add New Tour
              </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>{editingTour ? 'Edit Tour' : 'Add New Tour'}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="title">Tour Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="duration">Duration *</Label>
                    <Input
                      id="duration"
                      placeholder="7 Days / 6 Nights"
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="price">Price (INR) *</Label>
                    <Input
                      id="price"
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="image">Image URL</Label>
                  <Input
                    id="image"
                    placeholder="/tour-image.jpg"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="videoUrl">Video URL (Optional)</Label>
                  <Input
                    id="videoUrl"
                    placeholder="https://youtube.com/watch?v=... or https://vimeo.com/..."
                    value={formData.videoUrl}
                    onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Add YouTube, Vimeo, or direct video link (optional)
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="h-4 w-4 rounded border-gray-300"
                  />
                  <Label htmlFor="featured">Featured Tour</Label>
                </div>

                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      resetForm();
                      setIsDialogOpen(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">
                    {editingTour ? 'Update Tour' : 'Add Tour'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search tours..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Tours Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Tours ({filteredTours.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="pb-3 text-left font-medium">Title</th>
                    <th className="pb-3 text-left font-medium">Category</th>
                    <th className="pb-3 text-left font-medium">Duration</th>
                    <th className="pb-3 text-left font-medium">Price</th>
                    <th className="pb-3 text-left font-medium">Video</th>
                    <th className="pb-3 text-left font-medium">Featured</th>
                    <th className="pb-3 text-right font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTours.map((tour) => (
                    <tr key={tour.id} className="border-b last:border-0">
                      <td className="py-4">{tour.title}</td>
                      <td className="py-4">{tour.category}</td>
                      <td className="py-4">{tour.duration}</td>
                      <td className="py-4">₹{tour.price.toLocaleString()}</td>
                      <td className="py-4">
                        {tour.videoUrl ? (
                          <span className="text-blue-600 text-sm">📹 Yes</span>
                        ) : (
                          <span className="text-gray-400 text-sm">—</span>
                        )}
                      </td>
                      <td className="py-4">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            tour.featured
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {tour.featured ? 'Yes' : 'No'}
                        </span>
                      </td>
                      <td className="py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(tour)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(tour.id)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
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
      </div>
    </AdminLayout>
  );
}
