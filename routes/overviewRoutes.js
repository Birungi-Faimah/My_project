const express = require('express');
const router = express.Router();

router.get("/overview",(req,res)=>{
    res.render('overview')
});



module.exports = router;