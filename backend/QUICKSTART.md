# Quick Start Guide - Door to India Backend

## 🚀 Getting Started in 5 Minutes

### Step 1: Set Up Environment Variables

Create a `.env` file in the `backend` directory:

```bash
cp .env.example .env
```

**Minimal configuration for local development:**

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/doortoindia
JWT_SECRET=your_super_secret_jwt_key_12345
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:3000
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Start MongoDB

Make sure MongoDB is running on your system:

**Windows:**
```bash
net start MongoDB
```

**Mac/Linux:**
```bash
sudo systemctl start mongodb
# or
brew services start mongodb-community
```

### Step 4: Seed Database (Optional but Recommended)

Import sample data to get started quickly:

```bash
npm run seed:import
```

This will create:
- 5 sample tours
- 3 sample destinations  
- 1 admin user (admin@doortoindia.in / Admin@123)

### Step 5: Start the Server

```bash
npm run dev
```

You should see:
```
✅ MongoDB Connected: localhost
🚀 Server running in development mode on port 5000
📍 API URL: http://localhost:5000
```

### Step 6: Test the API

Visit: http://localhost:5000/api/health

You should see:
```json
{
  "success": true,
  "message": "API is running",
  "timestamp": "2025-11-03T10:00:00.000Z"
}
```

## 🧪 Testing Endpoints with Examples

### 1. Get All Tours

```bash
curl http://localhost:5000/api/tours
```

### 2. Login as Admin

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@doortoindia.in",
    "password": "Admin@123"
  }'
```

Save the `token` from the response for protected routes.

### 3. Create a Booking

```bash
curl -X POST http://localhost:5000/api/bookings \
  -H "Content-Type: application/json" \
  -d '{
    "tour": "TOUR_ID_HERE",
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
        "children": 0
      },
      "totalAmount": 50000,
      "currency": "INR"
    }
  }'
```

### 4. Subscribe to Newsletter

```bash
curl -X POST http://localhost:5000/api/newsletter/subscribe \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com"
  }'
```

### 5. Submit Contact Form

```bash
curl -X POST http://localhost:5000/api/contacts \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Smith",
    "email": "jane@example.com",
    "subject": "Tour Inquiry",
    "message": "I would like to know more about the Golden Triangle tour."
  }'
```

## 🔧 Common Issues & Solutions

### Issue: Cannot connect to MongoDB
**Solution:** Make sure MongoDB is running and the connection string in `.env` is correct.

### Issue: Port 5000 already in use
**Solution:** Change the PORT in `.env` file or stop the process using port 5000.

### Issue: JWT token errors
**Solution:** Make sure JWT_SECRET is set in your `.env` file.

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/          # Database configuration
│   ├── controllers/     # Request handlers
│   ├── middleware/      # Custom middleware
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API routes
│   ├── utils/           # Helper functions
│   ├── app.js          # Express app setup
│   └── server.js       # Server entry point
├── .env                # Environment variables
├── .env.example        # Example env file
├── package.json        # Dependencies
├── seed.js            # Database seeder
└── README.md          # Documentation
```

## 🎯 Next Steps

1. **Integrate with Frontend**: Update your Next.js app to use these API endpoints
2. **Add More Data**: Create more tours and destinations
3. **Configure Email**: Set up SMTP for email notifications
4. **Deploy**: Deploy to your preferred hosting platform

## 📚 API Documentation

Full API documentation is available in the main README.md file.

## 💡 Tips

- Use Postman or Thunder Client (VS Code extension) for easier API testing
- Enable MongoDB Compass for visual database management
- Check the console logs for helpful debugging information
- Use `npm run seed:delete` to clear all data and start fresh

## 🆘 Need Help?

- Check the main README.md for detailed documentation
- Review the code comments in controllers and models
- Ensure all environment variables are correctly set

Happy coding! 🎉
