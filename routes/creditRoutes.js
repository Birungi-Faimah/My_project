const express = require('express');
const router = express.Router();
const Credit = require('../models/Credit');

// Render the form
router.get('/addCredit', (req, res) => {
  res.render('credit', { credit: null, success: false });
});

// Handle form submission
router.post('/addCredit', async (req, res) => {
  try {
    console.log('Received form data:', req.body);
    const credit = new Credit(req.body);
    await credit.save();
    res.redirect('/creditTable?success=true');
  } catch (error) {
    console.error('Error saving credit:', error);
    res.status(500).render('credit', { credit: req.body, error: 'Failed to save credit', success: false });
  }
});

// Render the table
router.get('/creditTable', async (req, res) => {
  try {
    const credits = await Credit.find();
    res.render('creditT', { credits, success: req.query.success === 'true' });
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
    res.render('credit', { credit, success: false });
  } catch (error) {
    console.error('Error fetching credit:', error);
    res.status(404).send('Credit entry not found');
  }
});

// Update credit entry
router.post('/editCredit/:id', async (req, res) => {
  try {
    await Credit.findByIdAndUpdate(req.params.id, req.body, { runValidators: true });
    res.redirect('/creditTable?success=true');
  } catch (error) {
    console.error('Error updating credit:', error);
    res.status(500).render('credit', { credit: req.body, error: 'Failed to update credit', success: false });
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

module.exports = router;