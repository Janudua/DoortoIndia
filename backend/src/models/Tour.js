const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a tour title'],
      trim: true,
      maxlength: [100, 'Title cannot be more than 100 characters'],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, 'Please provide a tour description'],
      maxlength: [2000, 'Description cannot be more than 2000 characters'],
    },
    category: {
      type: String,
      required: [true, 'Please provide a category'],
      enum: ['Honeymoon', 'Cultural & Heritage', 'Adventure', 'Spiritual', 'Wildlife', 'Beach', 'Hill Station'],
    },
    duration: {
      type: String,
      required: [true, 'Please provide tour duration'],
    },
    price: {
      type: Number,
      required: [true, 'Please provide tour price'],
      min: 0,
    },
    currency: {
      type: String,
      default: 'INR',
      enum: ['INR', 'USD', 'EUR', 'GBP'],
    },
    image: {
      type: String,
      required: [true, 'Please provide an image'],
    },
    images: [
      {
        type: String,
      },
    ],
    highlights: [
      {
        type: String,
      },
    ],
    itinerary: [
      {
        day: Number,
        title: String,
        description: String,
        activities: [String],
      },
    ],
    included: [
      {
        type: String,
      },
    ],
    excluded: [
      {
        type: String,
      },
    ],
    locations: [
      {
        type: String,
      },
    ],
    maxGroupSize: {
      type: Number,
      default: 15,
    },
    difficulty: {
      type: String,
      enum: ['Easy', 'Moderate', 'Challenging'],
      default: 'Moderate',
    },
    rating: {
      type: Number,
      default: 4.5,
      min: 0,
      max: 5,
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create slug from title before saving
tourSchema.pre('save', function (next) {
  if (this.isModified('title')) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  next();
});

module.exports = mongoose.model('Tour', tourSchema);
