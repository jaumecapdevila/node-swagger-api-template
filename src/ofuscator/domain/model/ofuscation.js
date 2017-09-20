const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OfuscationSchema = new Schema({
    oldURL: {
        type: String,
        required: true
    },
    uniqueId: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('ofuscation', OfuscationSchema);
