# Admin Panel Documentation

## Overview
This is a comprehensive admin panel for managing all content on the Door to India website. The admin panel allows you to manage tours, destinations, bookings, contact inquiries, and newsletter subscribers.

## Access

### Login Credentials (Demo)
- **URL:** http://localhost:3000/admin/login
- **Email:** admin@doortoindia.in
- **Password:** admin123

## Features

### 1. Dashboard (`/admin`)
- Overview statistics for Tours, Destinations, Bookings, and Newsletter Subscribers
- Recent bookings table
- Quick action cards

### 2. Tours Management (`/admin/tours`)
Manage all tour packages on the website.

**Features:**
- View all tours in a table format
- Add new tours with the following fields:
  - Title
  - Category (Honeymoon, Cultural & Heritage, Adventure, Spiritual, Wildlife, Beach, Hill Station)
  - Duration (in days)
  - Price (₹)
  - Description
  - Image URL
  - Featured toggle
- Edit existing tours
- Delete tours
- Search/filter tours

### 3. Destinations Management (`/admin/destinations`)
Manage travel destinations.

**Features:**
- View all destinations in a table format
- Add new destinations with the following fields:
  - Name
  - State
  - Region (North India, South India, East India, West India, Central India, Northeast India)
  - Description
  - Image URL
  - Featured toggle
- Edit existing destinations
- Delete destinations
- Search/filter destinations

### 4. Bookings Management (`/admin/bookings`)
View and manage customer bookings.

**Features:**
- View all bookings with customer details
- Filter by booking status
- Update booking status (Pending, Confirmed, Cancelled, Completed)
- Update payment status (Pending, Paid, Failed, Refunded)
- View detailed booking information
- Statistics dashboard showing:
  - Total bookings
  - Pending bookings
  - Confirmed bookings
  - Total revenue

### 5. Contact Inquiries (`/admin/contacts`)
Manage customer inquiries and messages.

**Features:**
- View all contact inquiries
- Filter by status (New, In Progress, Resolved)
- Update inquiry status
- View full inquiry details including:
  - Customer name, email, phone
  - Subject and message
  - Date submitted
- Reply to customers directly from the panel
- Delete inquiries
- Statistics showing inquiry counts by status

### 6. Newsletter Management (`/admin/newsletter`)
Manage email subscribers and send newsletters.

**Features:**
- View all newsletter subscribers
- See subscription status (Active/Unsubscribed)
- Delete subscribers
- Export subscriber list as CSV
- Send email to all active subscribers with:
  - Custom subject
  - Custom message
- Statistics showing:
  - Total subscribers
  - Active subscribers
  - Unsubscribed count
  - New subscribers this month

## Authentication

The admin panel is protected with a simple authentication system:
- Login page at `/admin/login`
- All admin routes require authentication
- Session stored in localStorage
- Logout button in header to end session

## Data Persistence

**Current Implementation:**
- All data is stored in component state using React's `useState`
- Data resets when page refreshes
- This is a demo/prototype implementation

**To Add Real Persistence:**
You have several options:

1. **Connect to the Express API Backend:**
   - The backend API is already created in the `backend/` folder
   - Update each admin page to make API calls instead of using useState
   - Replace mock data with API fetch calls

2. **Use localStorage:**
   - Add localStorage sync to persist data across refreshes
   - Good for demo/development without a backend

3. **Use a Database Service:**
   - MongoDB (already set up in backend)
   - PostgreSQL with Prisma
   - Firebase
   - Supabase

## Tech Stack

- **Frontend Framework:** Next.js 16 with App Router
- **UI Components:** shadcn/ui
- **Icons:** Lucide React
- **Styling:** Tailwind CSS
- **Notifications:** Sonner (toast notifications)

## File Structure

```
app/admin/
├── page.tsx                    # Dashboard
├── login/
│   └── page.tsx               # Login page
├── tours/
│   └── page.tsx               # Tours management
├── destinations/
│   └── page.tsx               # Destinations management
├── bookings/
│   └── page.tsx               # Bookings management
├── contacts/
│   └── page.tsx               # Contact inquiries
└── newsletter/
    └── page.tsx               # Newsletter management

components/admin/
├── admin-layout.tsx           # Layout wrapper with auth
├── admin-sidebar.tsx          # Navigation sidebar
└── admin-auth-check.tsx       # Authentication guard
```

## Usage

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Navigate to admin login:**
   ```
   http://localhost:3000/admin/login
   ```

3. **Login with demo credentials:**
   - Email: admin@doortoindia.in
   - Password: admin123

4. **Use the sidebar to navigate between sections**

## Customization

### Adding New Admin Pages
1. Create a new page in `app/admin/your-page/page.tsx`
2. Add the route to `admin-sidebar.tsx`
3. Wrap your page content with `<AdminLayout>`

### Styling
- All components use Tailwind CSS
- shadcn/ui components can be customized in `components/ui/`
- Global styles in `app/globals.css`

### Adding More Fields
To add new fields to any management page:
1. Update the initial data array
2. Add form fields in the Dialog component
3. Update the form state and handlers
4. Add the field to the table display

## Security Notes

**Current Implementation (Demo Only):**
- Simple localStorage-based authentication
- Hardcoded credentials
- No encryption
- No session management
- No API protection

**For Production, You Should:**
- Implement proper JWT authentication
- Use environment variables for credentials
- Add password hashing (bcrypt)
- Implement CSRF protection
- Add rate limiting
- Use HTTPS only
- Add role-based access control (RBAC)
- Implement session timeout
- Add audit logging

## Next Steps

1. **Connect to Backend API:**
   - Replace useState with API calls
   - Implement proper data fetching
   - Add loading states and error handling

2. **Add Authentication:**
   - Implement JWT-based auth
   - Add user management
   - Create admin user roles

3. **Enhance Features:**
   - Add image upload functionality
   - Implement rich text editor for descriptions
   - Add data validation
   - Implement pagination for large datasets
   - Add sorting and advanced filtering
   - Export reports (PDF, Excel)

4. **Add Analytics:**
   - Booking trends
   - Revenue charts
   - Popular tours/destinations
   - Conversion rates

## Support

For questions or issues, please contact the development team.
