const express = require('express');
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');
const multer = require('multer');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Multer Configuration for Image Upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return cb(new Error('Only JPG, JPEG, PNG, and GIF files are allowed'));
    }
    cb(null, true);
  }
});

const validateUserData = [
  check('type').isIn(['employee', 'admin']).withMessage('Type must be either employee or admin'),
  check('fullName').notEmpty().withMessage('Full name is required'),
  check('email').isEmail().withMessage('Invalid email'),
  check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];

router.post('/create', validateUserData, async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fullName, email, password, type } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      type, // Include the type field in the user object
    });

    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update user details
router.put('/edit', async (req, res) => {
  try {
    const {email, fullName, password } = req.body;

    // Validate full name and password
    if (!fullName || !password) {
      return res.status(400).json({ message: 'Full name and password are required' });
    }

    // Ensure user exists in the database
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user details
    existingUser.fullName = fullName;
    existingUser.password = await bcrypt.hash(password, 10); // Hash the new password
    await existingUser.save();

    res.status(200).json({ message: 'User details updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete user by email
router.delete('/delete', async (req, res) => {
    const { email } = req.body;

    try {
      const deletedUser = await User.deleteOne({ email });
      if (deletedUser.deletedCount === 1) {
        res.status(200).json({ message: 'User deleted successfully' });
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});

// Retrieve all users
router.get('/getAll', async (req, res) => {
  try {
    const users = await User.find({}, '-password'); // Fetch only fullName and email fields
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Upload image
router.post('/uploadImage', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image uploaded' });
    }

    // Save image path in the database
    const { email } = req.body;
    const imagePath = req.file.path;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the imagePath field for the user
    user.imagePath.push(imagePath);
    await user.save();

    res.status(200).json({ message: 'Image uploaded successfully', imagePath });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
      const user = await User.findOne({ email }, 'fullName email password type'); // Include 'type' field in the query
      if (user) {
          const passwordMatch = await bcrypt.compare(password, user.password);
          if (passwordMatch) {
              // Generate JWT token
              const token = jwt.sign({ user: user }, 'your_secret_key', { expiresIn: '1h' });
              // Include user type in the response
              res.json({ success: true, token, type: user.type });
          } else {
              res.status(401).json({ success: false, message: 'Invalid username or password' });
          }
      } else {
          res.status(401).json({ success: false, message: 'Invalid username or password' });
      }
  } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

module.exports = router;
