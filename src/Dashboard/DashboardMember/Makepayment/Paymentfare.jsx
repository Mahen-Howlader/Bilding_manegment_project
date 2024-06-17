import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

function Paymentfare() {
    const stripePromise = loadStripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh');
    return (
        <div>
            <Elements stripe={stripePromise}>
            <CheckoutForm />
            </Elements>

        </div>
    );
}

export default Paymentfare;