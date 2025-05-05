const mongoose = require('mongoose');
const ProduceSchema = new mongoose.Schema({
    produceName:{
        type:String,
        trim:true
    },
    produceType:{
        type:String,
    },
    producedateandtime:{
        type:Date,
        trim:true
    },
    producecost:{
        type:Number,
        trim:true
    },
    dealerName:{
        type:String,
        trim:true
    },
    branch:{
        type:String,
        trim:true
    },
    contact:{
        type:Number,
        trim:true
    },
    sellingprice:{
        type:Number,
        trim:true
    }


});
module.exports = mongoose.model('Produce', ProduceSchema)