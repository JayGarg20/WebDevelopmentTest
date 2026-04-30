# Blog Application

A full-stack web application with user authentication and blog management features using Express.js, MongoDB, and Passport.js.

## Features

- **User Authentication**: Registration and login with Passport.js
- **Blog Management**: Create, Read, Update, and Delete (CRUD) operations
- **User Sessions**: Secure session management with express-session
- **Password Hashing**: Secure password storage with bcryptjs
- **Authorization**: Only blog authors can edit/delete their own blogs
- **Responsive Design**: Mobile-friendly UI

## Project Structure

```
├── public/
│   └── css/
│       └── style.css          # Application styles
├── views/
│   ├── layout.ejs             # Base layout template
│   ├── register.ejs           # User registration form
│   ├── login.ejs              # User login form
│   ├── blogs.ejs              # Blog list page
│   ├── create-blog.ejs        # Create blog formnp
│   ├── edit-blog.ejs          # Edit blog form
│   └── error.ejs              # Error page
├── models/
│   ├── User.js                # User schema
│   └── Blog.js                # Blog schema
├── routes/
│   ├── auth.js                # Authentication routes
│   └── blogs.js               # Blog routes
├── config/
│   └── passport.js            # Passport configuration
├── app.js                     # Main application file
├── package.json               # Project dependencies
├── .env                       # Environment variables
└── README.md                  # Project documentation
```

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd WebDevelopmentTest
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Create a `.env` file in the root directory (already included)
   - Update the `MONGODB_URI` if needed

4. **Start MongoDB**
   - Make sure MongoDB is running on your machine or update the connection string

5. **Run the application**
   ```bash
   npm start
   # or for development with auto-reload
   npm run dev
   ```

   The application will be accessible at `http://localhost:3000`

## Routes

### Authentication Routes
- `GET /register` - Display registration form
- `POST /register` - Register a new user
- `GET /login` - Display login form
- `POST /login` - Login user
- `GET /logout` - Logout user

### Blog Routes (Protected - Requires Authentication)
- `GET /blogs` - Display all blogs
- `GET /blogs/new` - Display create blog form
- `POST /blogs` - Create a new blog
- `GET /blogs/:id/edit` - Display edit blog form
- `POST /blogs/:id` - Update a blog
- `GET /blogs/:id/delete` - Delete a blog

## Database Schemas

### User Schema
```javascript
{
  email: String (required, unique, trim),
  password: String (required, hashed),
  fullName: String (required, trim),
  address: {
    location: String
  },
  timestamps: true
}
```

### Blog Schema
```javascript
{
  blogContent: String (required, trim),
  author: ObjectId (reference to User, required),
  authorName: String (required, trim),
  createdAt: Date,
  updatedAt: Date
}
```

## Key Features

1. **Authentication**: Users can register with email, password, and full name
2. **Password Security**: Passwords are hashed using bcryptjs before storage
3. **Session Management**: Secure sessions stored with express-session
4. **Blog CRUD**: Create, read, update, and delete blog posts
5. **Authorization**: Only the blog author can edit or delete their blog
6. **Responsive Design**: Works on desktop, tablet, and mobile devices

## Technologies Used

- **Backend**: Express.js
- **Database**: MongoDB
- **Authentication**: Passport.js (Local Strategy)
- **Password Hashing**: bcryptjs
- **Session Management**: express-session
- **Templating**: EJS
- **Styling**: CSS3

## Development

To run the application in development mode with auto-reload:

```bash
npm run dev
```

This uses nodemon to automatically restart the server when file changes are detected.

## Security Notes

- Session secret should be changed in production
- Use HTTPS in production
- Implement CORS if needed
- Add rate limiting for authentication endpoints
- Validate and sanitize all user inputs

## Future Enhancements

- Add comments on blogs
- Implement user profile pages
- Add search and filtering functionality
- Implement pagination for blog listings
- Add blog categories and tags
- Email verification for registration
- Password reset functionality
