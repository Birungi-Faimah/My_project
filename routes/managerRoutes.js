const express = require('express');
const router = express.Router();
const Produce = require('../models/Produce');

router.get("/manager", async (req, res) => {
    const produces = await Produce.find().sort({ producedateandtime: -1 });
    const totalProcured = produces.reduce((sum, p) => sum + (p.tonnage || 0), 0);
    res.render("manager", { produces, totalProcured });
});

module.exports = router;