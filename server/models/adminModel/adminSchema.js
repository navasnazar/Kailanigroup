const mongoose = require('mongoose'),
      Schema = mongoose.Schema


const Admin = mongoose.model('Admin', {
    username: { type: String, required: true},
    password: { type: String, required: true }
});

module.exports = Admin
