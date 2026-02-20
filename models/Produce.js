const mongoose = require('mongoose');
const ProduceSchema = new mongoose.Schema({
    produceName: {
        type: String,
        trim: true,
        required: true
    },
    produceType: {
        type: String,
        trim: true,
        required: true,
        minlength: 2
    },
    producedateandtime: {
        type: Date,
        default: Date.now
    },
    tonnage: {
        type: Number,
        required: true,
        min: 0
    },
    cost: {
        type: Number,
        required: true,
        min: 0
    },
    dealerName: {
        type: String,
        trim: true,
        required: true,
        minlength: 2
    },
    branch: {
        type: String,
        trim: true,
        required: true,
        enum: ['Maganjo', 'Matugga'] // KGL's two branches
    },
    contact: {
        type: String,
        trim: true,
        required: true,
        validate: {
            validator: function(v) {
                // Ugandan phone number format
                return /^(\+256|0)[0-9]{9}$/.test(v);
            },
            message: props => `${props.value} is not a valid Ugandan phone number!`
        }
    },
    salePrice: {
        type: Number,
        required: true,
        min: 0
    }
}, { timestamps: true });

// Index for faster queries
ProduceSchema.index({ produceName: 1, branch: 1 });

module.exports = mongoose.model('Produce', ProduceSchema);