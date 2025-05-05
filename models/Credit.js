const mongoose = require('mongoose');
const CreditSchema = new mongoose.Schema({
  NameofBuyer: {
    type: String,
    trim: true,
    required: true,
  },
  NIN: {
    type: String,
    trim: true,
    required: true,
  },
  location: {
    type: String,
    trim: true,
    required: true,
  },
  contant: {
    type: Number,
    trim: true,
    required: true,
  },
  AmountDue: {
    type: Number,
    trim: true,
    required: true,
    min: 0,
  },
  agentName: {
    type: String,
    trim: true,
    required: true,
  },
  DueDate: {
    type: Date,
    required: true,
  },
  produceName: {
    type: String,
    trim: true,
    required: true,
  },
  TypeofProduce: {
    type: String,
    trim: true,
    required: true,
  },
  Tonnage: {
    type: Number,
    trim: true,
    required: true,
    min: 0,
  },
  cost: {
    type: Number,
    trim: true,
    min: 0,
  },
  DateofDispatch: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model('Credit', CreditSchema);