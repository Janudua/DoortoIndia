require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');

const mockData = require('./data/mockData');

const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
};
app.use(cors(corsOptions));

// Security headers
app.use(helmet());

// Compression middleware
app.use(compression());

// Logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API is running (Demo Mode - No Database)',
    timestamp: new Date().toISOString(),
  });
});

// Tours endpoints
app.get('/api/tours', (req, res) => {
  const { category, featured, sort, limit } = req.query;
  
  let filteredTours = [...mockData.tours];
  
  if (category) {
    filteredTours = filteredTours.filter(t => t.category === category);
  }
  
  if (featured === 'true') {
    filteredTours = filteredTours.filter(t => t.featured);
  }
  
  if (sort === 'price-asc') {
    filteredTours.sort((a, b) => a.price - b.price);
  } else if (sort === 'price-desc') {
    filteredTours.sort((a, b) => b.price - a.price);
  } else if (sort === 'rating') {
    filteredTours.sort((a, b) => b.rating - a.rating);
  }
  
  if (limit) {
    filteredTours = filteredTours.slice(0, parseInt(limit));
  }
  
  res.json({
    success: true,
    count: filteredTours.length,
    data: filteredTours,
  });
});

app.get('/api/tours/slug/:slug', (req, res) => {
  const tour = mockData.tours.find(t => t.slug === req.params.slug);
  
  if (!tour) {
    return res.status(404).json({
      success: false,
      message: 'Tour not found',
    });
  }
  
  res.json({
    success: true,
    data: tour,
  });
});

app.get('/api/tours/:id', (req, res) => {
  const tour = mockData.tours.find(t => t._id === req.params.id);
  
  if (!tour) {
    return res.status(404).json({
      success: false,
      message: 'Tour not found',
    });
  }
  
  res.json({
    success: true,
    data: tour,
  });
});

// Destinations endpoints
app.get('/api/destinations', (req, res) => {
  const { region, featured, popular, limit } = req.query;
  
  let filteredDestinations = [...mockData.destinations];
  
  if (region) {
    filteredDestinations = filteredDestinations.filter(d => d.region === region);
  }
  
  if (featured === 'true') {
    filteredDestinations = filteredDestinations.filter(d => d.featured);
  }
  
  if (popular === 'true') {
    filteredDestinations = filteredDestinations.filter(d => d.popular);
  }
  
  if (limit) {
    filteredDestinations = filteredDestinations.slice(0, parseInt(limit));
  }
  
  res.json({
    success: true,
    count: filteredDestinations.length,
    data: filteredDestinations,
  });
});

app.get('/api/destinations/slug/:slug', (req, res) => {
  const destination = mockData.destinations.find(d => d.slug === req.params.slug);
  
  if (!destination) {
    return res.status(404).json({
      success: false,
      message: 'Destination not found',
    });
  }
  
  res.json({
    success: true,
    data: destination,
  });
});

app.get('/api/destinations/:id', (req, res) => {
  const destination = mockData.destinations.find(d => d._id === req.params.id);
  
  if (!destination) {
    return res.status(404).json({
      success: false,
      message: 'Destination not found',
    });
  }
  
  res.json({
    success: true,
    data: destination,
  });
});

// Bookings endpoint
app.post('/api/bookings', (req, res) => {
  const booking = {
    _id: String(mockData.bookings.length + 1),
    ...req.body,
    status: 'Pending',
    paymentStatus: 'Pending',
    createdAt: new Date(),
  };
  
  mockData.bookings.push(booking);
  
  res.status(201).json({
    success: true,
    data: booking,
    message: 'Booking created successfully! (Demo mode - not persisted)',
  });
});

// Contact endpoint
app.post('/api/contacts', (req, res) => {
  const contact = {
    _id: String(mockData.contacts.length + 1),
    ...req.body,
    status: 'New',
    replied: false,
    createdAt: new Date(),
  };
  
  mockData.contacts.push(contact);
  
  res.status(201).json({
    success: true,
    data: contact,
    message: 'Your message has been sent successfully! We will get back to you soon. (Demo mode)',
  });
});

// Newsletter endpoints
app.post('/api/newsletter/subscribe', (req, res) => {
  const { email } = req.body;
  
  if (!email) {
    return res.status(400).json({
      success: false,
      message: 'Please provide an email address',
    });
  }
  
  const existing = mockData.newsletter.find(s => s.email === email);
  
  if (existing) {
    return res.status(400).json({
      success: false,
      message: 'This email is already subscribed',
    });
  }
  
  const subscriber = {
    _id: String(mockData.newsletter.length + 1),
    email,
    active: true,
    createdAt: new Date(),
  };
  
  mockData.newsletter.push(subscriber);
  
  res.status(201).json({
    success: true,
    data: subscriber,
    message: 'Successfully subscribed to newsletter! (Demo mode)',
  });
});

app.post('/api/newsletter/unsubscribe', (req, res) => {
  const { email } = req.body;
  
  const subscriber = mockData.newsletter.find(s => s.email === email);
  
  if (!subscriber) {
    return res.status(404).json({
      success: false,
      message: 'Email not found in our subscriber list',
    });
  }
  
  subscriber.active = false;
  subscriber.unsubscribedAt = new Date();
  
  res.json({
    success: true,
    message: 'Successfully unsubscribed from newsletter',
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    success: false,
    message: err.message || 'Server Error',
  });
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log('\n🎉 ========================================');
  console.log('   Door to India Backend API (DEMO MODE)');
  console.log('========================================\n');
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 API URL: http://localhost:${PORT}`);
  console.log(`🏥 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`📚 Tours API: http://localhost:${PORT}/api/tours`);
  console.log(`🏞️  Destinations: http://localhost:${PORT}/api/destinations`);
  console.log('\n⚠️  Running in DEMO MODE (No Database)');
  console.log('   Data is stored in memory and will reset on restart\n');
});

process.on('SIGTERM', () => {
  console.log('👋 SIGTERM received. Shutting down gracefully');
  server.close(() => {
    console.log('💀 Process terminated');
  });
});

module.exports = app;
