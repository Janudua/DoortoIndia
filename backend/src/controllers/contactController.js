const Contact = require('../models/Contact');
const { sendEmail } = require('../utils/sendEmail');

// @desc    Get all contact messages
// @route   GET /api/contacts
// @access  Private/Admin
exports.getContacts = async (req, res) => {
  try {
    const { status } = req.query;
    
    let query = {};
    
    if (status) {
      query.status = status;
    }
    
    const contacts = await Contact.find(query).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

// @desc    Get single contact message
// @route   GET /api/contacts/:id
// @access  Private/Admin
exports.getContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact message not found',
      });
    }
    
    res.status(200).json({
      success: true,
      data: contact,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

// @desc    Create new contact message
// @route   POST /api/contacts
// @access  Public
exports.createContact = async (req, res) => {
  try {
    const contact = await Contact.create(req.body);
    
    // Send notification email to admin
    try {
      await sendEmail({
        to: process.env.ADMIN_EMAIL,
        subject: `New Contact Form Submission: ${req.body.subject}`,
        text: `
          Name: ${req.body.name}
          Email: ${req.body.email}
          Phone: ${req.body.phone || 'N/A'}
          Subject: ${req.body.subject}
          Message: ${req.body.message}
        `,
      });
    } catch (emailError) {
      console.error('Error sending email:', emailError);
    }
    
    res.status(201).json({
      success: true,
      data: contact,
      message: 'Your message has been sent successfully. We will get back to you soon!',
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Bad Request',
      error: error.message,
    });
  }
};

// @desc    Update contact message status
// @route   PUT /api/contacts/:id
// @access  Private/Admin
exports.updateContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact message not found',
      });
    }
    
    res.status(200).json({
      success: true,
      data: contact,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Bad Request',
      error: error.message,
    });
  }
};

// @desc    Delete contact message
// @route   DELETE /api/contacts/:id
// @access  Private/Admin
exports.deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact message not found',
      });
    }
    
    res.status(200).json({
      success: true,
      data: {},
      message: 'Contact message deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};
