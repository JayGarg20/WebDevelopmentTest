const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/User');

// Middleware to check if user is authenticated
const isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};

// @route   GET /register
// @desc    Display register page
router.get('/register', (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect('/blogs');
  }
  res.render('register');
});

// @route   POST /register
// @desc    Register a new user
router.post('/register', async (req, res) => {
  try {
    const { email, fullName, password, passwordConfirm, address } = req.body;

    if (!email || !fullName || !password || !passwordConfirm) {
      return res.render('register', {
        message: 'Please provide all required fields'
      });
    }

    if (password !== passwordConfirm) {
      return res.render('register', {
        message: 'Passwords do not match'
      });
    }

    const user = await User.findOne({ email: email });
    if (user) {
      return res.render('register', {
        message: 'Email already in use'
      });
    }

    const newUser = new User({
      email: email,
      fullName: fullName,
      password: password,
      address: {
        location: address || ''
      }
    });

    await newUser.save();
    console.log('New user registered:', newUser);
    return res.render('register', {
      message: 'User registered successfully! You can now login.'
    });
  } catch (error) {
    console.error('Register error:', error);
    res.render('register', {
      message: 'Error registering user'
    });
  }
});

// @route   GET /login
// @desc    Display login page
router.get('/login', (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect('/blogs');
  }
  res.render('login');
});

// @route   POST /login
// @desc    Login user
router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/blogs',
    failureRedirect: '/login',
    failureMessage: true
  })
);

// @route   GET /logout
// @desc    Logout user
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: 'Error logging out' });
    }
    res.redirect('/login');
  });
});

module.exports = router;
