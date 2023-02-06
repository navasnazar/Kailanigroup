var express = require('express');
const { response } = require('../app');
const router = express.Router();
const userController = require('../controllers/userController')
const userAuthentication = require('../controllers/userAuthentication')


router.post('/get_available_services', userAuthentication, userController.getAvailableServices)
router.post('/signup', userController.signup)
router.post('/login', userController.login)  
router.get('/getUserDetails/:id', userAuthentication, userController.getUserDetails)
router.post('/addtoCart', userAuthentication, userController.addtoCart)
router.post('/removetoCart', userAuthentication, userController.removetoCart)
router.post('/carts', userAuthentication, userController.userCart)
router.post('/cartDecQty', userAuthentication, userController.cartQtyDec)
router.post('/cartIncQty', userAuthentication, userController.cartQtyInc)
router.patch('/form', userController.userForm)
router.post('/getform', userAuthentication, userController.getUserForm)
router.post('/confirmBooking', userAuthentication, userController.bookingConfirm)
router.post('/dateConfirm', userAuthentication, userController.dateConfirm)
router.post('/getInvoice', userAuthentication, userController.getInvoice)
router.get('/getServiceDetails/:id', userAuthentication, userController.getUserServices)
router.get('/getUserCart/:id', userAuthentication, userController.getUserCart)
router.post('/getInvoiceDet/:id', userAuthentication, userController.getInvoiceDetails) 
router.get('/CartFind', userAuthentication, userController.getCart) 

module.exports = router; 