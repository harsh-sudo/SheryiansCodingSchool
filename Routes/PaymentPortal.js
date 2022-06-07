const express = require('express'); // import express
const router = express.Router(); // create express router
const PaymentPortal_controller = require('../Controllers/PaymentPortal_controller.js'); // import payment portal controller



router.get('/:id', PaymentPortal_controller.getPaymentPortal); // get payment portal
router.post('/checkOut', PaymentPortal_controller.checkOut); // make payment

module.exports = router; // export router 