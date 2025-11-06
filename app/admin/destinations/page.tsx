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
import { DestinationsService } from '@/lib/data-service';

const initialDestinations = [
  {
    id: 1,
    name: 'Darjeeling',
    state: 'West Bengal',
    region: 'East India',
    description: 'Famous hill station known for tea plantations and stunning Himalayan views',
    image: '/darjeeling-hills.jpg',
    videoUrl: '',
    featured: true,
  },
  {
    id: 2,
    name: 'Sundarbans',
    state: 'West Bengal',
    region: 'East India',
    description: 'Largest mangrove forest and tiger reserve in the world',
    image: '/sundarbans-wildlife.jpg',
    videoUrl: '',
    featured: true,
  },
  {
    id: 3,
    name: 'Udaipur',
    state: 'Rajasthan',
    region: 'West India',
    description: 'The romantic city of lakes and magnificent palaces',
    image: '/udaipur-palaces.jpg',
    videoUrl: '',
    featured: true,
  },
  {
    id: 4,
    name: 'Jaipur',
    state: 'Rajasthan',
    region: 'West India',
    description: 'The Pink City with grand forts and vibrant bazaars',
    image: '/rajasthan-palace-honeymoon.jpg',
    videoUrl: '',
    featured: true,
  },
  {
    id: 5,
    name: 'Agra',
    state: 'Uttar Pradesh',
    region: 'North India',
    description: 'Home to the iconic Taj Mahal and Mughal heritage',
    image: '/taj-mahal-heritage.jpg',
    videoUrl: '',
    featured: true,
  },
  {
    id: 6,
    name: 'Shimla',
    state: 'Himachal Pradesh',
    region: 'North India',
    description: 'Colonial hill station with panoramic mountain views',
    image: '/shimla-manali-honeymoon.jpg',
    videoUrl: '',
    featured: false,
  },
  {
    id: 7,
    name: 'Manali',
    state: 'Himachal Pradesh',
    region: 'North India',
    description: 'Adventure hub nestled in the Himalayas',
    image: '/shimla-manali-honeymoon.jpg',
    videoUrl: '',
    featured: false,
  },
  {
    id: 8,
    name: 'Kerala Backwaters',
    state: 'Kerala',
    region: 'South India',
    description: 'Serene network of lagoons and canals',
    image: '/kerala-honeymoon-houseboat.jpg',
    videoUrl: '',
    featured: true,
  },
  {
    id: 9,
    name: 'Goa',
    state: 'Goa',
    region: 'West India',
    description: 'Beach paradise with Portuguese heritage',
    image: '/kerala-honeymoon-houseboat.jpg',
    videoUrl: '',
    featured: false,
  },
  {
    id: 10,
    name: 'Varanasi',
    state: 'Uttar Pradesh',
    region: 'North India',
    description: 'Spiritual capital and oldest living city of India',
    image: '/museum-ancient-india.jpg',
    videoUrl: '',
    featured: false,
  },
  {
    id: 11,
    name: 'Leh-Ladakh',
    state: 'Ladakh',
    region: 'North India',
    description: 'High-altitude desert with stunning landscapes',
    image: '/darjeeling-hills.jpg',
    videoUrl: '',
    featured: false,
  },
  {
    id: 12,
    name: 'Ranthambore',
    state: 'Rajasthan',
    region: 'West India',
    description: 'Premier tiger reserve with historic fort',
    image: '/sundarbans-wildlife.jpg',
    videoUrl: '',
    featured: false,
  },
  {
    id: 13,
    name: 'Mysore',
    state: 'Karnataka',
    region: 'South India',
    description: 'Cultural capital with magnificent palace',
    image: '/udaipur-palaces.jpg',
    videoUrl: '',
    featured: false,
  },
  {
    id: 14,
    name: 'Andaman Islands',
    state: 'Andaman and Nicobar',
    region: 'South India',
    description: 'Tropical paradise with pristine beaches',
    image: '/kerala-honeymoon-houseboat.jpg',
    videoUrl: '',
    featured: false,
  },
  {
    id: 15,
    name: 'Gangtok',
    state: 'Sikkim',
    region: 'Northeast India',
    description: 'Gateway to the Eastern Himalayas',
    image: '/darjeeling-hills.jpg',
    videoUrl: '',
    featured: false,
  },
];

export default function DestinationsManagement() {
  const [destinations, setDestinations] = useState(initialDestinations);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingDestination, setEditingDestination] = useState<any>(null);

  const [formData, setFormData] = useState({
    name: '',
    state: '',
    region: '',
    description: '',
    image: '',
    videoUrl: '',
    featured: false,
  });

  // Load destinations from localStorage on mount
  useEffect(() => {
    const savedDestinations = DestinationsService.getAll();
    if (savedDestinations.length > 0) {
      setDestinations(savedDestinations);
    } else {
      // Initialize with default destinations if none exist
      DestinationsService.save(initialDestinations);
    }
  }, []);

  // Save destinations to localStorage whenever they change
  useEffect(() => {
    if (destinations.length > 0) {
      DestinationsService.save(destinations);
    }
  }, [destinations]);

  const regions = [
    'North India',
    'South India',
    'East India',
    'West India',
    'Central India',
    'Northeast India',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingDestination) {
      setDestinations(destinations.map(d => d.id === editingDestination.id ? { ...formData, id: d.id } : d));
      toast.success('Destination updated successfully!');
    } else {
      const newDestination = {
        id: destinations.length + 1,
        ...formData,
      };
      setDestinations([...destinations, newDestination]);
      toast.success('Destination added successfully!');
    }
    
    resetForm();
    setIsDialogOpen(false);
  };

  const handleEdit = (destination: any) => {
    setEditingDestination(destination);
    setFormData({
      name: destination.name,
      state: destination.state,
      region: destination.region,
      description: destination.description || '',
      image: destination.image || '',
      videoUrl: destination.videoUrl || '',
      featured: destination.featured,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this destination?')) {
      setDestinations(destinations.filter(d => d.id !== id));
      toast.success('Destination deleted successfully!');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      state: '',
      region: '',
      description: '',
      image: '',
      videoUrl: '',
      featured: false,
    });
    setEditingDestination(null);
  };

  const filteredDestinations = destinations.filter(dest =>
    dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dest.state.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Destinations Management</h1>
            <p className="mt-2 text-gray-600">Manage destinations across India</p>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>
                <Plus className="mr-2 h-4 w-4" />
                Add New Destination
              </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>
                  {editingDestination ? 'Edit Destination' : 'Add New Destination'}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Destination Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="state">State *</Label>
                    <Input
                      id="state"
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="region">Region *</Label>
                    <Select
                      value={formData.region}
                      onValueChange={(value) => setFormData({ ...formData, region: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select region" />
                      </SelectTrigger>
                      <SelectContent>
                        {regions.map((region) => (
                          <SelectItem key={region} value={region}>
                            {region}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="image">Image URL</Label>
                  <Input
                    id="image"
                    placeholder="/destination-image.jpg"
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
                  <Label htmlFor="featured">Featured Destination</Label>
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
                    {editingDestination ? 'Update Destination' : 'Add Destination'}
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
              placeholder="Search destinations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Destinations Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Destinations ({filteredDestinations.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="pb-3 text-left font-medium">Name</th>
                    <th className="pb-3 text-left font-medium">State</th>
                    <th className="pb-3 text-left font-medium">Region</th>
                    <th className="pb-3 text-left font-medium">Description</th>
                    <th className="pb-3 text-left font-medium">Video</th>
                    <th className="pb-3 text-left font-medium">Featured</th>
                    <th className="pb-3 text-right font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDestinations.map((dest) => (
                    <tr key={dest.id} className="border-b last:border-0">
                      <td className="py-4 font-medium">{dest.name}</td>
                      <td className="py-4">{dest.state}</td>
                      <td className="py-4">{dest.region}</td>
                      <td className="py-4">
                        <span className="line-clamp-2">{dest.description}</span>
                      </td>
                      <td className="py-4">
                        {dest.videoUrl ? (
                          <span className="text-blue-600 text-sm">📹 Yes</span>
                        ) : (
                          <span className="text-gray-400 text-sm">—</span>
                        )}
                      </td>
                      <td className="py-4">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            dest.featured
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {dest.featured ? 'Yes' : 'No'}
                        </span>
                      </td>
                      <td className="py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(dest)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(dest.id)}
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
