const mongoose = require('mongoose');

const BusinessSchema = new mongoose.Schema({
  name: { type: String, required: true },
  logo: { type: String },
  yearsOfOperation: { type: Number, required: true },
  numberOfProducts: { type: Number, required: true },
  likes: { type: Number, default: 0 },
  products: [{ type: String }]
});

module.exports = mongoose.model('Business', BusinessSchema);
