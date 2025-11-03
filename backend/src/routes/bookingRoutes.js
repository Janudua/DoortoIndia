const express = require('express');
const router = express.Router();
const {
  getBookings,
  getBooking,
  createBooking,
  updateBooking,
  cancelBooking,
  deleteBooking,
} = require('../controllers/bookingController');
const { protect, authorize } = require('../middleware/auth');

router.route('/')
  .get(protect, authorize('admin'), getBookings)
  .post(createBooking);

router.route('/:id')
  .get(protect, getBooking)
  .put(protect, authorize('admin'), updateBooking)
  .delete(protect, authorize('admin'), deleteBooking);

router.route('/:id/cancel')
  .put(cancelBooking);

module.exports = router;
