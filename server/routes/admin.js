var express = require('express');
const { response } = require('../app');
const router = express.Router();
const adminController = require('../controllers/adminController')
const auth = require('../controllers/auth')
const adminAuthentication = require('../controllers/adminAuthentication')


router.post('/login',adminController.adminLogin)
router.post('/recovermail',adminController.passRecover)
router.post('/resetpass', auth, adminController.resetPassword)
router.get('/services', adminAuthentication, adminController.getServices)
router.post('/addServices', adminAuthentication, adminController.addService)
router.post('/editServices', adminAuthentication, adminController.editService)
router.post('/delServices', adminAuthentication, adminController.delService) 
router.get('/getAllBooking', adminAuthentication, adminController.getAllBooking)
router.post('/getInvoice', adminAuthentication, adminController.getInvoices)
router.post('/statusChange', adminAuthentication, adminController.StatusChange)
router.post('/CheckInChange', adminAuthentication, adminController.CheckInChange)
router.post('/CheckOutChange', adminAuthentication, adminController.CheckOutChange)
router.post('/bookingDelete', adminAuthentication, adminController.DeleteBooking)
router.get('/getUsers', adminAuthentication, adminController.getUsers)
router.post('/blockStatus', adminAuthentication, adminController.blockedStatus)

module.exports = router;        