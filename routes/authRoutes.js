const express = require('express');
const router = express.Router();
const passport= require('passport');
const requireRole = require('../middleware/roleCheck');


//import models
const Signup =require('../models/Signup');
const Sale = require('../models/Sale');

router .get("/",(req, res)=>{
  res.render("land");
});


router.get("/Signup", (req, res) =>{
    res.render("signup");
  });
    
 router.post("/SignUp", async (req, res) => {
  try {
    let existingUser = await Signup.findOne({ 
      email: req.body.email
     });

    if (existingUser) {
      return res.status(400).send("Not Registered, email already exists");
    }

    // Create user object without password (passport-local-mongoose handles it)
    const user = new Signup({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      role: req.body.role,
      branch: req.body.branch
    });

    // Use promise-based register (no callback with await)
    await Signup.register(user, req.body.password);
    console.log('User registered successfully:', user.email);
    res.redirect("/login");
  } catch (error){
    console.log('Registration error:', error);
    res.status(400).render("signup");
  } 
});

router.get("/login", (req, res) =>{
  res.render("login");
});

// Sales Agent Dashboard is now handled in salesAgentRoutes.js

router.get("/addProduce", (req, res) =>{
  res.render("procurement");
});

router.post("/login", 
   passport.authenticate("local", {failureRedirect: "/login"}),
   (req,res) =>{
   console.log('=== Login Success ===');
   console.log('User:', req.user ? { email: req.user.email, role: req.user.role } : 'no user');
   console.log('Session ID:', req.sessionID);
   
   // Save the session before redirecting
   req.session.save((err) => {
     if (err) {
       console.error('Session save error:', err);
     }
     
     if(req.user.role === "manager"){
         console.log('Redirecting to /manager');
         return res.redirect("/manager");
     }
     else if(req.user.role === "salesagent"){
         console.log('Redirecting to /salesAgentDash');
         return res.redirect("/salesAgentDash");
     }
     else if(req.user.role === "director"){
         console.log('Redirecting to /director');
         return res.redirect("/director");
     }else{
         return res.send("You do not have any role in the system");
     }
   });
});

router.get("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy((error) => {
      if (error) {
        return res.status(500).send(error, "Error logging out");
      }
      res.redirect("/land");
    });
  }
});

// Note: /manager and /director routes are handled in their respective route files
// managerRoutes.js and directorRoutes.js

module.exports = router;