const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BaseSchema = new Schema({
  propertyA: {
    type: String,
    required: true,
  },
  propertyB: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('baseModel', BaseSchema);
