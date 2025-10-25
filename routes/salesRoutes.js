const express = require('express');
const router = express.Router();
const Sale = require("../models/Sale");
const connectEnsureLogin = require('connect-ensure-login');

// GET route to render the form
router.get("/addSale", (req, res) => {
  res.render("saleagentmatu", {
    success: req.query.success,
    error: req.query.error
  });
});

// POST route to handle form submission
router.post("/addSale", async (req, res) => {
  try {
    console.log("Form data received:", req.body);
    const sale = new Sale({
      produceName: req.body.produceName,
      tonnageSold: req.body.tonnageSold,
      amountPaid: req.body.amountPaid,
      buyerName: req.body.buyerName,
      slaesAgentName: req.body.salesAgentName,
      saleDate: req.body.saleDate,
      saleTime: req.body.saleTime
    });
    
    await sale.save();
    console.log("Sale record added:", sale);
    res.redirect("/salesTable?success=true");
  } catch (error) {
    console.error("Error saving sale:", error);
    const errorMsg = encodeURIComponent("Failed to save the sale. Please try again!");
    res.redirect(`/addSale?error=${errorMsg}`);
  }
});

// GET all sales records
router.get("/salesTable", async (req, res) => {
  try {
    const sales = await Sale.find().sort({ createdAt: -1 });
    res.render("salesTable", {
      sales,
      success: req.query.success,
      error: req.query.error
    });
  } catch (error) {
    console.error("Error fetching sales:", error);
    res.status(400).render("salesTable", { 
      error: "Unable to find sales in the database" 
    });
  }
});

// GET: render update form(rendering the form)
// This route is used to render the update form for a specific sale record
router.get("/updateSale", async (req, res) => {
  try {
    const sale = await Sale.findById(req.query.id);
    if (!sale) {
      return res.status(404).send("Sale not found");
    }
    res.render("updatesale", { sale });
  } catch (error) {
    console.error("Error finding sale:", error);
    res.redirect("/salesTable?error=Unable to find sale");
  }
});

// POST: save updated form
router.post("/updateSale", async (req, res) => {
  try {
    await Sale.findByIdAndUpdate(req.query.id, req.body);
    res.redirect("/salesTable?success=true");
  } catch (error) {
    console.error("Error updating sale:", error);
    res.redirect(`/updateSale?id=${req.query.id}&error=Update failed`);
  }
});

// // DELETE sale record
// router.post("/deleteSale", 
//   connectEnsureLogin.ensureLoggedIn(), 
//   async (req, res) => {
//     try {
//       await Sale.deleteOne({ _id: req.body.id });
//       res.redirect("/salesTable");
//     } catch (error) {
//       console.error("Error deleting sale:", error);
//       res.redirect("/salesTable");
//     }
//   }
// );

// Delete Sale Route
router.get('/deleteSale', async (req, res) => {
  try {
      await Sale.findByIdAndDelete(req.query.id);
      res.redirect('/salesTable');
  } catch (error) {
      console.error(error);
      res.status(500).send('Error deleting sale');
  }
});


// Sales monitoring dashboard
router.get("/salesmonitoringmaga", (req, res) => {
  res.render('salesmonitoringmaga');
});

// API endpoint for dashboard
router.get('/api/sales', async (req, res) => {
  try {
    const sales = await Sale.find().sort({ createdAt: -1 });
    res.json(sales);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch sales' });
  }
});

// Route to render the sales dashboard
router.get('/salesdashboard', async (req, res) => {
  try {
    const sales = await Sale.find().sort({ createdAt: -1 });
    const totalSales = sales.reduce((sum, s) => sum + (s.amountPaid || 0), 0);
    const numSales = sales.length;
    res.render('SalesDash', { totalSales, numSales, sales });
  } catch (error) {
    res.status(500).send('Error loading dashboard');
  }
});

module.exports = router;