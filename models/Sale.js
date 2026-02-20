const mongoose = require('mongoose');
const SaleSchema = new mongoose.Schema({
    produceName: {
        type: String,
        trim: true,
        required: true
    },
    produceType: {
        type: String,
        trim: true
    },
    tonnageSold: {
        type: Number,
        required: true,
        min: 1
    },
    amountPaid: {
        type: Number,
        required: true,
        min: 10000 // Not less than 5 characters in UGX
    },
    buyerName: {
        type: String,
        trim: true,
        required: true,
        minlength: 2
    },
    salesAgentName: {
        type: String,
        trim: true,
        required: true,
        minlength: 2
    },
    branch: {
        type: String,
        trim: true,
        required: true,
        enum: ['Maganjo', 'Matugga']
    },
    saleDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    saleTime: {
        type: String,
        required: true
    },
    unitPrice: {
        type: Number,
        required: true
    }
}, { timestamps: true });

// Index for faster queries
SaleSchema.index({ branch: 1, saleDate: -1 });
SaleSchema.index({ salesAgentName: 1 });

module.exports = mongoose.model('Sale', SaleSchema);