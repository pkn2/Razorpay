const Razorpay = require("razorpay");

var instance = new Razorpay({
  key_id: "AAAAABBBBBBBB",
  key_secret: "AAAAAAABBBCCCCCC",
});

exports.razorpay = (req, res) => {
  const pay = req.body.pay;

  instance.orders
    .create({
      amount: pay,
      currency: "INR",
      receipt: Date.now().toString(),
      notes: {
        key1: "value3",
        key2: "value2",
      },
    })
    .then((result) => {
      res.status(200).json({
        message: "Done",
        orderdetails: result,
      });
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
};
