//razorpay
require('dotenv').config();
const Razorpay = require('razorpay'); // import razorpay
// const razorpayInstance = new Razorpay({
//     key_id: process.env.RAZORPAY_KEY_ID,
//     key_secret: process.env.RAZORPAY_KEY_SECRET
// });
const courses = require('../Models/Courses.js');

module.exports.getPaymentPortal = (req, res) => {
    courses.findOne({
        _id: req.params.id
    }, (err, course) => {
        if(err){
            console.log(err);
            return;
        }
        
        res.render('PaymentPortal', {
            title: 'Payment Portal',
            course: course
        });
    }
)}


module.exports.checkOut = (req, res) => {
    var options = {
        amount: req.body.amount,  // amount in the smallest currency unit
        currency: "INR",
        receipt: "order_rcptid_11"
      };
      razorpayInstance.orders.create(options, function(err, order) {
        res.send({orderId:order.id});
      });
} 