const express = require('express');
const router = express.Router();

router.get("/produce", (req, res) => {
    res.render("produce"); // Ensure this matches the view file name
});

module.exports = router;