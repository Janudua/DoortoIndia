'use client';

import { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/admin-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Save } from 'lucide-react';
import { FooterService } from '@/lib/data-service';

export default function FooterManagement() {
  const [footerData, setFooterData] = useState({
    companyName: 'Door to India',
    tagline: 'Your Gateway to Incredible India',
    description: 'Discover the beauty, culture, and heritage of India with our expertly curated tour packages.',
    email: 'info@doortoindia.in',
    phone: '+91 98765 43210',
    address: '123 Tourism Street, New Delhi, India 110001',
    socialMedia: {
      facebook: 'https://facebook.com/doortoindia',
      instagram: 'https://instagram.com/doortoindia',
      twitter: 'https://twitter.com/doortoindia',
      youtube: 'https://youtube.com/doortoindia',
    },
    quickLinks: [
      { title: 'About Us', url: '/about' },
      { title: 'Tours', url: '/tours' },
      { title: 'Destinations', url: '/destinations' },
      { title: 'Contact', url: '/contact' },
    ],
    copyright: '© 2025 Door to India. All rights reserved.',
    policies: [
      { title: 'Privacy Policy', url: '/privacy' },
      { title: 'Terms of Service', url: '/terms' },
      { title: 'Cancellation Policy', url: '/cancellation' },
    ],
  });

  const [quickLinks, setQuickLinks] = useState(footerData.quickLinks);
  const [policies, setPolicies] = useState(footerData.policies);

  // Load footer from localStorage on mount
  useEffect(() => {
    const savedFooter = FooterService.get();
    if (savedFooter) {
      setFooterData(savedFooter);
      setQuickLinks(savedFooter.quickLinks);
      setPolicies(savedFooter.policies);
    } else {
      // Initialize with default footer data if none exists
      FooterService.save({
        ...footerData,
        quickLinks,
        policies,
      });
    }
  }, []);

  const handleSave = () => {
    const updatedFooter = {
      ...footerData,
      quickLinks,
      policies,
    };
    setFooterData(updatedFooter);
    FooterService.save(updatedFooter);
    toast.success('Footer settings saved successfully');
  };

  const addQuickLink = () => {
    setQuickLinks([...quickLinks, { title: '', url: '' }]);
  };

  const removeQuickLink = (index: number) => {
    setQuickLinks(quickLinks.filter((_, i) => i !== index));
  };

  const updateQuickLink = (index: number, field: 'title' | 'url', value: string) => {
    const updated = [...quickLinks];
    updated[index][field] = value;
    setQuickLinks(updated);
  };

  const addPolicy = () => {
    setPolicies([...policies, { title: '', url: '' }]);
  };

  const removePolicy = (index: number) => {
    setPolicies(policies.filter((_, i) => i !== index));
  };

  const updatePolicy = (index: number, field: 'title' | 'url', value: string) => {
    const updated = [...policies];
    updated[index][field] = value;
    setPolicies(updated);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Footer Management</h1>
            <p className="mt-2 text-gray-600">Manage footer content and links</p>
          </div>
          <Button onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>

        {/* Company Info */}
        <Card>
          <CardHeader>
            <CardTitle>Company Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  value={footerData.companyName}
                  onChange={(e) => setFooterData({ ...footerData, companyName: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="tagline">Tagline</Label>
                <Input
                  id="tagline"
                  value={footerData.tagline}
                  onChange={(e) => setFooterData({ ...footerData, tagline: e.target.value })}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={footerData.description}
                onChange={(e) => setFooterData({ ...footerData, description: e.target.value })}
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Contact Info */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={footerData.email}
                onChange={(e) => setFooterData({ ...footerData, email: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={footerData.phone}
                onChange={(e) => setFooterData({ ...footerData, phone: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                value={footerData.address}
                onChange={(e) => setFooterData({ ...footerData, address: e.target.value })}
                rows={2}
              />
            </div>
          </CardContent>
        </Card>

        {/* Social Media */}
        <Card>
          <CardHeader>
            <CardTitle>Social Media Links</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="facebook">Facebook</Label>
                <Input
                  id="facebook"
                  value={footerData.socialMedia.facebook}
                  onChange={(e) => setFooterData({
                    ...footerData,
                    socialMedia: { ...footerData.socialMedia, facebook: e.target.value }
                  })}
                />
              </div>
              <div>
                <Label htmlFor="instagram">Instagram</Label>
                <Input
                  id="instagram"
                  value={footerData.socialMedia.instagram}
                  onChange={(e) => setFooterData({
                    ...footerData,
                    socialMedia: { ...footerData.socialMedia, instagram: e.target.value }
                  })}
                />
              </div>
              <div>
                <Label htmlFor="twitter">Twitter</Label>
                <Input
                  id="twitter"
                  value={footerData.socialMedia.twitter}
                  onChange={(e) => setFooterData({
                    ...footerData,
                    socialMedia: { ...footerData.socialMedia, twitter: e.target.value }
                  })}
                />
              </div>
              <div>
                <Label htmlFor="youtube">YouTube</Label>
                <Input
                  id="youtube"
                  value={footerData.socialMedia.youtube}
                  onChange={(e) => setFooterData({
                    ...footerData,
                    socialMedia: { ...footerData.socialMedia, youtube: e.target.value }
                  })}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Links */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Quick Links</CardTitle>
              <Button size="sm" onClick={addQuickLink}>Add Link</Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {quickLinks.map((link, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  placeholder="Link Title"
                  value={link.title}
                  onChange={(e) => updateQuickLink(index, 'title', e.target.value)}
                />
                <Input
                  placeholder="URL"
                  value={link.url}
                  onChange={(e) => updateQuickLink(index, 'url', e.target.value)}
                />
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removeQuickLink(index)}
                >
                  Remove
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Policy Links */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Policy Links</CardTitle>
              <Button size="sm" onClick={addPolicy}>Add Policy</Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {policies.map((policy, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  placeholder="Policy Title"
                  value={policy.title}
                  onChange={(e) => updatePolicy(index, 'title', e.target.value)}
                />
                <Input
                  placeholder="URL"
                  value={policy.url}
                  onChange={(e) => updatePolicy(index, 'url', e.target.value)}
                />
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removePolicy(index)}
                >
                  Remove
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Copyright */}
        <Card>
          <CardHeader>
            <CardTitle>Copyright Text</CardTitle>
          </CardHeader>
          <CardContent>
            <Input
              value={footerData.copyright}
              onChange={(e) => setFooterData({ ...footerData, copyright: e.target.value })}
            />
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
