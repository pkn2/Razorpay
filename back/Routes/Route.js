const express = require("express");

const paymentControler = require("../Controllers/Payment");

const router = express.Router();

router.post("/pay", paymentControler.razorpay);

module.exports = router;
