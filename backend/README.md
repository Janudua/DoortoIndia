# Door to India - Backend API

A comprehensive RESTful API for the Door to India travel platform, built with Node.js, Express, and MongoDB.

## 🚀 Features

- **Authentication & Authorization**: JWT-based auth with role-based access control
- **Tours Management**: CRUD operations for tour packages
- **Destinations Management**: Manage Indian destinations with detailed information
- **Bookings System**: Handle tour bookings with status tracking
- **Contact Forms**: Process customer inquiries
- **Newsletter**: Manage email subscriptions
- **Security**: Helmet, CORS, rate limiting, and input validation
- **Email Notifications**: Nodemailer integration for automated emails

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

## 🛠️ Installation

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```

4. **Configure your `.env` file**
   - Update MongoDB connection string
   - Set JWT secret
   - Configure email settings (optional)

5. **Start the server**
   
   Development mode:
   ```bash
   npm run dev
   ```
   
   Production mode:
   ```bash
   npm start
   ```

## 🌐 API Endpoints

### Authentication
```
POST   /api/auth/register          Register new user
POST   /api/auth/login             Login user
GET    /api/auth/me                Get current user (Protected)
```

### Tours
```
GET    /api/tours                  Get all tours
GET    /api/tours/:id              Get single tour
GET    /api/tours/slug/:slug       Get tour by slug
POST   /api/tours                  Create tour (Admin)
PUT    /api/tours/:id              Update tour (Admin)
DELETE /api/tours/:id              Delete tour (Admin)
```

**Query Parameters for GET /api/tours:**
- `category`: Filter by category
- `featured`: Filter featured tours (true/false)
- `sort`: Sort by price-asc, price-desc, rating
- `limit`: Limit results

### Destinations
```
GET    /api/destinations           Get all destinations
GET    /api/destinations/:id       Get single destination
GET    /api/destinations/slug/:slug Get destination by slug
POST   /api/destinations           Create destination (Admin)
PUT    /api/destinations/:id       Update destination (Admin)
DELETE /api/destinations/:id       Delete destination (Admin)
```

**Query Parameters for GET /api/destinations:**
- `region`: Filter by region
- `featured`: Filter featured destinations
- `popular`: Filter popular destinations
- `limit`: Limit results

### Bookings
```
GET    /api/bookings               Get all bookings (Admin)
GET    /api/bookings/:id           Get single booking (Protected)
POST   /api/bookings               Create booking
PUT    /api/bookings/:id           Update booking (Admin)
PUT    /api/bookings/:id/cancel    Cancel booking
DELETE /api/bookings/:id           Delete booking (Admin)
```

### Contact
```
GET    /api/contacts               Get all messages (Admin)
GET    /api/contacts/:id           Get single message (Admin)
POST   /api/contacts               Submit contact form
PUT    /api/contacts/:id           Update message status (Admin)
DELETE /api/contacts/:id           Delete message (Admin)
```

### Newsletter
```
GET    /api/newsletter             Get all subscribers (Admin)
POST   /api/newsletter/subscribe   Subscribe to newsletter
POST   /api/newsletter/unsubscribe Unsubscribe from newsletter
DELETE /api/newsletter/:id         Delete subscriber (Admin)
```

### Health Check
```
GET    /api/health                 API health status
```

## 📦 Sample Request/Response

### Create a Booking
**Request:**
```json
POST /api/bookings
Content-Type: application/json

{
  "tour": "507f1f77bcf86cd799439011",
  "customerInfo": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "country": "USA"
  },
  "bookingDetails": {
    "startDate": "2025-12-01",
    "numberOfTravelers": {
      "adults": 2,
      "children": 1
    },
    "totalAmount": 50000,
    "currency": "INR"
  },
  "specialRequests": "Vegetarian meals preferred"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "tour": {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Golden Triangle Tour",
      "duration": "7 Days / 6 Nights",
      "price": 25000
    },
    "customerInfo": {...},
    "bookingDetails": {...},
    "status": "Pending",
    "paymentStatus": "Pending",
    "createdAt": "2025-11-03T10:00:00.000Z"
  },
  "message": "Booking created successfully"
}
```

## 🔐 Authentication

Protected routes require a JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

Admin-only routes require a valid token with admin role.

## 🗄️ Database Models

- **User**: Authentication and user management
- **Tour**: Tour packages with itinerary, pricing, etc.
- **Destination**: Indian destinations with attractions
- **Booking**: Tour reservations and customer info
- **Contact**: Customer inquiries
- **Newsletter**: Email subscriptions

## 🔒 Security Features

- **Helmet**: Secure HTTP headers
- **CORS**: Cross-Origin Resource Sharing
- **Rate Limiting**: Prevent API abuse
- **Input Validation**: Express-validator
- **Password Hashing**: bcryptjs
- **JWT**: Secure authentication tokens

## 📧 Email Configuration

For email functionality (contact forms, newsletters), configure SMTP settings in `.env`:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
EMAIL_FROM=noreply@doortoindia.in
```

**Note**: For Gmail, you need to use an App Password, not your regular password.

## 🧪 Testing

```bash
npm test
```

## 📝 Environment Variables

See `.env.example` for all required environment variables.

## 🚢 Deployment

### Using Docker (Recommended)

Create a `Dockerfile` in the backend directory:

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t doortoindia-backend .
docker run -p 5000:5000 --env-file .env doortoindia-backend
```

### Manual Deployment

1. Set `NODE_ENV=production` in your environment
2. Install dependencies: `npm install --production`
3. Start the server: `npm start`

## 📄 License

MIT

## 👥 Support

For issues and questions, please contact: support@doortoindia.in
