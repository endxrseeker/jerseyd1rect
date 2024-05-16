// Require the Stripe library with your secret key
const express = require('express');
const app = express();
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc'); // Replace with your Stripe Secret Key

app.use(express.json());

// Route to create a payment intent
app.post('/create-payment-intent', async (req, res) => {
    const { items } = req.body; // Your items array or total amount
    const totalAmount = calculateOrderAmount(items); // Calculate the total order amount on the server

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: totalAmount, // amount in cents
            currency: 'usd',
        });

        res.send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (err) {
        res.status(400).send({
            error: {
                message: err.message,
            }
        });
    }
});

function calculateOrderAmount(items) {
    // Replace this function with logic to calculate the total amount
    return 1400; // Example amount in cents
}

app.listen(4242, () => console.log('Node server listening on port 4242'));
