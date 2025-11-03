const express = require('express');
const router = express.Router();
const {
  getDestinations,
  getDestination,
  getDestinationBySlug,
  createDestination,
  updateDestination,
  deleteDestination,
} = require('../controllers/destinationController');
const { protect, authorize } = require('../middleware/auth');

router.route('/')
  .get(getDestinations)
  .post(protect, authorize('admin'), createDestination);

router.route('/slug/:slug')
  .get(getDestinationBySlug);

router.route('/:id')
  .get(getDestination)
  .put(protect, authorize('admin'), updateDestination)
  .delete(protect, authorize('admin'), deleteDestination);

module.exports = router;
