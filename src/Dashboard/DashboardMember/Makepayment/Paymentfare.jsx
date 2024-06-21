import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function Paymentfare() {

    const location = useLocation();
    const [month, setMonth] = useState('');
    const [finalRent, setFinalRent] = useState(0);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const monthParam = searchParams.get('month') || '';
        const finalRentParam = parseFloat(searchParams.get('finalRent')) || 0;

        setMonth(monthParam);
        setFinalRent(finalRentParam);
    }, [location.search]);


    const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GETWAY_PK);
    return (
        <div>
            <Elements stripe={stripePromise}>
                <CheckoutForm month={month} finalRent={finalRent}  />
            </Elements>

        </div>
    );
}

export default Paymentfare;