const mongoose = require('mongoose');
const SaleSchema = new mongoose.Schema({
    produceName:{
        type:String,
        trim:true
    },
    tonnageSold:{
        type:Number,
        trime:true
    },
    amountPaid:{
        type:Number,
        trim:true
    },
    buyerName:{
        type:String,
        trim:true
    },
    salesAgentName:{
        type:String,
        trim:true
    },
    saleDate: {
        type: Date,
        required: true
        // No trim or match for Date fields
      },
      saleTime: {
        type: String,
        required: true,
      }
    }, { timestamps: true 

    });

module.exports = mongoose.model('Sale', SaleSchema)