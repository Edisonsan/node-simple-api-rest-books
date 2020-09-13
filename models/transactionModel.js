const mongoose = require('mongoose');

const { Schema } = mongoose;

const transactionModel = new Schema({
  transactionId: { type: String },
  amount: { type: String },
  orderId: { type: String },
  approved: { type: Boolean, default: false },
});

module.exports = mongoose.model('Transaction', transactionModel);
