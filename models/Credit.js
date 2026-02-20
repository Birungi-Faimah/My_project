const mongoose = require('mongoose');
const CreditSchema = new mongoose.Schema({
  buyerName: {
    type: String,
    trim: true,
    required: true,
    minlength: 2
  },
  nin: {
    type: String,
    trim: true,
    required: true,
    validate: {
      validator: function(v) {
        // Ugandan NIN format (approximately)
        return /^[A-Z]{2}[0-9]{10}[A-Z]{2}$/.test(v);
      },
      message: props => `${props.value} is not a valid National ID number!`
    }
  },
  location: {
    type: String,
    trim: true,
    required: true,
    minlength: 2
  },
  contact: {
    type: String,
    trim: true,
    required: true,
    validate: {
      validator: function(v) {
        return /^(\+256|0)[0-9]{9}$/.test(v);
      },
      message: props => `${props.value} is not a valid Ugandan phone number!`
    }
  },
  amountDue: {
    type: Number,
    required: true,
    min: 10000
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
  dueDate: {
    type: Date,
    required: true
  },
  produceName: {
    type: String,
    trim: true,
    required: true,
    minlength: 2
  },
  produceType: {
    type: String,
    trim: true,
    required: true
  },
  tonnage: {
    type: Number,
    required: true,
    min: 1
  },
  unitPrice: {
    type: Number,
    required: true,
    min: 0
  },
  dateOfDispatch: {
    type: Date,
    required: true,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['pending', 'paid', 'overdue'],
    default: 'pending'
  }
}, { timestamps: true });

// Index for faster queries
CreditSchema.index({ branch: 1, status: 1 });
CreditSchema.index({ dueDate: 1 });

module.exports = mongoose.model('Credit', CreditSchema);