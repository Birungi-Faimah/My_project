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
    
    // Calculate unit price
    const amountPaid = parseFloat(req.body.amountPaid) || 0;
    const tonnageSold = parseFloat(req.body.tonnageSold) || 0;
    const unitPrice = tonnageSold > 0 ? Math.round(amountPaid / tonnageSold) : 0;
    
    const sale = new Sale({
      produceName: req.body.produceName,
      produceType: req.body.produceType,
      tonnageSold: tonnageSold,
      amountPaid: amountPaid,
      unitPrice: unitPrice,
      buyerName: req.body.buyerName,
      salesAgentName: req.body.salesAgentName,
      branch: req.body.branch,
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
    
    // Calculate statistics
    const totalSales = sales.length;
    const totalRevenue = sales.reduce((sum, s) => sum + (s.amountPaid || 0), 0);
    const totalTonnage = sales.reduce((sum, s) => sum + (s.tonnageSold || 0), 0);
    
    res.render("salesTable", {
      sales,
      totalSales,
      totalRevenue,
      totalTonnage,
      success: req.query.success,
      error: req.query.error
    });
  } catch (error) {
    console.error("Error fetching sales:", error);
    res.status(400).render("salesTable", { 
      error: "Unable to find sales in the database",
      sales: [],
      totalSales: 0,
      totalRevenue: 0,
      totalTonnage: 0
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
    res.render("updatesale", { 
      sale,
      success: req.query.success,
      error: req.query.error 
    });
  } catch (error) {
    console.error("Error finding sale:", error);
    res.redirect("/salesTable?error=Unable to find sale");
  }
});

// POST: save updated form
router.post("/updateSale", async (req, res) => {
  try {
    console.log("Update sale form data:", req.body);
    
    // Calculate unit price
    const amountPaid = parseFloat(req.body.amountPaid) || 0;
    const tonnageSold = parseFloat(req.body.tonnageSold) || 0;
    const unitPrice = tonnageSold > 0 ? Math.round(amountPaid / tonnageSold) : 0;
    
    const updateData = {
      produceName: req.body.produceName,
      produceType: req.body.produceType,
      tonnageSold: tonnageSold,
      amountPaid: amountPaid,
      unitPrice: unitPrice,
      buyerName: req.body.buyerName,
      salesAgentName: req.body.salesAgentName,
      branch: req.body.branch,
      saleDate: req.body.saleDate,
      saleTime: req.body.saleTime
    };
    
    await Sale.findByIdAndUpdate(req.query.id, updateData);
    console.log("Sale updated:", updateData);
    res.redirect("/salesTable?success=true");
  } catch (error) {
    console.error("Error updating sale:", error);
    res.redirect(`/updateSale?id=${req.query.id}&error=` + encodeURIComponent(error.message));
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

// CSV Export route for sales
router.get('/exportSales', async (req, res) => {
  try {
    const sales = await Sale.find().sort({ createdAt: -1 });
    
    // Create CSV header
    const csvHeader = 'No,Buyer Name,Produce Name,Produce Type,Tonnage (kg),Amount (UGX),Unit Price (UGX/kg),Sales Agent,Branch,Date,Time\n';
    
    // Create CSV rows
    const csvRows = sales.map((sale, index) => {
      const date = sale.saleDate ? new Date(sale.saleDate).toLocaleDateString() : 'N/A';
      return `${index + 1},"${sale.buyerName}","${sale.produceName}","${sale.produceType || 'N/A'}",${sale.tonnageSold},${sale.amountPaid},${sale.unitPrice || 0},"${sale.salesAgentName}","${sale.branch || 'N/A'}","${date}","${sale.saleTime || 'N/A'}"`;
    }).join('\n');
    
    const csv = csvHeader + csvRows;
    
    // Set headers for CSV download
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="sales_records.csv"');
    res.send(csv);
  } catch (error) {
    console.error('Error exporting sales:', error);
    res.status(500).send('Error exporting sales');
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