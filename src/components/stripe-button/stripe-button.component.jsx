import React from "react";
import StripeCheckout from "react-stripe-checkout";
import { CONFIG } from "../../config";

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishKey = CONFIG.publishKey;

    const onToken = token => {
        console.log(token);
        alert("Payment Successful");
    };

    return (
        <StripeCheckout
            name="Crown Clothing Ltd." // the pop-in header title
            image="https://svgshare.com/i/CUz.svg" // the pop-in header image (default none)
            label="Pay now" // text inside the Stripe button
            panelLabel="PAy Now" // prepended to the amount in the bottom pay button
            amount={priceForStripe} // cents
            currency="USD"
            stripeKey={publishKey}
            shippingAddress
            billingAddress
            // Note: enabling both zipCode checks and billing or shipping address will
            // cause zipCheck to be pulled from billing address (set to shipping if none provided).
            token={onToken} // submit callback
        />
    );
};

export default StripeCheckoutButton;
