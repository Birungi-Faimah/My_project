const express = require('express');
const router = express.Router();
const Produce = require('../models/Produce');

// Render the procurement table
router.get("/recordprocurement", async (req, res) => {
    const produces = await Produce.find();
    res.render('recordprocurement', { produces });
});

// Handle form submission
router.post("/addproduce", async (req, res) => {
    try {
        await Produce.create({
            produceName: req.body.produceName,
            produceType: req.body.produceType,
            producedateandtime: new Date(`${req.body.procurementDate}T${req.body.procurementTime}`),
            producecost: req.body.cost,
            dealerName: req.body.dealerName,
            branch: "", // Set branch if needed
            contact: req.body.dealerContact,
            sellingprice: req.body.sellingPrice,
            tonnage: req.body.tonnage
        });
        res.redirect("/recordprocurement");
    } catch (err) {
        res.status(500).send('Error saving produce');
    }
});

module.exports = router;