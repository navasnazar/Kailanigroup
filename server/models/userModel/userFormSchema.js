const mongoose = require('mongoose'),
      Schema = mongoose.Schema


const Form = mongoose.model('Form', {
        userId: {type: String},
        userMail: {type: String},
                address:{type: String},
                city:{type: String},
                country:{type: String},
                email:{type: String},
                message:{type: String},
                mobile:{type: String},
                name:{type: String},
                phone:{type: String},
                state:{type: String},
                zipcode:{type: String},
            
});

module.exports = Form