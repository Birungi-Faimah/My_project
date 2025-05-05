const express = require('express');
const passport = require('passport');
const router = express.Router();

router.post('/login', passport.authenticate('local'), (req, res) => {
  if (req.user.role === 'manager') {
    return res.redirect('/dashboard/manager');
  }

  // here i  can add any role needed
  return res.redirect('/dashboard'); // default
});
