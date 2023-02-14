const express = require('express');
const { response } = require('../app');
const router = express.Router();
const adminController = require('../controllers/adminController')
const auth = require('../controllers/auth')
const adminAuthentication = require('../controllers/adminAuthentication')


router.post('/login',adminController.adminLogin)
router.post('/recovermail',adminController.passRecover)

router.post('/resetpass', auth, adminController.resetPassword)

router.use(adminAuthentication)
router.get('/services', adminController.getServices)
router.post('/addServices', adminController.addService)
router.post('/editServices', adminController.editService)
router.post('/delServices', adminController.delService) 
router.get('/getAllBooking', adminController.getAllBooking)
router.post('/getInvoice', adminController.getInvoices)
router.post('/statusChange', adminController.StatusChange)
router.post('/CheckInChange', adminController.CheckInChange)
router.post('/CheckOutChange', adminController.CheckOutChange)
router.post('/bookingDelete', adminController.DeleteBooking)
router.get('/getUsers', adminController.getUsers)
router.post('/blockStatus', adminController.blockedStatus)

module.exports = router;        