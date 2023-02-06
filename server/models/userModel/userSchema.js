const mongoose = require('mongoose'),
      Schema = mongoose.Schema


const User = mongoose.model('User', {
    email: { type: String, required: true},
    password: { type: String, required: true },
    name: { type: String, required: true },
    mobile: { type: String, required: true },
    blockStatus: {type: Boolean}
});

module.exports = User