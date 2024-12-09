import { Button } from "@/components/ui/button";
import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { StripeError } from "@stripe/stripe-js";
import React from "react";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [error, setError] = React.useState<StripeError>();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/checkout",
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      console.log("Payment failed", error);
      setError(error);
    } else {
      console.log("Payment error", error);
    }
    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "accordion" as const,
  };

  return (
    <form
      className="w-[30vw] min-w-[500px] self-center shadow-[0_0_0_0.5px_rgba(50,50,93,0.1),0_2px_5px_0px_rgba(50,50,93,0.1),0_1px_1.5px_0px_rgba(0,0,0,0.07)] rounded-lg p-10 my-auto"
      onSubmit={handleSubmit}
    >
      <PaymentElement options={paymentElementOptions} />
      <Button className="w-full mt-4" variant="default" disabled={!stripe}>
        {isLoading ? "Loading..." : "Pay"}
      </Button>
      {/* Show any error or success messages */}
      {error && <div id="payment-Error">{error.message}</div>}
    </form>
  );
};

export default CheckoutForm;
