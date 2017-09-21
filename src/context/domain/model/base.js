const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BaseSchema = new Schema({
  uuid: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}/.test(v);
      },
      message: '{VALUE} is not a valid uuid!',
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
