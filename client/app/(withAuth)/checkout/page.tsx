"use client";
import useCartStore from "@/app/stores/cart-store";
import React, { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { Appearance } from "@stripe/stripe-js";
import CompletePage from "./components/complete";
import CheckoutForm from "./components/checkout-form";
import { useSearchParams } from "next/navigation";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK as string);

const Checkout = () => {
  const { cart } = useCartStore();
  const [clientSecret, setClientSecret] = React.useState("");
  const searchParams = useSearchParams();
  const paymentIntentClientSecret = searchParams.get("payment_intent_client_secret");

  useEffect(() => {
    if (paymentIntentClientSecret) {
      setClientSecret(paymentIntentClientSecret);
      return;
    }
    console.log("fetching client secret");

    const fetchClientSecret = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/general/stripe/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ foods: cart }),
      });
      const clientSecret = await response.json();
      console.log(clientSecret);

      setClientSecret(clientSecret);
    };

    fetchClientSecret();
  }, []);

  const appearance: Appearance = {
    theme: "stripe",
    variables: {
      colorPrimary: "#1a1c3c",
      colorText: "#000000",
    },
  };

  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="font-sans text-base antialiased flex items-center flex-col h-screen w-screen">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          {paymentIntentClientSecret ? (
            <CompletePage />
          ) : (
            <>
              <h1 className="text-3xl font-bold mt-10">Finish Your Payment</h1>
              <CheckoutForm />
            </>
          )}
        </Elements>
      )}
    </div>
  );
};

export default Checkout;
