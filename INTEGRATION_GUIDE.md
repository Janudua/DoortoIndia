# Frontend-Backend Integration Guide

This guide will help you integrate the backend API with your Next.js frontend.

## 🔗 Setup

### 1. Create API Service Layer

Create a new file `lib/api.ts` in your frontend:

```typescript
// lib/api.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

interface FetchOptions extends RequestInit {
  token?: string;
}

async function fetchAPI(endpoint: string, options: FetchOptions = {}) {
  const { token, ...fetchOptions } = options;
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...fetchOptions.headers,
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...fetchOptions,
    headers,
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'An error occurred');
  }
  
  return data;
}

// Tours API
export const toursAPI = {
  getAll: (filters?: { category?: string; featured?: boolean; limit?: number }) => {
    const query = new URLSearchParams(filters as any).toString();
    return fetchAPI(`/tours${query ? `?${query}` : ''}`);
  },
  
  getBySlug: (slug: string) => fetchAPI(`/tours/slug/${slug}`),
  
  getById: (id: string) => fetchAPI(`/tours/${id}`),
};

// Destinations API
export const destinationsAPI = {
  getAll: (filters?: { region?: string; featured?: boolean; limit?: number }) => {
    const query = new URLSearchParams(filters as any).toString();
    return fetchAPI(`/destinations${query ? `?${query}` : ''}`);
  },
  
  getBySlug: (slug: string) => fetchAPI(`/destinations/slug/${slug}`),
  
  getById: (id: string) => fetchAPI(`/destinations/${id}`),
};

// Bookings API
export const bookingsAPI = {
  create: (bookingData: any) => 
    fetchAPI('/bookings', {
      method: 'POST',
      body: JSON.stringify(bookingData),
    }),
  
  getById: (id: string, token: string) => 
    fetchAPI(`/bookings/${id}`, { token }),
  
  cancel: (id: string, reason: string) =>
    fetchAPI(`/bookings/${id}/cancel`, {
      method: 'PUT',
      body: JSON.stringify({ reason }),
    }),
};

// Contact API
export const contactAPI = {
  submit: (contactData: any) =>
    fetchAPI('/contacts', {
      method: 'POST',
      body: JSON.stringify(contactData),
    }),
};

// Newsletter API
export const newsletterAPI = {
  subscribe: (email: string) =>
    fetchAPI('/newsletter/subscribe', {
      method: 'POST',
      body: JSON.stringify({ email }),
    }),
  
  unsubscribe: (email: string) =>
    fetchAPI('/newsletter/unsubscribe', {
      method: 'POST',
      body: JSON.stringify({ email }),
    }),
};

// Auth API
export const authAPI = {
  register: (userData: any) =>
    fetchAPI('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),
  
  login: (credentials: { email: string; password: string }) =>
    fetchAPI('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),
  
  getMe: (token: string) =>
    fetchAPI('/auth/me', { token }),
};
```

### 2. Update Environment Variables

Add to your `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

For production:
```env
NEXT_PUBLIC_API_URL=https://api.doortoindia.in/api
```

### 3. Update Tours Page

Replace hardcoded data in `app/tours/page.tsx`:

```typescript
import { toursAPI } from '@/lib/api';

export default async function ToursPage() {
  // Fetch tours from API
  const response = await toursAPI.getAll({ featured: true });
  const tours = response.data;
  
  return (
    // Your existing JSX with tours data
  );
}
```

### 4. Update Destinations Page

Replace hardcoded data in `app/destinations/page.tsx`:

```typescript
import { destinationsAPI } from '@/lib/api';

export default async function DestinationsPage() {
  const response = await destinationsAPI.getAll();
  const destinations = response.data;
  
  return (
    // Your existing JSX with destinations data
  );
}
```

### 5. Update Featured Tours Component

Update `components/featured-tours.tsx`:

```typescript
'use client';

import { useEffect, useState } from 'react';
import { toursAPI } from '@/lib/api';

export function FeaturedTours() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function fetchTours() {
      try {
        const response = await toursAPI.getAll({ featured: true, limit: 6 });
        setTours(response.data);
      } catch (error) {
        console.error('Error fetching tours:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchTours();
  }, []);
  
  if (loading) return <div>Loading...</div>;
  
  return (
    // Your existing JSX with tours data
  );
}
```

### 6. Update Newsletter Component

Update `components/newsletter.tsx`:

```typescript
'use client';

import { useState } from 'react';
import { newsletterAPI } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await newsletterAPI.subscribe(email);
      toast.success(response.message || 'Successfully subscribed!');
      setEmail('');
    } catch (error: any) {
      toast.error(error.message || 'Failed to subscribe');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Button type="submit" disabled={loading}>
        {loading ? 'Subscribing...' : 'Subscribe'}
      </Button>
    </form>
  );
}
```

### 7. Create Booking Form Component

Create `components/booking-form.tsx`:

```typescript
'use client';

import { useState } from 'react';
import { bookingsAPI } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

interface BookingFormProps {
  tourId: string;
  tourPrice: number;
}

export function BookingForm({ tourId, tourPrice }: BookingFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    startDate: '',
    adults: 2,
    children: 0,
    specialRequests: '',
  });
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const bookingData = {
        tour: tourId,
        customerInfo: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          country: formData.country,
        },
        bookingDetails: {
          startDate: formData.startDate,
          numberOfTravelers: {
            adults: formData.adults,
            children: formData.children,
          },
          totalAmount: tourPrice * (formData.adults + formData.children * 0.5),
          currency: 'INR',
        },
        specialRequests: formData.specialRequests,
      };
      
      const response = await bookingsAPI.create(bookingData);
      toast.success(response.message || 'Booking created successfully!');
      
      // Reset form or redirect
    } catch (error: any) {
      toast.error(error.message || 'Failed to create booking');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Add your form fields here */}
      <Button type="submit" disabled={loading}>
        {loading ? 'Booking...' : 'Book Now'}
      </Button>
    </form>
  );
}
```

### 8. Update Contact Form

Update `app/contact/page.tsx`:

```typescript
'use client';

import { useState } from 'react';
import { contactAPI } from '@/lib/api';
import { toast } from 'sonner';

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await contactAPI.submit(formData);
      toast.success(response.message);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (error: any) {
      toast.error(error.message || 'Failed to send message');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    // Your contact form JSX
  );
}
```

## 🚀 Running Both Services

### Development

1. **Start Backend:**
   ```bash
   cd backend
   npm run dev
   ```
   Backend runs on: http://localhost:5000

2. **Start Frontend:**
   ```bash
   npm run dev
   ```
   Frontend runs on: http://localhost:3000

### Using Docker Compose

Start everything at once:
```bash
docker-compose up -d
```

This starts:
- Frontend on port 3000
- Backend on port 5000
- MongoDB on port 27017

## 📝 Important Notes

1. **CORS**: Backend is configured to accept requests from `http://localhost:3000`
2. **Environment**: Set `NEXT_PUBLIC_API_URL` in your `.env.local`
3. **Error Handling**: All API functions throw errors that should be caught
4. **Loading States**: Implement loading states in your components
5. **Authentication**: Store JWT token in localStorage or use a state management solution

## 🔐 Authentication Flow

```typescript
// Login
const response = await authAPI.login({ email, password });
localStorage.setItem('token', response.data.token);

// Use token
const token = localStorage.getItem('token');
const booking = await bookingsAPI.getById(bookingId, token);

// Logout
localStorage.removeItem('token');
```

## 🎯 Next Steps

1. Replace all hardcoded data with API calls
2. Add error boundaries for better error handling
3. Implement authentication context/provider
4. Add loading skeletons
5. Implement caching strategy (SWR or React Query)
6. Add optimistic updates for better UX

## 📚 Additional Resources

- Backend API Documentation: `backend/README.md`
- Quick Start Guide: `backend/QUICKSTART.md`
- Backend Summary: `BACKEND_SUMMARY.md`

Happy integrating! 🎉
