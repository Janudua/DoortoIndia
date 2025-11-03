const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    tour: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tour',
      required: [true, 'Booking must belong to a tour'],
    },
    customerInfo: {
      firstName: {
        type: String,
        required: [true, 'Please provide first name'],
        trim: true,
      },
      lastName: {
        type: String,
        required: [true, 'Please provide last name'],
        trim: true,
      },
      email: {
        type: String,
        required: [true, 'Please provide email'],
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
      },
      phone: {
        type: String,
        required: [true, 'Please provide phone number'],
      },
      country: {
        type: String,
        required: [true, 'Please provide country'],
      },
    },
    bookingDetails: {
      startDate: {
        type: Date,
        required: [true, 'Please provide start date'],
      },
      endDate: {
        type: Date,
      },
      numberOfTravelers: {
        adults: {
          type: Number,
          required: true,
          min: 1,
        },
        children: {
          type: Number,
          default: 0,
          min: 0,
        },
      },
      totalAmount: {
        type: Number,
        required: [true, 'Please provide total amount'],
      },
      currency: {
        type: String,
        default: 'INR',
      },
    },
    specialRequests: {
      type: String,
      maxlength: [500, 'Special requests cannot be more than 500 characters'],
    },
    status: {
      type: String,
      enum: ['Pending', 'Confirmed', 'Cancelled', 'Completed'],
      default: 'Pending',
    },
    paymentStatus: {
      type: String,
      enum: ['Pending', 'Paid', 'Failed', 'Refunded'],
      default: 'Pending',
    },
    paymentInfo: {
      transactionId: String,
      paymentMethod: String,
      paidAt: Date,
    },
    cancellationReason: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Booking', bookingSchema);
