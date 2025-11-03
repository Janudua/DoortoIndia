const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a destination name'],
      trim: true,
      maxlength: [100, 'Name cannot be more than 100 characters'],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    state: {
      type: String,
      required: [true, 'Please provide a state'],
    },
    region: {
      type: String,
      required: [true, 'Please provide a region'],
      enum: ['North India', 'South India', 'East India', 'West India', 'Central India', 'Northeast India'],
    },
    description: {
      type: String,
      required: [true, 'Please provide a description'],
      maxlength: [2000, 'Description cannot be more than 2000 characters'],
    },
    shortDescription: {
      type: String,
      maxlength: [200, 'Short description cannot be more than 200 characters'],
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
    attractions: [
      {
        name: String,
        description: String,
        image: String,
      },
    ],
    bestTimeToVisit: {
      type: String,
    },
    howToReach: {
      byAir: String,
      byTrain: String,
      byRoad: String,
    },
    thingsToDo: [
      {
        type: String,
      },
    ],
    localCuisine: [
      {
        type: String,
      },
    ],
    accommodation: [
      {
        type: String,
        category: String,
      },
    ],
    featured: {
      type: Boolean,
      default: false,
    },
    popular: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: Number,
      default: 4.0,
      min: 0,
      max: 5,
    },
    reviewCount: {
      type: Number,
      default: 0,
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

// Create slug from name before saving
destinationSchema.pre('save', function (next) {
  if (this.isModified('name')) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  next();
});

module.exports = mongoose.model('Destination', destinationSchema);
