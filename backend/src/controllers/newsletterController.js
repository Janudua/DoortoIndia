const Newsletter = require('../models/Newsletter');
const { sendEmail } = require('../utils/sendEmail');

// @desc    Get all newsletter subscribers
// @route   GET /api/newsletter
// @access  Private/Admin
exports.getSubscribers = async (req, res) => {
  try {
    const { active } = req.query;
    
    let query = {};
    
    if (active !== undefined) {
      query.active = active === 'true';
    }
    
    const subscribers = await Newsletter.find(query).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: subscribers.length,
      data: subscribers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

// @desc    Subscribe to newsletter
// @route   POST /api/newsletter/subscribe
// @access  Public
exports.subscribe = async (req, res) => {
  try {
    const { email } = req.body;
    
    // Check if already subscribed
    let subscriber = await Newsletter.findOne({ email });
    
    if (subscriber) {
      if (subscriber.active) {
        return res.status(400).json({
          success: false,
          message: 'This email is already subscribed to our newsletter',
        });
      } else {
        // Reactivate subscription
        subscriber.active = true;
        subscriber.unsubscribedAt = null;
        await subscriber.save();
        
        return res.status(200).json({
          success: true,
          message: 'Welcome back! Your subscription has been reactivated.',
        });
      }
    }
    
    // Create new subscriber
    subscriber = await Newsletter.create({ email });
    
    // Send welcome email
    try {
      await sendEmail({
        to: email,
        subject: 'Welcome to Door to India Newsletter',
        text: `Thank you for subscribing to our newsletter! You'll receive updates about exciting travel destinations, tour packages, and special offers.`,
      });
    } catch (emailError) {
      console.error('Error sending welcome email:', emailError);
    }
    
    res.status(201).json({
      success: true,
      data: subscriber,
      message: 'Successfully subscribed to newsletter!',
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Bad Request',
      error: error.message,
    });
  }
};

// @desc    Unsubscribe from newsletter
// @route   POST /api/newsletter/unsubscribe
// @access  Public
exports.unsubscribe = async (req, res) => {
  try {
    const { email } = req.body;
    
    const subscriber = await Newsletter.findOne({ email });
    
    if (!subscriber) {
      return res.status(404).json({
        success: false,
        message: 'Email not found in our subscriber list',
      });
    }
    
    if (!subscriber.active) {
      return res.status(400).json({
        success: false,
        message: 'This email is already unsubscribed',
      });
    }
    
    subscriber.active = false;
    subscriber.unsubscribedAt = new Date();
    await subscriber.save();
    
    res.status(200).json({
      success: true,
      message: 'Successfully unsubscribed from newsletter',
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Bad Request',
      error: error.message,
    });
  }
};

// @desc    Delete newsletter subscriber
// @route   DELETE /api/newsletter/:id
// @access  Private/Admin
exports.deleteSubscriber = async (req, res) => {
  try {
    const subscriber = await Newsletter.findByIdAndDelete(req.params.id);
    
    if (!subscriber) {
      return res.status(404).json({
        success: false,
        message: 'Subscriber not found',
      });
    }
    
    res.status(200).json({
      success: true,
      data: {},
      message: 'Subscriber deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};
