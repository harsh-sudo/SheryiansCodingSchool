//razorpay
const Razorpay = require('razorpay'); // import razorpay
const razorpayInstance = new Razorpay({
    key_id: 'rzp_test_HysbsaSqSaFLE1',
    key_secret: 'JvVplKEZ47gl2iWh7NqbblCc'
});

module.exports.getPaymentPortal = (req, res) => {
    res.render('PaymentPortal', {
        title: 'Payment Portal'
    });
}

module.exports.checkOut = (req, res) => {
    var options = {
        amount: req.body.amount,  // amount in the smallest currency unit
        currency: "INR",
        receipt: "order_rcptid_11"
      };
      razorpayInstance.orders.create(options, function(err, order) {
        // console.log(order);
        res.send({orderId:order.id});
      });
} 