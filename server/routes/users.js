const express = require('express');
const { response } = require('../app');
const router = express.Router();
const userController = require('../controllers/userController')
const userAuthentication = require('../controllers/userAuthentication')
const app = require('../app')


router.post('/signup', userController.signup)
router.post('/login', userController.login) 

router.use(userAuthentication)
router.post('/get_available_services', userController.getAvailableServices)
router.get('/getUserDetails/:id', userController.getUserDetails)
router.post('/addtoCart', userController.addtoCart)
router.post('/removetoCart', userController.removetoCart)
router.post('/carts', userController.userCart)
router.post('/cartDecQty', userController.cartQtyDec)
router.post('/cartIncQty', userController.cartQtyInc)
router.post('/form', userController.userForm)
router.post('/getform', userController.getUserForm)
router.post('/confirmBooking', userController.bookingConfirm)
router.post('/dateConfirm', userController.dateConfirm)
router.post('/getInvoice', userController.getInvoice)
router.get('/getServiceDetails/:id', userController.getUserServices)
router.get('/getUserCart/:id', userController.getUserCart)
router.post('/getInvoiceDet/:id', userController.getInvoiceDetails) 
router.get('/CartFind', userController.getCart) 

module.exports = router; 