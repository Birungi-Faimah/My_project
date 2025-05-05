require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const expressSession = require('express-session')({
  secret: process.env.SESSION_SECRET || 'secret',
  resave: false,
  saveUninitialized: false,
});

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

// Express Application Setup
const app = express();
const PORT = process.env.PORT || 3600;

// Configuration
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Database Connection
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use('/public/img/uploads', express.static(path.join(__dirname, 'public/img/uploads')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(expressSession);
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

// Server Startup
app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));