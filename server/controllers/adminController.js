const { response } = require('../app');
const adminHelpers = require('../helpers/adminHelpers')
const sendMail = require('../controllers/sendMail')
const jwt = require('jsonwebtoken');
const e = require('express');
const bcrypt = require('bcrypt')
const AdminDB = require('../models/adminModel/adminSchema')


const {
    REFRESH_TOKEN_SECRET,
    ACCESS_TOKEN_SECRET,
    ACTIVATION_TOKEN_SECRET,
    CLIENT_URL
} = process.env

const createAccessToken = (payload)=>{
    return jwt.sign(payload,ACCESS_TOKEN_SECRET,{expiresIn:'15m'})
}


module.exports={
    adminLogin:((req, res)=>{
        console.log('xxx');
        let data = req.body
        adminHelpers.login(data).then((response)=>{
            const [validation, token]=response
            if(validation.done){
                res.json({status:'done', admin:token})
            }
            if(validation.err){
                res.json({status:'username Err'})
            }
            if(validation.passErr){
                res.json({status:'password Err'})
            }
        })
    }),
    passRecover:((req, res)=>{
        let recMail = req.body.reqMail
        adminHelpers.recoverPassword(recMail).then((data)=>{
            if(data.validation.done){
                const access_Token = createAccessToken({ id: data.res.id });
                const url = `${CLIENT_URL}/admin/resetpass/${access_Token}`;

                sendMail(recMail, url, "Reset Your password");
                res.json({
                  msg: "Reset password link successfully send please check your email!",
                });
            }
        })
    }),
    resetPassword:(async(req, res)=>{
        try {
            const password = req.body.password
            const passwordHash = await bcrypt.hash(password, 12)

            await AdminDB.findOneAndUpdate({_id: req.user.id}, {
                password: passwordHash
            })

            res.json({status: "done"})
        } catch (err) {
            return res.status(500).json({msg: err.msg})
        }
    }),
    getServices:(async(req, res)=>{
        adminHelpers.getAllService().then((response)=>{
            let allServices = response
            res.json({allServices})
        })
    }),
    addService:(async(req, res)=>{
        let serviceData = req.body
        adminHelpers.addNewService(serviceData).then((response)=>{
            res.json({status:'done', id:serviceData._id})
        })
    }),
    editService:(async(req, res)=>{
        let editedData = req.body
        adminHelpers.editService(editedData).then((response)=>{
            res.json({status:'done', id:editedData._id})
        })
    }),
    delService:(async(req, res)=>{
        let deletedData = req.body
        adminHelpers.deleteService(deletedData).then((response)=>{
            res.json({status:'done', id:deletedData._id})
        })
    }),
    getAllBooking:(async(req, res)=>{
        adminHelpers.getBooking().then((response)=>{
            if(!response){
                res.json({status:'err', msg:'**Their is No Booking Details Available'})
            }else{
                res.json({status:'done', data:response})
            }
        })
    }),
    getInvoices:((req, res)=>{
        let bookingID = req.body.invoiceID
        if(!bookingID){
            res.json({status:'err'})
        }
        adminHelpers.getBookingDatas(bookingID).then((data)=>{
            res.json({status:'done', data:data})
        })
    }),
    StatusChange:((req, res)=>{
        let id = req.body.id
        adminHelpers.ChangeBookingStatus(id).then((response)=>{
            res.json({status:'done'})
        })
    }),
    DeleteBooking:((req, res)=>{
        let id = req.body.id
        adminHelpers.DeleteBookingDet(id).then((response)=>{
            if(response.err){
                res.json({status:'err'})
            }
            if(response.done){
                res.json({status:'done'})
            }
        })
    }),
    CheckInChange:((req, res)=>{
        let id = req.body.id
        adminHelpers.ChangeCheckInStatus(id).then((response)=>{
            res.json({status:'done'})
        })
    }),
    CheckOutChange:((req, res)=>{
        let id = req.body.id
        adminHelpers.ChangeCheckOutStatus(id).then((response)=>{
            res.json({status:'done'})
        })
    })
} 