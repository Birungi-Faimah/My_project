const express =require('express');
const router =express.Router();
const passport= require('passport');


//import models
const Signup =require('../models/Signup');

router.get("/Signup", (req, res) =>{
    res.render("Signup");
 });
    
 router.post("/SignUp", async (req, res) => {
  try {
    const user = new Signup(req.body);
    let existingUser = await Signup.findOne({ 
      email: req.body.email
     });

    if (existingUser) {
      return res.status(400).send("Not Registered, email already exists");
    } else {
      Signup.register(user, req.body.password, (error) => {
        if (error) {
          throw error;
        }
        res.redirect("/Login");
      });
    }
    console.log(user);
  } catch (error){
    res.status(400).render("signup");
    console.log(error);
  } 
});

router.get("/login", (req, res) =>{
  res.render("login");
});

router.post("/login", 
   passport.authenticate("local", {failureRedirect: "/login"}),
   (req,res) =>{
   console.log(req.body);
   req.session.user =req.user;
   if(req.user.role ==="Manager"){
       res.redirect("/managerDash");
   }
   else if(req.user.role ==="salesAgent"){
       res.redirect("/salesAgentDash")
   }
   else if(req.user.role ==="director"){
       res.redirect("/directorsDash");
   }else{
       res.send("You do not have any role in the system")
   }
});

module.exports =router;