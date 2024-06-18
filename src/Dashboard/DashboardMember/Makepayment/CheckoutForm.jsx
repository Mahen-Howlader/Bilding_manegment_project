import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosCommon from "../../../Hooks/useAxiosCommon";
import useAuth from "../../../Hooks/useAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function CheckoutForm({ month, finalRent }) {
    const { user } = useAuth()
    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState('')
    const [transactionId, setTransactionId] = useState('')
    const navigate = useNavigate()
    const [error, setError] = useState()
    const axiosCommon = useAxiosCommon()
    console.log(finalRent)

    useEffect(() => {
        if (finalRent > 0) {
            axiosCommon
                .post("/create-payment-intent", { price: finalRent })
                .then((res) => {
                    console.log(res.data)
                    setClientSecret(res.data.clientSecret);
                });
        }
    }, [axiosCommon, finalRent]);

    const handleSubmit = async (event) => {
        // Block native form submission.
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('[error]', error);
            setError(error?.message)
        } else {
            console.log('[PaymentMethod]', paymentMethod);
            setError("")
        }

        // confirm card payment 
        const { paymentIntent, error: cardConfirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || "anonymous",
                    name: user?.displayName || "anonymous"
                }
            }
        })
        if (cardConfirmError) {
            toast.error("confirm valid account code")
        }
        else {
            console.log("payment intent", paymentIntent)
            if (paymentIntent?.status === "succeeded") {
                console.log("Transaction id", paymentIntent?.id)
                setTransactionId(paymentIntent?.id)

                // now save the payment databes 
                const payment = {
                    month,
                    finalRent,
                    email: user?.email,
                    name: user?.displayName,
                    data: new Date(),
                    status: "Pending"
                }
                const { data } = await axiosCommon.post("/paymentHistory", payment);
                console.log(data)
                if (data.insertedId) {
                    toast.success("Payment completed")
                    navigate("/dashboard/paymenthistory")
                } else {
                    toast.error("Payent error")
                }
            }
        }

    };

    return (
        <div className="w-1/2  mx-auto flex flex-col mt-40 lg:mt-52 justify-center">
            <form onSubmit={handleSubmit}>
                <div className="border-2  border-black rounded-lg mb-2 p-3">
                    <CardElement
                        options={{
                            style: {
                                base: {
                                    fontSize: '16px',
                                    color: '#424770',
                                    '::placeholder': {
                                        color: '#aab7c4',
                                    },
                                },
                                invalid: {
                                    color: '#9e2146',
                                },
                            },
                        }}
                    />
                </div>
                <button className="font-bold p-2 rounded-lg w-full bg-red-400" type="submit" disabled={!stripe}>
                    Pay
                </button>
            </form>
            <p className="text-red-500">{error}</p>
            {
                transactionId && <p className="text-green-500 text-center mt-3">Your transaction Id : {transactionId}</p>
            }

        </div>
    );
}

export default CheckoutForm;