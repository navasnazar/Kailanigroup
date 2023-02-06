const mongoose = require('mongoose'),
      Schema = mongoose.Schema


const Cart = mongoose.model('Cart', {
        userId: {type: String},
        userMail: {type: String},
        services: [ 
            {
                serviceID: { type: String, required: true},
                title: { type: String, required: true},
                service: { type: String, required: true },
                amount: { type: Number, required: true },
                img1_url:{type: String},
                img2_url:{type: String},
                qty:{ type: Number},
            }
        ],
        check_in:{type: Date},
        check_out:{type: Date},
        adults: {type: String},
        child: {type: String},
        rooms: {type: String},
        checkoutAmount:{type: Number},
});

module.exports = Cart