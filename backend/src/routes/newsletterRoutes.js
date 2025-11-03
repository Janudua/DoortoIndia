const express = require('express');
const router = express.Router();
const {
  getSubscribers,
  subscribe,
  unsubscribe,
  deleteSubscriber,
} = require('../controllers/newsletterController');
const { protect, authorize } = require('../middleware/auth');

router.route('/')
  .get(protect, authorize('admin'), getSubscribers);

router.post('/subscribe', subscribe);
router.post('/unsubscribe', unsubscribe);

router.route('/:id')
  .delete(protect, authorize('admin'), deleteSubscriber);

module.exports = router;
