const express = require('express');
const router = express.Router();

router.get("/director",(req,res)=>{
    res.render('director')
});
module.exports = router;