const bcrypt = require('bcrypt')
const ServiceDB = require('../models/adminModel/serviceSchema')
const objectId=require('mongodb').ObjectId
const UserDB = require('../models/userModel/userSchema')
const jwt = require('jsonwebtoken');
const CartDB = require('../models/userModel/userCartSchema')
const FormDB = require('../models/userModel/userFormSchema')
const BookingDB = require('../models/userModel/BookingSchema')

const {
    REFRESH_TOKEN_SECRET,
    ACCESS_TOKEN_SECRET,
    ACTIVATION_TOKEN_SECRET,
    CLIENT_URL,
    SECRET_TOKEN_USER
} = process.env

const createAccessToken = (payload)=>{
    return jwt.sign(payload,SECRET_TOKEN_USER,{expiresIn:'1d'})
}

module.exports={
    findServices:((data)=>{
        return new Promise(async(resolve, reject)=>{
            await ServiceDB.find().then((value)=>{
                if(value){
                    resolve(value)
                }else{
                    const text = 'data not fount'
                    resolve(text)
                }
            }).catch((err)=>{
                console.log(err);
            })
        })
    }),
    createUser:(userData)=>{
        let validation = {email:false, mobile:false, done:false}
        return new Promise(async(resolve, reject)=>{
            userData.password = await bcrypt.hash(userData.password,10),
            await UserDB.findOne({email:userData.email}).then((data)=>{
                if(data){
                    validation.email=true;
                    resolve(validation)
                }else{
                    let new_user = new UserDB({
                        email: userData.email,
                        password: userData.password,
                        name: userData.nickname,
                        mobile: userData.phone,
                        blockStatus: false,
                    })
                    new_user.save().then((response)=>{
                        validation.done=true
                        resolve(validation)
                    })
                }
            })
        })
    },
    userLogin:(loginData)=>{
        let validation = {
            done: false,
            blockStatus: false,
            notRegister: false,
            passErr: false
            }
        return new Promise(async(resolve, reject)=>{
            await UserDB.findOne({email:loginData.username}).then(async(userDetails)=>{
                if(!userDetails){
                    validation.notRegister=true
                    resolve([validation])
                }else{
                    if(userDetails.blockStatus){
                        validation.blockStatus=true
                        resolve([validation])
                    }else{
                       await bcrypt.compare(loginData.password, userDetails.password).then((status)=>{
                            if(status){
                                validation.done=true
                                const token = createAccessToken({user:userDetails.email, userID:userDetails._id});
                                resolve([validation,token])
                            }else{
                                validation.passErr=true
                                resolve([validation])
                            }
                        })
                    }
                }
            }).catch((err)=>{
                console.log(err);
            })
        })
    },
    userDetails:(userId)=>{
        return new Promise(async(resolve, reject)=>{
            await UserDB.findOne({_id: objectId(userId)}).then((data)=>{
                resolve(data)
            })
        })
    },
    AddToCart:(userDetails, serviceId, bookingDetails, dateRange)=>{
        let qty =1
        if(!bookingDetails.adults){
            bookingDetails.adults='1';
        }
        if(!bookingDetails.childs){
            bookingDetails.childs='0';
        }
        if(!bookingDetails.rooms){
            bookingDetails.rooms='1';
        }
        console.log('dfgdghf',dateRange);
        return new Promise(async(resolve, reject)=>{
            let userCart = await CartDB.findOne({userId:userDetails.userID})
            if(userCart){
                await CartDB.updateOne({userId:userDetails.userID},
                    {
                        check_in:dateRange[0],
                        check_out:dateRange[1],
                        adults: bookingDetails.adults,
                        child: bookingDetails.child,
                        rooms: bookingDetails.rooms,
                    })
                let sameCart = await CartDB.findOne({userId:userDetails.userID, 'services.serviceID':serviceId})
                if(sameCart){
                    CartDB.updateOne({userId:userDetails.userID, 'services.serviceID':serviceId},
                    {
                        $inc:{'services.$.qty': qty}
                    }).then((response)=>{
                        resolve(response)
                    })
                }else{
                    await ServiceDB.findOne({_id:serviceId}).then((serviceDetails)=>{
                        CartDB.updateOne({userId:userDetails.userID},
                            {
                                $push:{
                                    services: [ 
                                        {
                                            serviceID: serviceDetails._id,
                                            title: serviceDetails.title,
                                            service: serviceDetails.service,
                                            amount: serviceDetails.amount,
                                            img1_url:serviceDetails.img1_url,
                                            img2_url:serviceDetails.img2_url,
                                            qty:1,
                                        }
                                    ],
                                }
                            }).then((response)=>{
                                resolve(response)
            
                            })
                    })
                }
            }else{
                let serviceDetails = await ServiceDB.findOne({_id:serviceId})
                var cart_service = new CartDB({
                    userId: userDetails.userID,
                    userMail: userDetails.user,
                    services: [ 
                        {
                            serviceID: serviceDetails._id,
                            title: serviceDetails.title,
                            service: serviceDetails.service,
                            amount: serviceDetails.amount,
                            img1_url:serviceDetails.img1_url,
                            img2_url:serviceDetails.img2_url,
                            qty:1,
                        }
                    ],
                    check_in:dateRange[0],
                    check_out:dateRange[1],
                    adults: bookingDetails.adults,
                    child: bookingDetails.childs,
                    rooms: bookingDetails.rooms,
                })
                cart_service.save().then((response)=>{
                    resolve(response)
                })
            }
        })
    },
    RemoveToCart:(userDetails, serviceId, bookingDetails, dateRange)=>{
        return new Promise(async (resolve, reject)=>{
            await CartDB.updateOne({userId:userDetails.userID},
            {
                $pull: {services: {serviceID: serviceId}}
            }).then(()=>{
                resolve()
            })
        })
    },
    getUserCarts:(userID)=>{
        return new Promise(async(resolve, reject)=>{
            await CartDB.findOne({userId:userID}).then((resp)=>{
                resolve(resp)
            }).catch((err)=>{
                console.log(err);
            })
        })
    },
    getCartFind:(userID)=>{
        return new Promise(async(resolve, reject)=>{
            await CartDB.findOne({userId:userID}).then((resp)=>{
                if(resp){
                    resolve(resp)
                }else{
                    resolve()
                }
            }).catch((err)=>{
                console.log(err);
            })
        })
    },
    userCartQtyDec:(serviceID, userID)=>{
        return new Promise(async(resolve, reject)=>{
           let data =  await CartDB.findOne({userId:userID}, {services:{$elemMatch:{serviceID:serviceID}}})
                let dataQty = data.services[0].qty
                if(dataQty!=1){
                    CartDB.updateOne({userId:userID, 'services.serviceID':serviceID},
                    {
                        $inc:{'services.$.qty': -1}
                    }).then((response)=>{
                        resolve(response)
                    }).catch((err)=>{
                        console.log(err);
                    })
                }else{
                    CartDB.updateOne({userId:userID},
                        {
                            $pull: {services: {serviceID: serviceID}}
                        }).then(()=>{
                            resolve()
                        })
                }
            })
           
    },
    userCartQtyInc:(serviceID, userID)=>{
        return new Promise(async(resolve, reject)=>{
           await CartDB.updateOne({userId:userID, 'services.serviceID':serviceID},
                    {
                        $inc:{'services.$.qty': 1}
                    }).then((response)=>{
                        resolve(response)
                    }).catch((err)=>{
                        console.log(err);
                    })
        })
    },
    userFromData:(user, formData)=>{
        return new Promise(async(resolve, reject)=>{
           let data = await FormDB.findOne({userId:user.userID})
           if(data){
              await FormDB.updateOne({userId:user.userID},
                 {$set:{
                        address:formData.address,
                        city:formData.city,
                        country:formData.country,
                        email:formData.email,
                        message:formData.message,
                        mobile:formData.mobile,
                        name:formData.name,
                        phone:formData.phone,
                        state:formData.state,
                        zipcode:formData.zipcode,
                 }}).then((resp)=>{
                    resolve(resp)
                 })
           }else{
            var user_form = new FormDB({
                userId: user.userID,
                userMail: user.user,
                        address:formData.address,
                        city:formData.city,
                        country:formData.country,
                        email:formData.email,
                        message:formData.message,
                        mobile:formData.mobile,
                        name:formData.name,
                        phone:formData.phone,
                        state:formData.state,
                        zipcode:formData.zipcode,
              
            })
            user_form.save().then((response)=>{
                resolve(response)
            })
           }
        })
    },
    getUserFromData:(userID)=>{
        return new Promise(async(resolve, reject)=>{
            let formData = await FormDB.findOne({userId:userID})
            if(formData){
                resolve(formData)
            }else{
                resolve({})
            }
        })
    },
    dateConfirmation:(userId, bookingDetails, dateRange)=>{
        let validation = {done:false, err:false}
        let qty =1
        if(!bookingDetails.adults){
            bookingDetails.adults='1';
        }
        if(!bookingDetails.childs){
            bookingDetails.childs='0';
        }
        if(!bookingDetails.rooms){
            bookingDetails.rooms='1';
        }
        if(!dateRange[1]){
            dateRange[1]=dateRange[0]
        }
        return new Promise(async(resolve, reject)=>{
            let userCart = await CartDB.findOne({userId:userId})
            if(userCart){
                await CartDB.updateOne({userId:userId},
                    {$set:{
                        check_in:dateRange[0],
                        check_out:dateRange[1],
                        adults: bookingDetails.adults,
                        child: bookingDetails.childs,
                        rooms: bookingDetails.rooms,
                    }}).then((resp)=>{
                        validation.done=true
                       resolve(validation)
                    })
            }else{
                validation.err=true
                resolve(validation)
            }
        })
    },
    bookingSubmit:(user, bookingDetails, FinalAmount, form)=>{
        let today = Date.now();
        return new Promise((resolve, reject)=>{
            var booking_service = new BookingDB({
                userId: user.userID,
                userMail: user.user,
                services: bookingDetails.services,
                form : form,
                bookingData: today,
                check_in: bookingDetails.check_in,
                check_out: bookingDetails.check_out,
                adults: bookingDetails.adults,
                child: bookingDetails.child,
                rooms: bookingDetails.rooms,
                checkoutAmount: FinalAmount,
                payment_status: 'Pending',
                booking_status: 'Pending',
                payment : false,
                conform_booking : false,
                conform_check_in: false,
                conform_check_out: false,
            })
            booking_service.save().then((response)=>{
                resolve(response)
            })
        })
    },
    removeCart:(user)=>{
        return new Promise(async(resolve, reject)=>{
            await CartDB.deleteOne({userId:user.userID}).then((resp)=>{
                resolve(resp)
            }).catch((err)=>{
                console.log(err);
            })
        })
    },
    getBookingData:(bookingID)=>{
        return new Promise(async(resolve, reject)=>{
            await BookingDB.findOne({_id:bookingID}).then((data)=>{
                resolve(data)
            }).catch((err)=>{
                console.log(err);
            })
        })
    },
    getServices:(userId)=>{
        return new Promise(async(resolve, reject)=>{
           let data = await BookingDB.find({userId:userId})
           if(data.length!=0){
                resolve(data)
           }else{
                resolve()
           }
        })
    },
    getCart:(userId)=>{
        return new Promise(async(resolve, reject)=>{
            let data = await CartDB.findOne({userId:userId})
            if(data){
                resolve(data)
            }else{
                resolve()
            }
        })
    }
} 