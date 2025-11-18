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
    const user = new Signup(req.body);
    let existingUser = await Signup.findOne({ 
      email: req.body.email
     });

    if (existingUser) {
      return res.status(400).send("Not Registered, email already exists");
    } else {
      await Signup.register(user, req.body.password, (error) => {
        if(error) {
          throw error;
        }
        res.redirect("/login");
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

router.get("/salesAgentDash", requireRole('salesagent'), (req, res) =>{
  res.render("SalesDash");
});

router.get("/addProduce", (req, res) =>{
  res.render("procurement");
});

router.post("/login", 
   passport.authenticate("local", {failureRedirect: "/login"}),
   (req,res) =>{
   console.log(req.body);
   req.session.user =req.user;
   if(req.user.role ==="manager"){
       res.redirect("/manager");
   }
   else if(req.user.role ==="salesagent"){
       res.redirect("/salesAgentDash")
   }
   else if(req.user.role ==="director"){
       res.redirect("/director");
   }else{
       res.send("You do not have any role in the system")
   } 

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

router.get("/manager", requireRole('manager'), (req, res) =>{
  res.render("manager");
});

router.get("/director", requireRole('director'), (req, res) =>{
  res.render("director");
});

//    router.get('/salesagent', (req, res) => {
//     res.render('saleagentmaga');  // Make sure 'saleagentmaga.pug' exists in the 'views' folder
//   });
  
//   router.get('/manager', (req, res) => {
//     res.render('manager');  // Make sure 'managerdashboard.pug' exists in the 'views' folder
//   });

// router.get('/saleagentmatu', async (req, res) => {
//   try {
//     const sales = await Sale.find({ sales_agent: 'Matuga' }).sort({ createdAt: -1 });
//     res.render('saleagentmatu', { sales });
//   } catch (error) {
//     res.status(500).send('Error fetching sales for Matuga');
//   }
// });

});

module.exports = router;