const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const upload = require('../config/multer');
const fs = require('fs');
const path = require('path');

// Middleware to check if user is authenticated
const isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};

// @route   GET /blogs
// @desc    Display all blogs
router.get('/', isAuth, async (req, res) => {
  try {
    const blogs = await Blog.find({}).populate('author', 'fullName email').sort({ createdAt: -1 });
    res.render('blogs', {
      user: req.user,
      blogs: blogs
    });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).render('error', {
      message: 'Error fetching blogs'
    });
  }
});

// @route   GET /blogs/new
// @desc    Display create blog form
router.get('/new', isAuth, (req, res) => {
  res.render('create-blog', {
    user: req.user
  });
});

// @route   POST /blogs
// @desc    Create a new blog
router.post('/', isAuth, upload.single('blogImage'), async (req, res) => {
  try {
    const { blogContent } = req.body;

    if (!blogContent || blogContent.trim() === '') {
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return res.render('create-blog', {
        user: req.user,
        message: 'Blog content is required'
      });
    }

    let blogImage = null;
    if (req.file) {
      blogImage = `/uploads/${req.file.filename}`;
    }

    const newBlog = new Blog({
      blogContent: blogContent,
      author: req.user._id,
      authorName: req.user.fullName,
      blogImage: blogImage
    });

    await newBlog.save();
    console.log('New blog created:', newBlog);
    return res.redirect('/blogs');
  } catch (error) {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    console.error('Error creating blog:', error);
    res.render('create-blog', {
      user: req.user,
      message: 'Error creating blog'
    });
  }
});

// @route   GET /blogs/:id/edit
// @desc    Display edit blog form
router.get('/:id/edit', isAuth, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('author');

    if (!blog) {
      return res.status(404).render('error', {
        message: 'Blog not found'
      });
    }

    // Check if the current user is the author
    if (blog.author._id.toString() !== req.user._id.toString()) {
      return res.status(403).render('error', {
        message: 'You are not authorized to edit this blog'
      });
    }

    res.render('edit-blog', {
      user: req.user,
      blog: blog
    });
  } catch (error) {
    console.error('Error fetching blog:', error);
    res.status(500).render('error', {
      message: 'Error fetching blog'
    });
  }
});

// @route   POST /blogs/:id
// @desc    Update a blog
router.post('/:id', isAuth, upload.single('blogImage'), async (req, res) => {
  try {
    let blog = await Blog.findById(req.params.id);

    if (!blog) {
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(404).render('error', {
        message: 'Blog not found'
      });
    }

    // Check if the current user is the author
    if (blog.author.toString() !== req.user._id.toString()) {
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(403).render('error', {
        message: 'You are not authorized to update this blog'
      });
    }

    const { blogContent } = req.body;

    if (!blogContent || blogContent.trim() === '') {
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return res.render('edit-blog', {
        user: req.user,
        blog: blog,
        message: 'Blog content is required'
      });
    }

    blog.blogContent = blogContent;
    blog.updatedAt = Date.now();

    // Handle image update
    if (req.file) {
      // Delete old image if exists
      if (blog.blogImage) {
        const oldImagePath = path.join(__dirname, '../public', blog.blogImage);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      blog.blogImage = `/uploads/${req.file.filename}`;
    }

    await blog.save();
    console.log('Blog updated:', blog);
    return res.redirect('/blogs');
  } catch (error) {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    console.error('Error updating blog:', error);
    res.status(500).render('error', {
      message: 'Error updating blog'
    });
  }
});

// @route   GET /blogs/:id/delete
// @desc    Delete a blog
router.get('/:id/delete', isAuth, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).render('error', {
        message: 'Blog not found'
      });
    }

    // Check if the current user is the author
    if (blog.author.toString() !== req.user._id.toString()) {
      return res.status(403).render('error', {
        message: 'You are not authorized to delete this blog'
      });
    }

    // Delete image if exists
    if (blog.blogImage) {
      const imagePath = path.join(__dirname, '../public', blog.blogImage);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await Blog.findByIdAndDelete(req.params.id);
    console.log('Blog deleted:', req.params.id);
    return res.redirect('/blogs');
  } catch (error) {
    console.error('Error deleting blog:', error);
    res.status(500).render('error', {
      message: 'Error deleting blog'
    });
  }
});

module.exports = router;
