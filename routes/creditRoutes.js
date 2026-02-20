const express = require('express');
const router = express.Router();
const Credit = require('../models/Credit');

// Render the form
router.get('/addCredit', (req, res) => {
  res.render('credit', { credit: null, success: req.query.success, error: req.query.error });
});

// Handle form submission
router.post('/addCredit', async (req, res) => {
  try {
    console.log('Received credit form data:', req.body);
    
    const credit = new Credit({
      buyerName: req.body.buyerName,
      nin: req.body.nin,
      location: req.body.location,
      contact: req.body.contact,
      produceName: req.body.produceName,
      produceType: req.body.produceType,
      tonnage: parseFloat(req.body.tonnage) || 0,
      unitPrice: parseFloat(req.body.unitPrice) || 0,
      amountDue: parseFloat(req.body.amountDue) || 0,
      dueDate: req.body.dueDate,
      salesAgentName: req.body.salesAgentName,
      branch: req.body.branch,
      dateOfDispatch: req.body.dateOfDispatch,
      status: req.body.status || 'pending'
    });
    
    await credit.save();
    console.log('Credit saved:', credit);
    res.redirect('/creditTable?success=true');
  } catch (error) {
    console.error('Error saving credit:', error);
    res.redirect('/addCredit?error=' + encodeURIComponent(error.message));
  }
});

// Render the table
router.get('/creditTable', async (req, res) => {
  try {
    const credits = await Credit.find().sort({ createdAt: -1 });
    
    // Calculate statistics
    const totalCredits = credits.length;
    const totalAmount = credits.reduce((sum, c) => sum + (c.amountDue || 0), 0);
    const pendingCredits = credits.filter(c => c.status === 'pending').length;
    const paidCredits = credits.filter(c => c.status === 'paid').length;
    
    res.render('creditT', { 
      credits, 
      totalCredits,
      totalAmount,
      pendingCredits,
      paidCredits,
      success: req.query.success === 'true' 
    });
  } catch (error) {
    console.error('Error fetching credits:', error);
    res.status(500).send('Error fetching credits');
  }
});

// Render edit form
router.get('/editCredit/:id', async (req, res) => {
  try {
    const credit = await Credit.findById(req.params.id);
    if (!credit) {
      return res.status(404).send('Credit entry not found');
    }
    res.render('credit', { credit, success: req.query.success, error: req.query.error });
  } catch (error) {
    console.error('Error fetching credit:', error);
    res.status(404).send('Credit entry not found');
  }
});

// Update credit entry
router.post('/editCredit/:id', async (req, res) => {
  try {
    console.log('Edit credit form data:', req.body);
    
    const updateData = {
      buyerName: req.body.buyerName,
      nin: req.body.nin,
      location: req.body.location,
      contact: req.body.contact,
      produceName: req.body.produceName,
      produceType: req.body.produceType,
      tonnage: parseFloat(req.body.tonnage) || 0,
      unitPrice: parseFloat(req.body.unitPrice) || 0,
      amountDue: parseFloat(req.body.amountDue) || 0,
      dueDate: req.body.dueDate,
      salesAgentName: req.body.salesAgentName,
      branch: req.body.branch,
      dateOfDispatch: req.body.dateOfDispatch,
      status: req.body.status || 'pending'
    };
    
    await Credit.findByIdAndUpdate(req.params.id, updateData, { runValidators: true });
    console.log('Credit updated:', updateData);
    res.redirect('/creditTable?success=true');
  } catch (error) {
    console.error('Error updating credit:', error);
    res.redirect(`/editCredit/${req.params.id}?error=` + encodeURIComponent(error.message));
  }
});

// Delete credit entry
router.get('/deleteCredit/:id', async (req, res) => {
  try {
    await Credit.findByIdAndDelete(req.params.id);
    res.redirect('/creditTable?success=true');
  } catch (error) {
    console.error('Error deleting credit:', error);
    res.status(404).send('Credit entry not found');
  }
});

// CSV Export route for credits
router.get('/exportCredits', async (req, res) => {
  try {
    const credits = await Credit.find().sort({ createdAt: -1 });
    
    // Create CSV header
    const csvHeader = 'No,Buyer Name,NIN,Location,Contact,Produce Name,Produce Type,Tonnage (kg),Unit Price (UGX),Amount Due (UGX),Due Date,Sales Agent,Branch,Dispatch Date,Status\n';
    
    // Create CSV rows
    const csvRows = credits.map((credit, index) => {
      const dueDate = credit.dueDate ? new Date(credit.dueDate).toLocaleDateString() : 'N/A';
      const dispatchDate = credit.dateOfDispatch ? new Date(credit.dateOfDispatch).toLocaleDateString() : 'N/A';
      return `${index + 1},"${credit.buyerName}","${credit.nin || 'N/A'}","${credit.location || 'N/A'}","${credit.contact || 'N/A'}","${credit.produceName}","${credit.produceType || 'N/A'}",${credit.tonnage},${credit.unitPrice},${credit.amountDue},"${dueDate}","${credit.salesAgentName}","${credit.branch || 'N/A'}","${dispatchDate}","${credit.status || 'pending'}"`;
    }).join('\n');
    
    const csv = csvHeader + csvRows;
    
    // Set headers for CSV download
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="credit_records.csv"');
    res.send(csv);
  } catch (error) {
    console.error('Error exporting credits:', error);
    res.status(500).send('Error exporting credits');
  }
});

module.exports = router;
