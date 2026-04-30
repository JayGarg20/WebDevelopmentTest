# 📝 Blog Application

A full-stack web application with user authentication, blog management, and image uploads using Express.js, MongoDB, and Passport.js.

## ✨ Features

- **User Authentication**: Registration and login with Passport.js local strategy
- **Blog Management**: Create, Read, Update, and Delete (CRUD) operations for blogs
- **Image Upload**: Upload cover images for blog posts with preview functionality
- **User Sessions**: Secure session management with express-session
- **Password Hashing**: Secure password storage with bcryptjs
- **Authorization**: Only blog authors can edit/delete their own blogs
- **Responsive Design**: Mobile-friendly UI with modern styling
- **Image Display**: Blog cover images with fallback placeholders
- **Modern UI**: Beautiful gradient backgrounds, smooth animations, and intuitive interface

## 🎨 Design Features

- Modern gradient background with purple theme
- Smooth animations and transitions
- Card-based layout for blogs
- Interactive hover effects
- Emoji icons for better visual appeal
- Professional typography with custom fonts (Playfair Display, Inter)
- Responsive grid layout for blogs
- Glass morphism navbar with backdrop blur

## 📁 Project Structure

```
├── public/
│   ├── css/
│   │   └── style.css          # Modern styling with animations
│   └── uploads/
│       └── [blog images]      # Uploaded images directory
├── views/
│   ├── register.ejs           # User registration form
│   ├── login.ejs              # User login form
│   ├── blogs.ejs              # Blog list with image cards
│   ├── create-blog.ejs        # Create blog with image upload
│   ├── edit-blog.ejs          # Edit blog with image replacement
│   ├── error.ejs              # Error page
│   └── layout.ejs             # Base layout template
├── models/
│   ├── User.js                # User schema with authentication
│   └── Blog.js                # Blog schema with image support
├── routes/
│   ├── auth.js                # Authentication routes
│   └── blogs.js               # Blog routes with file upload
├── config/
│   ├── passport.js            # Passport authentication configuration
│   └── multer.js              # Image upload configuration
├── app.js                     # Main application entry point
├── package.json               # Project dependencies
├── .env                       # Environment variables
└── README.md                  # Project documentation
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Step 1: Clone the Repository
```bash
git clone <repository-url>
cd WebDevelopmentTest
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Configure Environment Variables
The `.env` file is already created. Update it as needed:
```env
MONGODB_URI=mongodb://localhost:27017/blog-app
SESSION_SECRET=your_session_secret_key_here_change_in_production
PORT=3000
NODE_ENV=development
```

### Step 4: Ensure MongoDB is Running
```bash
# On Windows with MongoDB installed locally
mongod

# Or use MongoDB Atlas (cloud) - update MONGODB_URI in .env
```

### Step 5: Start the Application
```bash
# Production mode
npm start

# Development mode with auto-reload
npm run dev
```

The application will be accessible at `http://localhost:3000`

## 🛣️ Routes Overview

### Authentication Routes
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/register` | Display registration form |
| POST | `/register` | Register a new user |
| GET | `/login` | Display login form |
| POST | `/login` | Login user with authentication |
| GET | `/logout` | Logout user and clear session |

### Blog Routes (Protected - Authentication Required)
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/blogs` | Display all blogs |
| GET | `/blogs/new` | Display create blog form |
| POST | `/blogs` | Create a new blog with optional image |
| GET | `/blogs/:id/edit` | Display edit blog form |
| POST | `/blogs/:id` | Update blog content and/or image |
| GET | `/blogs/:id/delete` | Delete a blog and its image |

## 📊 Database Schemas

### User Schema
```javascript
{
  email: String (required, unique, lowercase, trimmed),
  password: String (required, hashed with bcryptjs),
  fullName: String (required, trimmed),
  address: {
    location: String (optional)
  },
  createdAt: Date,
  updatedAt: Date
}
```

### Blog Schema
```javascript
{
  blogContent: String (required, trimmed),
  author: ObjectId (reference to User, required),
  authorName: String (required, trimmed, read-only in edit),
  blogImage: String (optional, path to uploaded image),
  createdAt: Date,
  updatedAt: Date
}
```

## 🖼️ Image Upload Features

### Supported Formats
- JPEG (.jpg, .jpeg)
- PNG (.png)
- GIF (.gif)
- WebP (.webp)

### Upload Limits
- Maximum file size: 5MB
- Images are validated before upload
- Unique filenames generated with timestamp

### Image Management
- Upload images when creating a blog
- Replace images when editing a blog
- Automatic cleanup of old images when replaced
- Delete images when blog is deleted
- Fallback placeholder emoji when no image exists

## 🔐 Security Features

- **Password Hashing**: bcryptjs with 10-round salting
- **Session Management**: Express-session with httpOnly cookies
- **Authentication**: Passport.js local strategy
- **Authorization**: User-specific blog access control
- **Input Validation**: All forms are validated
- **CORS**: Configured for security
- **File Upload Security**: MIME type validation, file size limits

## 🎯 How to Use

### 1. Register a New Account
- Go to `/register`
- Enter email, full name (required), address (optional), and password
- Confirm password and submit
- Receive confirmation message

### 2. Login to Your Account
- Go to `/login`
- Enter your email and password
- Successfully logged-in users see their name in the top-right navbar

### 3. Create a Blog Post
- Click "✨ Create New Blog" button
- Add a blog title in the content (first 60 characters shown as title)
- (Optional) Upload a cover image with preview
- Write your blog content
- Click "📤 Publish Blog"

### 4. Manage Your Blogs
- View all blogs on the `/blogs` page
- Cards display cover images, author, creation date
- **Edit**: Update blog content and/or replace the image
- **Delete**: Remove blog permanently (with confirmation)
- Only authors can edit/delete their own blogs

### 5. Logout
- Click "Logout" button in top-right navbar
- Session is cleared and you're redirected to login

## 🛠️ Technology Stack

| Technology | Purpose |
|------------|---------|
| Express.js | Web server framework |
| MongoDB | NoSQL database |
| Mongoose | Database ODM |
| Passport.js | Authentication middleware |
| bcryptjs | Password hashing |
| express-session | Session management |
| Multer | File upload handling |
| EJS | Template engine |
| CSS3 | Styling with animations |

## 📱 Responsive Design

The application is fully responsive and works on:
- **Desktop**: Full featured experience with grid layout
- **Tablet**: Adjusted spacing and single column for blogs
- **Mobile**: Optimized for small screens with touch-friendly buttons

## 🚀 Performance Optimizations

- Lazy loading for blog images
- Efficient database queries with population
- Session cookie optimization
- CSS animations using transforms and opacity
- Proper error handling and validation

## 🔄 Development Workflow

```bash
# Install dependencies
npm install

# Start development server with nodemon (auto-reload)
npm run dev

# Or run production server
npm start
```

## 📝 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/blog-app` |
| `SESSION_SECRET` | Secret key for sessions | Provided in .env |
| `PORT` | Server port | `3000` |
| `NODE_ENV` | Environment mode | `development` |

## ⚠️ Important Notes

1. **Change Session Secret**: Update `SESSION_SECRET` in `.env` for production
2. **Use HTTPS**: In production, enable HTTPS
3. **Database Backups**: Regularly backup your MongoDB
4. **File Uploads**: Images are stored in `public/uploads/`
5. **Cleanup**: Old images are automatically deleted when replaced

## 🐛 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running: `mongod`
- Check `MONGODB_URI` in `.env`
- Verify network connectivity if using MongoDB Atlas

### Image Upload Fails
- Check file size (max 5MB)
- Verify file format is supported
- Ensure `public/uploads/` directory exists and is writable

### Session Issues
- Clear cookies in browser
- Restart the application
- Verify `SESSION_SECRET` is set in `.env`

## 🎓 Learning Resources

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Basics](https://docs.mongodb.com/)
- [Passport.js Strategies](http://www.passportjs.org/)
- [Multer File Upload](https://github.com/expressjs/multer)
- [EJS Template Engine](https://ejs.co/)

## 🚀 Future Enhancements

- [ ] Add comments on blogs
- [ ] Implement user profile pages
- [ ] Add blog search and filtering
- [ ] Implement pagination for blog listings
- [ ] Add blog categories and tags
- [ ] Email verification for registration
- [ ] Password reset functionality
- [ ] Like/favorite functionality
- [ ] Follow users feature
- [ ] Share blogs on social media
- [ ] Rich text editor for blog content
- [ ] Image compression and optimization

## 📄 License

This project is open source and available for educational purposes.

## 👨‍💻 Contributing

Feel free to fork, modify, and improve this project!

## 💬 Support

For issues or questions, please create an issue in the repository.
