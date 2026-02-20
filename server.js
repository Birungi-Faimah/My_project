/*  */require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const expressSession = require('express-session');

// Session configuration with proper cookie settings
const sessionConfig = {
  secret: process.env.SESSION_SECRET || 'karibu-groceries-secret-key-2025',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production', // true in production (HTTPS)
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax' // Allow cross-site in production
  }
};

// Import Models
const Signup = require('./models/Signup');

// Import Routes
const authRoutes = require('./routes/authRoutes');
const tempRoutes = require('./routes/tempRoutes');
// const recordsaleRoutes = require('./routes/recordsaleRoutes');
const creditRoutes = require('./routes/creditRoutes');
const managerRoutes = require('./routes/managerRoutes');
const directorRoutes = require('./routes/directorRoutes');
const landRoutes = require('./routes/landRoutes');
const recordprocurementRoutes = require('./routes/recordprocurementRoutes');
const salesRoutes = require('./routes/salesRoutes');
const salesAgentRoutes = require('./routes/salesAgentRoutes');

// Express Application Setup
const app = express();
const PORT = process.env.PORT || 3600;

// Trust proxy for Render deployment (must be set before other middleware)
if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
}

// Configuration
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Database Connection with better error handling
const dbUrl = process.env.DATABASE || process.env.MONGODB_URI;
if (!dbUrl) {
  console.error('ERROR: No database connection string found in environment variables');
}

mongoose.connect(dbUrl)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit if cannot connect to database
  });

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use('/public/img/uploads', express.static(path.join(__dirname, 'public/img/uploads')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(expressSession(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());

// Passport Configuration
passport.use(Signup.createStrategy());
passport.serializeUser(Signup.serializeUser());
passport.deserializeUser(Signup.deserializeUser());

// Routes
app.use('/', authRoutes);
// app.use('/', tempRoutes);
// app.use('/', recordsaleRoutes);
app.use('/', creditRoutes);
app.use('/', managerRoutes);
app.use('/', directorRoutes);
app.use('/', landRoutes);
app.use('/', salesRoutes);
app.use('/', recordprocurementRoutes);
app.use('/', salesAgentRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  res.status(500).send('Internal Server Error - Please try again later');
});

// Server Startup
app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));