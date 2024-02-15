const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_API_KEY);

router.post("/create-payment-intent", async (req, res) => {
    const { amount } = req.body;

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: "usd",
    });

    res.send({
        clientSecret: paymentIntent.client_secret,
    });
});

module.exports = router;
