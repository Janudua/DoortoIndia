const Destination = require('../models/Destination');

// @desc    Get all destinations
// @route   GET /api/destinations
// @access  Public
exports.getDestinations = async (req, res) => {
  try {
    const { region, featured, popular, limit } = req.query;
    
    let query = { active: true };
    
    if (region) {
      query.region = region;
    }
    
    if (featured === 'true') {
      query.featured = true;
    }
    
    if (popular === 'true') {
      query.popular = true;
    }
    
    let destinationsQuery = Destination.find(query).sort({ createdAt: -1 });
    
    if (limit) {
      destinationsQuery = destinationsQuery.limit(parseInt(limit));
    }
    
    const destinations = await destinationsQuery;
    
    res.status(200).json({
      success: true,
      count: destinations.length,
      data: destinations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

// @desc    Get single destination
// @route   GET /api/destinations/:id
// @access  Public
exports.getDestination = async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);
    
    if (!destination) {
      return res.status(404).json({
        success: false,
        message: 'Destination not found',
      });
    }
    
    res.status(200).json({
      success: true,
      data: destination,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

// @desc    Get destination by slug
// @route   GET /api/destinations/slug/:slug
// @access  Public
exports.getDestinationBySlug = async (req, res) => {
  try {
    const destination = await Destination.findOne({ slug: req.params.slug, active: true });
    
    if (!destination) {
      return res.status(404).json({
        success: false,
        message: 'Destination not found',
      });
    }
    
    res.status(200).json({
      success: true,
      data: destination,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

// @desc    Create new destination
// @route   POST /api/destinations
// @access  Private/Admin
exports.createDestination = async (req, res) => {
  try {
    const destination = await Destination.create(req.body);
    
    res.status(201).json({
      success: true,
      data: destination,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Bad Request',
      error: error.message,
    });
  }
};

// @desc    Update destination
// @route   PUT /api/destinations/:id
// @access  Private/Admin
exports.updateDestination = async (req, res) => {
  try {
    const destination = await Destination.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    
    if (!destination) {
      return res.status(404).json({
        success: false,
        message: 'Destination not found',
      });
    }
    
    res.status(200).json({
      success: true,
      data: destination,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Bad Request',
      error: error.message,
    });
  }
};

// @desc    Delete destination
// @route   DELETE /api/destinations/:id
// @access  Private/Admin
exports.deleteDestination = async (req, res) => {
  try {
    const destination = await Destination.findByIdAndDelete(req.params.id);
    
    if (!destination) {
      return res.status(404).json({
        success: false,
        message: 'Destination not found',
      });
    }
    
    res.status(200).json({
      success: true,
      data: {},
      message: 'Destination deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};
