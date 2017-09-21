const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BaseSchema = new Schema({
  uuid: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return /\d{8}-\d{4}-\d{4}-\d{4}-\d{12}/.test(value);
      },
      message: '{value} is not a valid uuid!',
    },
  },
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
