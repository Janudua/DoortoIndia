# Admin Panel Quick Reference Guide

## 🚀 Quick Start

**Login URL:** `http://localhost:3000/admin/login`

**Credentials:**
- Email: `admin@doortoindia.in`
- Password: `admin123`

---

## 📋 Admin Pages Overview

| Page | URL | Purpose | Count |
|------|-----|---------|-------|
| Dashboard | `/admin` | Overview & statistics | - |
| Hero Tours | `/admin/hero-tours` | Manage homepage hero section | 3 items |
| Tours | `/admin/tours` | Manage tour packages | 12 items |
| Destinations | `/admin/destinations` | Manage travel destinations | 15 items |
| Bookings | `/admin/bookings` | View & manage bookings | 3 items |
| Contacts | `/admin/contacts` | Manage inquiries | 3 items |
| Newsletter | `/admin/newsletter` | Manage subscribers | 5 items |
| Testimonials | `/admin/testimonials` | Manage reviews | 3 items |
| Footer | `/admin/footer` | Edit footer content | 1 config |

---

## 🎯 Common Actions

### Add New Item
1. Navigate to desired page
2. Click "Add [Item Type]" button (usually top-right)
3. Fill in the form
4. Click "Add" or "Save"

### Edit Existing Item
1. Find item in list/table
2. Click "Edit" button (pencil icon)
3. Modify fields
4. Click "Update" or "Save"

### Delete Item
1. Find item in list/table
2. Click "Delete" button (trash icon)
3. Confirm deletion
4. Item removed with success message

### Search/Filter
1. Use search bar at top of page
2. Type keywords (searches name, title, email, etc.)
3. Results filter in real-time
4. Use dropdown filters for status/category where available

---

## 📊 Quick Stats (Current Data)

- **12 Tours** - All categories covered
- **15 Destinations** - 5 regions of India
- **3 Hero Tours** - Featured on homepage
- **3 Testimonials** - Customer reviews
- **5 Newsletter Subscribers** - Active contacts
- **3 Bookings** - Current reservations
- **3 Contact Inquiries** - Customer messages

---

## ✏️ Form Fields Reference

### Hero Tours
- **Title*** (e.g., "Golden Triangle Tour")
- **Subtitle*** (e.g., "Delhi, Agra & Jaipur")
- **Description*** (Brief text for hero section)
- **Image URL*** (Path to image file)
- **Display Order** (Number: 1, 2, 3...)
- **Featured** (Checkbox)

### Tours
- **Title*** (Tour package name)
- **Category*** (Honeymoon, Cultural, Adventure, etc.)
- **Duration*** (e.g., "7 Days / 6 Nights")
- **Price*** (₹ amount)
- **Description** (Detailed information)
- **Image URL** (Tour image)
- **Featured** (Checkbox)

### Destinations
- **Name*** (Destination name)
- **State*** (Indian state)
- **Region*** (North, South, East, West, Central, Northeast)
- **Description*** (About the destination)
- **Image URL** (Destination image)
- **Featured** (Checkbox)

### Testimonials
- **Customer Name*** (e.g., "John & Sarah Miller")
- **Location*** (e.g., "New York, USA")
- **Tour Name*** (Associated tour)
- **Rating*** (1-5 stars)
- **Review*** (Customer feedback)
- **Image URL** (Customer photo)
- **Date** (Review date)
- **Featured** (Display on homepage)

### Footer
- **Company Name** (Business name)
- **Tagline** (Slogan)
- **Description** (About text)
- **Email** (Contact email)
- **Phone** (Contact number)
- **Address** (Business address)
- **Social Media Links** (Facebook, Instagram, Twitter, YouTube)
- **Quick Links** (Navigation items)
- **Policy Links** (Legal pages)
- **Copyright** (Copyright text)

*Required fields marked with asterisk (*)

---

## 🎨 Categories & Options

### Tour Categories
1. Honeymoon
2. Cultural & Heritage
3. Adventure
4. Spiritual
5. Wildlife
6. Beach
7. Hill Station

### Destination Regions
1. North India
2. South India
3. East India
4. West India
5. Central India
6. Northeast India

### Booking Status
- Pending
- Confirmed
- Cancelled
- Completed

### Payment Status
- Pending
- Paid
- Failed
- Refunded

### Contact Status
- New
- In Progress
- Resolved

### Testimonial Ratings
- 5 Stars ⭐⭐⭐⭐⭐
- 4 Stars ⭐⭐⭐⭐
- 3 Stars ⭐⭐⭐
- 2 Stars ⭐⭐
- 1 Star ⭐

---

## 💡 Tips & Best Practices

### Images
- Use high-quality images (minimum 1200px wide)
- Keep file sizes under 500KB for fast loading
- Use descriptive filenames
- Store images in `/public/` folder
- Reference with path: `/image-name.jpg`

### Descriptions
- Keep hero descriptions under 100 characters
- Tour descriptions: 200-500 characters
- Destination descriptions: 150-300 characters
- Be concise but informative

### Featured Content
- **Hero Tours:** 3-5 items recommended
- **Tours:** Feature best-sellers only
- **Destinations:** Feature popular locations
- **Testimonials:** Only 4-5 star reviews

### Pricing
- Enter prices in INR (₹)
- Don't include currency symbol in form
- Keep pricing competitive
- Update seasonally

### Display Order
- Lower numbers appear first
- Use: 1, 2, 3, 4, 5...
- Leave gaps for easy reordering (10, 20, 30...)

---

## ⌨️ Keyboard Shortcuts

- **Tab** - Move between form fields
- **Enter** - Submit form (when focused on input)
- **Esc** - Close dialog/modal
- **Ctrl+F** - Browser search (find text on page)

---

## 🔄 Workflow Examples

### Adding a New Tour Package

1. Click "Tours" in sidebar
2. Click "Add New Tour" button
3. Fill in:
   - Title: "Goa Beach Getaway"
   - Category: Select "Beach"
   - Duration: "5 Days / 4 Nights"
   - Price: 22000
   - Description: "Relax on pristine beaches..."
   - Image: "/goa-beach.jpg"
   - Featured: ✓ (if popular)
4. Click "Add Tour"
5. Success! Tour appears in list

### Updating Hero Section

1. Click "Hero Tours" in sidebar
2. View current 3 featured tours
3. Click "Edit" on tour to update
4. Or click "Add Hero Tour" for new one
5. Set display order (1, 2, 3)
6. Toggle "Featured on Hero"
7. Click "Update" or "Add"
8. Hero section updated!

### Managing Customer Inquiry

1. Click "Contacts" in sidebar
2. Find new inquiry (Status: "New")
3. Click "View" (eye icon)
4. Read customer message
5. Type reply in text area
6. Click "Send Reply"
7. Status auto-updates to "Resolved"

### Publishing a Testimonial

1. Click "Testimonials" in sidebar
2. Click "Add Testimonial"
3. Enter customer details
4. Select 5-star rating
5. Paste review text
6. Toggle "Featured" to show on homepage
7. Click "Add Testimonial"
8. Testimonial now live!

---

## ❗ Common Issues & Solutions

### Issue: Changes disappear after refresh
**Solution:** This is by design (demo mode). To persist data, connect to backend API or add localStorage.

### Issue: Image not showing
**Solution:** 
- Check image path starts with `/`
- Verify image exists in `/public/` folder
- Check spelling of filename

### Issue: Can't login
**Solution:**
- Use exact credentials: `admin@doortoindia.in` / `admin123`
- Clear browser cache
- Try incognito/private window

### Issue: Form won't submit
**Solution:**
- Check all required fields (marked with *)
- Ensure price is a valid number
- Check for error messages below fields

### Issue: Delete button not working
**Solution:**
- You must confirm deletion in popup
- Click "OK" or "Yes" in confirmation dialog

---

## 📱 Mobile Usage

The admin panel is mobile-friendly:
- Sidebar collapses on small screens
- Tables scroll horizontally
- Forms adapt to screen size
- Touch-optimized buttons
- Recommended: Use tablet or desktop for best experience

---

## 🔒 Security Notes

- Always logout when done
- Don't share admin credentials
- Use strong passwords in production
- Access only from secure networks
- Regular data backups recommended

---

## 📊 Status Indicators

### Color Coding

| Color | Meaning | Used In |
|-------|---------|---------|
| 🟢 Green | Confirmed, Paid, Resolved, Active | Bookings, Payments, Contacts |
| 🟡 Yellow | Pending, In Progress | Bookings, Contacts |
| 🔵 Blue | Featured, New This Month | Stats, Tours |
| 🔴 Red | Cancelled, Failed, Unsubscribed | Bookings, Newsletter |

---

## 🎯 Success Metrics

Track these KPIs in your dashboard:

- **Conversion Rate:** Bookings vs. Inquiries
- **Popular Tours:** Most booked packages
- **Top Destinations:** Most viewed/featured
- **Customer Satisfaction:** Average testimonial rating
- **Newsletter Growth:** New subscribers per month
- **Inquiry Response:** Time to resolve contacts

---

## 📞 Need Help?

1. **Check Documentation:**
   - `ADMIN_PANEL_README.md` - Complete guide
   - `ADMIN_UPDATES.md` - Recent changes
   - This file - Quick reference

2. **Common Questions:**
   - How do I add images? → Place in `/public/` folder
   - How do I feature a tour? → Check "Featured" box when editing
   - How do I change footer? → Go to Footer page, edit fields
   - How do I export data? → Click "Export" button (Newsletter page)

3. **Technical Issues:**
   - Contact development team
   - Check browser console for errors (F12)
   - Try different browser

---

## ✅ Daily Checklist

- [ ] Check new bookings
- [ ] Review contact inquiries
- [ ] Update booking statuses
- [ ] Respond to pending messages
- [ ] Check newsletter subscribers
- [ ] Review new testimonials

---

## 📅 Weekly Checklist

- [ ] Add new tours (if available)
- [ ] Update featured content
- [ ] Review pricing
- [ ] Send newsletter to subscribers
- [ ] Archive completed bookings
- [ ] Update hero section tours

---

**Quick Tip:** Bookmark this page for easy reference! 📌

**Last Updated:** November 3, 2025
