const express = require('express');
const router = express.Router();
const Produce = require('../models/Produce');

// GET: Render the form to add produce
router.get("/addProduce", async (req, res) => {
    const produces = await Produce.find();
    res.render('recordprocurement', { produces });
});

// POST: Handle form submission to add produce
router.post("/addProduce", async (req, res) => {
    try {
        await Produce.create({
            produceName: req.body.produceName,
            produceType: req.body.produceType,
            producedateandtime: new Date(`${req.body.date}T${req.body.time}`),
            producecost: req.body.cost,
            dealerName: req.body.dealerName,
            branch: "", // Add dynamic branch if required
            contact: req.body.contact,
            salePrice: req.body.salePrice,
            tonnage: req.body.tonnage
        });
        res.redirect("/recordprocurement");
    } catch (err) {
        res.status(500).send('Error saving produce');
    }
});

// GET: Render procurement table
router.get("/recordprocurement", async (req, res) => {
    const produces = await Produce.find();
    res.render('recordT', { produces });
});

// GET: Render the edit form
router.get("/editProduce/:id", async (req, res) => {
    try {
        const produce = await Produce.findById(req.params.id);
        if (!produce) return res.status(404).send("Produce not found");
        res.render("editproduce", { produce });
    } catch (error) {
        console.error("Error finding produce:", error);
        res.redirect("/recordprocurement?error=Unable to find produce");
    }
});

// POST: Save the edited produce
router.post("/editProduce/:id", async (req, res) => {
    try {
        const updateData = {
            produceName: req.body.produceName,
            produceType: req.body.produceType,
            producedateandtime: new Date(`${req.body.procurementDate}T${req.body.procurementTime}`),
            producecost: req.body.cost,
            dealerName: req.body.dealerName,
            contact: req.body.contact,
            sellingprice: req.body.salePrice,
            tonnage: req.body.tonnage
        };
        await Produce.findByIdAndUpdate(req.params.id, updateData);
        res.redirect("/recordprocurement?success=true");
    } catch (error) {
        console.error("Error updating produce:", error);
        res.redirect(`/editProduce/${req.params.id}?error=Update failed`);
    }
});

// GET: Confirm deletion (optional UI step)
router.get("/deleteProduce/:id", async (req, res) => {
    try {
        const produce = await Produce.findById(req.params.id);
        if (!produce) return res.status(404).send("Produce not found");
        res.render("confirmDelete", { produce }); // Optional confirmation page
    } catch (error) {
        console.error("Error loading deletion page:", error);
        res.redirect("/recordprocurement?error=Unable to load delete page");
    }
});

// POST: Handle deletion
router.post("/deleteProduce/:id", async (req, res) => {
    try {
        await Produce.findByIdAndDelete(req.params.id);
        res.redirect('/recordprocurement');
    } catch (error) {
        console.error("Error deleting produce:", error);
        res.status(500).send('Error deleting produce item');
    }
});

module.exports = router;
