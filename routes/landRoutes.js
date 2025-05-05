const express = require('express');
const router = express.Router(); // ✅ THIS LINE DEFINES `router`

router.get("/land", (req, res) => {
    console.log("GET /land hit"); // Optional debug log
    res.render('land');
});

module.exports = router;
