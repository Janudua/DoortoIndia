const Tour = require('../models/Tour');

// @desc    Get all tours
// @route   GET /api/tours
// @access  Public
exports.getTours = async (req, res) => {
  try {
    const { category, featured, sort, limit } = req.query;
    
    let query = { active: true };
    
    if (category) {
      query.category = category;
    }
    
    if (featured === 'true') {
      query.featured = true;
    }
    
    let toursQuery = Tour.find(query);
    
    // Sorting
    if (sort === 'price-asc') {
      toursQuery = toursQuery.sort({ price: 1 });
    } else if (sort === 'price-desc') {
      toursQuery = toursQuery.sort({ price: -1 });
    } else if (sort === 'rating') {
      toursQuery = toursQuery.sort({ rating: -1 });
    } else {
      toursQuery = toursQuery.sort({ createdAt: -1 });
    }
    
    // Limit
    if (limit) {
      toursQuery = toursQuery.limit(parseInt(limit));
    }
    
    const tours = await toursQuery;
    
    res.status(200).json({
      success: true,
      count: tours.length,
      data: tours,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

// @desc    Get single tour
// @route   GET /api/tours/:id
// @access  Public
exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    
    if (!tour) {
      return res.status(404).json({
        success: false,
        message: 'Tour not found',
      });
    }
    
    res.status(200).json({
      success: true,
      data: tour,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

// @desc    Get tour by slug
// @route   GET /api/tours/slug/:slug
// @access  Public
exports.getTourBySlug = async (req, res) => {
  try {
    const tour = await Tour.findOne({ slug: req.params.slug, active: true });
    
    if (!tour) {
      return res.status(404).json({
        success: false,
        message: 'Tour not found',
      });
    }
    
    res.status(200).json({
      success: true,
      data: tour,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

// @desc    Create new tour
// @route   POST /api/tours
// @access  Private/Admin
exports.createTour = async (req, res) => {
  try {
    const tour = await Tour.create(req.body);
    
    res.status(201).json({
      success: true,
      data: tour,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Bad Request',
      error: error.message,
    });
  }
};

// @desc    Update tour
// @route   PUT /api/tours/:id
// @access  Private/Admin
exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    
    if (!tour) {
      return res.status(404).json({
        success: false,
        message: 'Tour not found',
      });
    }
    
    res.status(200).json({
      success: true,
      data: tour,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Bad Request',
      error: error.message,
    });
  }
};

// @desc    Delete tour
// @route   DELETE /api/tours/:id
// @access  Private/Admin
exports.deleteTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndDelete(req.params.id);
    
    if (!tour) {
      return res.status(404).json({
        success: false,
        message: 'Tour not found',
      });
    }
    
    res.status(200).json({
      success: true,
      data: {},
      message: 'Tour deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};
