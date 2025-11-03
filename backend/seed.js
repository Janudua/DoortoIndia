require('dotenv').config();
const mongoose = require('mongoose');
const Tour = require('./src/models/Tour');
const Destination = require('./src/models/Destination');
const User = require('./src/models/User');

const connectDB = require('./src/config/database');

// Sample data
const tours = [
  {
    title: 'Golden Triangle Tour',
    description: 'Experience the iconic Golden Triangle covering Delhi, Agra, and Jaipur. Visit the magnificent Taj Mahal, explore historic forts, and immerse yourself in rich Indian culture.',
    category: 'Cultural & Heritage',
    duration: '7 Days / 6 Nights',
    price: 25000,
    image: '/taj-mahal-golden-triangle.jpg',
    highlights: [
      'Visit the iconic Taj Mahal at sunrise',
      'Explore Amber Fort and Palace',
      'Experience Old Delhi food tour',
      'Visit Red Fort and Qutub Minar',
    ],
    locations: ['Delhi', 'Agra', 'Jaipur'],
    featured: true,
  },
  {
    title: 'Kerala Backwaters Honeymoon',
    description: 'Romantic getaway through Kerala\'s serene backwaters. Stay in traditional houseboats, enjoy Ayurvedic spa treatments, and relax on pristine beaches.',
    category: 'Honeymoon',
    duration: '6 Days / 5 Nights',
    price: 35000,
    image: '/kerala-honeymoon-houseboat.jpg',
    highlights: [
      'Private houseboat cruise',
      'Couples Ayurvedic massage',
      'Beach resort stay',
      'Sunset at Varkala Beach',
    ],
    locations: ['Cochin', 'Alleppey', 'Kovalam'],
    featured: true,
  },
  {
    title: 'Rajasthan Palace Tour',
    description: 'Explore the royal heritage of Rajasthan. Stay in heritage hotels, visit magnificent palaces, and experience the desert culture.',
    category: 'Cultural & Heritage',
    duration: '10 Days / 9 Nights',
    price: 45000,
    image: '/rajasthan-palace-honeymoon.jpg',
    highlights: [
      'Stay in heritage hotels',
      'Camel safari in Jaisalmer',
      'Lake Pichola boat ride',
      'Visit City Palace Udaipur',
    ],
    locations: ['Jaipur', 'Jodhpur', 'Udaipur', 'Jaisalmer'],
    featured: true,
  },
  {
    title: 'Himalayan Adventure Trek',
    description: 'Trek through the stunning Himalayan landscapes. Experience mountain culture, visit ancient monasteries, and enjoy breathtaking views.',
    category: 'Adventure',
    duration: '12 Days / 11 Nights',
    price: 38000,
    image: '/himalayan-mountains-trekking.jpg',
    highlights: [
      'Trek to mountain base camps',
      'Visit Buddhist monasteries',
      'Experience local Himalayan culture',
      'Panoramic mountain views',
    ],
    locations: ['Manali', 'Leh', 'Ladakh'],
    featured: false,
  },
  {
    title: 'Goa Beach Paradise',
    description: 'Relax on the beautiful beaches of Goa. Enjoy water sports, beach parties, Portuguese heritage, and vibrant nightlife.',
    category: 'Beach',
    duration: '5 Days / 4 Nights',
    price: 18000,
    image: '/goa-beaches-sunset.jpg',
    highlights: [
      'Beach hopping tours',
      'Water sports activities',
      'Portuguese fort visits',
      'Sunset cruise',
    ],
    locations: ['North Goa', 'South Goa'],
    featured: false,
  },
];

const destinations = [
  {
    name: 'Darjeeling',
    state: 'West Bengal',
    region: 'East India',
    description: 'Darjeeling, the "Queen of the Hills", is famous for its tea plantations, stunning views of Kanchenjunga, and the historic Darjeeling Himalayan Railway.',
    shortDescription: 'Famous hill station known for tea plantations and mountain views',
    image: '/darjeeling-hills.jpg',
    bestTimeToVisit: 'March to May, September to November',
    thingsToDo: [
      'Take a toy train ride',
      'Visit tea plantations',
      'Watch sunrise at Tiger Hill',
      'Explore monasteries',
    ],
    featured: true,
    popular: true,
  },
  {
    name: 'Sundarbans',
    state: 'West Bengal',
    region: 'East India',
    description: 'The Sundarbans is the largest mangrove forest in the world and home to the Royal Bengal Tiger. A UNESCO World Heritage Site.',
    shortDescription: 'Largest mangrove forest and tiger reserve',
    image: '/sundarbans-wildlife.jpg',
    bestTimeToVisit: 'September to March',
    thingsToDo: [
      'Boat safari',
      'Tiger spotting',
      'Bird watching',
      'Village tours',
    ],
    featured: true,
    popular: false,
  },
  {
    name: 'Udaipur',
    state: 'Rajasthan',
    region: 'West India',
    description: 'Known as the "City of Lakes", Udaipur is famous for its romantic palaces, lakes, and rich cultural heritage.',
    shortDescription: 'The romantic city of lakes and palaces',
    image: '/udaipur-palaces.jpg',
    bestTimeToVisit: 'October to March',
    thingsToDo: [
      'Boat ride on Lake Pichola',
      'Visit City Palace',
      'Explore Jag Mandir',
      'Evening cultural shows',
    ],
    featured: true,
    popular: true,
  },
];

const users = [
  {
    name: 'Admin User',
    email: process.env.ADMIN_EMAIL || 'admin@doortoindia.in',
    password: process.env.ADMIN_PASSWORD || 'Admin@123',
    role: 'admin',
  },
];

// Import data
const importData = async () => {
  try {
    await connectDB();
    
    // Clear existing data
    await Tour.deleteMany();
    await Destination.deleteMany();
    await User.deleteMany();
    
    // Insert sample data
    await Tour.insertMany(tours);
    await Destination.insertMany(destinations);
    await User.insertMany(users);
    
    console.log('✅ Data imported successfully');
    process.exit();
  } catch (error) {
    console.error('❌ Error importing data:', error);
    process.exit(1);
  }
};

// Delete data
const deleteData = async () => {
  try {
    await connectDB();
    
    await Tour.deleteMany();
    await Destination.deleteMany();
    await User.deleteMany();
    
    console.log('✅ Data deleted successfully');
    process.exit();
  } catch (error) {
    console.error('❌ Error deleting data:', error);
    process.exit(1);
  }
};

// Run based on command line argument
if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
} else {
  console.log('Please use: npm run seed -i (import) or npm run seed -d (delete)');
  process.exit();
}
