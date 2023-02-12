const { response } = require('../app');
const AdminDB = require('../models/adminModel/adminSchema')
const ServiceDB = require('../models/adminModel/serviceSchema')
const jwt = require('jsonwebtoken');
const e = require('express');
const bcrypt = require('bcrypt')
const objectId=require('mongodb').ObjectId
const BookingDB = require('../models/userModel/BookingSchema')
const UserDB = require('../models/userModel/userSchema')

const {
    SECRET_TOKEN_ADMIN
} = process.env

const createAccessToken = (payload)=>{
    return jwt.sign(payload,SECRET_TOKEN_ADMIN,{expiresIn:'1d'})
}

module.exports={
    login:(data)=>{
        let validation={done:false, err:false, passErr:false}
        return new Promise(async(resolve, reject)=>{
            adminData = await AdminDB.findOne({username:data.username})
            if(adminData){ 
                const isMatch = await bcrypt.compare(data.password, adminData.password)
                if(!isMatch){
                    validation.passErr=true
                    resolve([validation])
                }else{
                    validation.done=true
                    const token = createAccessToken({admin:data.username});
                    resolve([validation,token])
                }
            }else{
                validation.err=true
                resolve([validation])
            }
        })
    },    
    recoverPassword:(recMail)=>{
        let validation={done:false, err:false}
        return new Promise(async(resolve, reject)=>{
            await AdminDB.findOne({username:recMail}).then((res)=>{
                if(res){
                    validation.done=true;
                    resolve({validation, res})
                }else{
                    validation.err=true;
                    resolve(validation)
                }
            }).catch((err)=>{
                console.log('error',err);
            })
        })
    },
    getAllService:()=>{
        return new Promise(async(resolve, reject)=>{
            ServiceDB.find().then((data)=>{
                resolve(data)
            }).catch((e)=>{
                console.log(e);
            })
        })
    },
    addNewService:(data)=>{
        return new Promise(async(resolve, reject)=>{
            let new_service = new ServiceDB({
                title: data.uploadData.title,
                service: data.uploadData.service,
                description: data.uploadData.description,
                amount: data.uploadData.amount,
                img1_url: data.uploadImagUrl.img1_url,
                img2_url: data.uploadImagUrl.img2_url,
                img3_url: data.uploadImagUrl.img3_url,
                img4_url: data.uploadImagUrl.img4_url,
            })
            new_service.save().then((response)=>{
                resolve(response)
            })
        })
    },
    editService:(editedData)=>{
        return new Promise(async(resolve, reject)=>{
            ServiceDB.updateOne({_id:objectId(editedData._id)},
            {$set:{
                title: editedData.title,
                service: editedData.service,
                description: editedData.description,
                amount: editedData.amount
                }
            }).then((response)=>{
                resolve(response)
            }).catch((e)=>{
                console.log(e);
            })
        })
    },
    deleteService:(deletedData)=>{
        return new Promise(async(resolve, reject)=>{
            ServiceDB.remove({_id:objectId(deletedData._id)}).then((response)=>{
                resolve(response)
            }).catch((e)=>{
                console.log(e);
            })
        })
    },
    getBooking:()=>{
        return new Promise(async(resolve, reject)=>{
            await BookingDB.find().then((response)=>{
                resolve(response)
            }).catch((err)=>{
                console.log(err);
            })
        })
    },
    getBookingDatas:(bookingID)=>{
        return new Promise(async(resolve, reject)=>{
            await BookingDB.findOne({_id:bookingID}).then((data)=>{
                resolve(data)
            }).catch((err)=>{
                console.log(err);
            })
        })
    },
    ChangeBookingStatus:(id)=>{
        return new Promise(async(resolve, reject)=>{
            await BookingDB.findOne({_id:id}).then((data)=>{
                if(data.booking_status=='Pending'){
                    const response = BookingDB.updateOne({_id:id}, 
                        {$set:{
                            booking_status: 'Approved',
                            conform_booking: true
                        }
                    }).then((response)=>{
                        resolve(response)
                    }).catch((e)=>{
                        console.log(e);
                    })
                }
                if(data.booking_status=='Approved'){
                    const response = BookingDB.updateOne({_id:id}, 
                        {$set:{
                            booking_status: 'Pending',
                            conform_booking: false
                        }
                    }).then((response)=>{
                        resolve(response)
                    }).catch((e)=>{
                        console.log(e);
                    })
                }
            })
        })
    },
    ChangeCheckInStatus:(id)=>{
        return new Promise(async(resolve, reject)=>{
            await BookingDB.findOne({_id:id}).then((data)=>{
                if(data.conform_check_in){
                    const response = BookingDB.updateOne({_id:id}, 
                        {$set:{
                            conform_check_in: false,
                        }
                    }).then((response)=>{
                        resolve(response)
                    }).catch((e)=>{
                        console.log(e);
                    })
                }else{
                    const response = BookingDB.updateOne({_id:id}, 
                        {$set:{
                            conform_check_in: true,
                        }
                    }).then((response)=>{
                        resolve(response)
                    }).catch((e)=>{
                        console.log(e);
                    })
                }
            })
        })
    },
    ChangeCheckOutStatus:(id)=>{
        return new Promise(async(resolve, reject)=>{
            await BookingDB.findOne({_id:id}).then((data)=>{
                if(data.conform_check_out){
                    const response = BookingDB.updateOne({_id:id}, 
                        {$set:{
                            conform_check_out: false,
                        }
                    }).then((response)=>{
                        resolve(response)
                    }).catch((e)=>{
                        console.log(e);
                    })
                }else{
                    const response = BookingDB.updateOne({_id:id}, 
                        {$set:{
                            conform_check_out: true,
                        }
                    }).then((response)=>{
                        resolve(response)
                    }).catch((e)=>{
                        console.log(e);
                    })
                }
            })
        })
    },
    DeleteBookingDet:(id)=>{
        let validation = {done:false, err:false}
        let today = Date.now()
        return new Promise(async(resolve, reject)=>{
            let data = await BookingDB.findOne({_id:id})
            if(data.booking_status=='Approved'){
                validation.err=true
                resolve(validation)
            }else{
                BookingDB.updateOne({_id:id},
                    {$set:{
                        deleteStatus: true,
                        deleteDate: today
                        }
                    }).then((resp)=>{
                    validation.done=true
                    resolve(validation)
                })
            }
        })
    },
    getAllUsers:()=>{
        return new Promise(async(resolve, reject)=>{
            await UserDB.find().then((data)=>{
                if(data){
                    resolve(data)
                }else{
                    resolve()
                }
            }).catch((err)=>{
                console.log(err);
            })
        })
    },
    blockedStatusChange:(blockedUserId)=>{
        return new Promise(async(resolve, reject)=>{
            await UserDB.findOne({_id:blockedUserId}).then((user)=>{
                if(user.blockStatus==false){
                    UserDB.updateOne({_id:blockedUserId},
                    {$set:{
                        blockStatus: true
                        }
                    }).then((response)=>{
                        resolve()
                    }).catch((err)=>{
                        console.log(err);
                    })
                }else{
                    UserDB.updateOne({_id:blockedUserId},
                    {$set:{
                        blockStatus: false
                        }
                    }).then((response)=>{
                        resolve()
                    }).catch((err)=>{
                        console.log(err);
                    })
                }
            })
        })
    }
}