const express = require('express');
const router = express.Router();
const {
  getTours,
  getTour,
  getTourBySlug,
  createTour,
  updateTour,
  deleteTour,
} = require('../controllers/tourController');
const { protect, authorize } = require('../middleware/auth');

router.route('/')
  .get(getTours)
  .post(protect, authorize('admin'), createTour);

router.route('/slug/:slug')
  .get(getTourBySlug);

router.route('/:id')
  .get(getTour)
  .put(protect, authorize('admin'), updateTour)
  .delete(protect, authorize('admin'), deleteTour);

module.exports = router;
