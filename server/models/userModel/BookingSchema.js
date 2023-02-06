const mongoose = require('mongoose'),
      Schema = mongoose.Schema


const Booking = mongoose.model('Booking', {
        userId: {type: String},
        userMail: {type: String},
        services: [ 
            {
                serviceID: {type: String, required: true},
                title: {type: String, required: true},
                service: {type: String, required: true },
                amount: {type: Number, required: true },
                img1_url: {type: String},
                img2_url: {type: String},
                qty: {type: Number},
            }
        ],
        form : {
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
        },
        bookingData: {type: Date},
        check_in: {type: Date},
        check_out: {type: Date},
        adults: {type: String},
        child: {type: String},
        rooms: {type: String},
        checkoutAmount: {type: String},
        payment_status: {type: String},
        booking_status: {type: String},
        payment : {type: Boolean},
        conform_booking : {type: Boolean},
        conform_check_in: {type: Boolean},
        conform_check_out: {type: Boolean},
});

module.exports = Booking