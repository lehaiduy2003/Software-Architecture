"use client";
import React, { useEffect, useState } from "react";
import { useStripe } from "@stripe/react-stripe-js";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import useCartStore from "@/app/stores/cart-store";

const SuccessIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1.25628 1.25628C1.59799 0.914573 2.15201 0.914573 2.49372 1.25628L8 6.76256L13.5063 1.25628C13.848 0.914573 14.402 0.914573 14.7437 1.25628C15.0854 1.59799 15.0854 2.15201 14.7437 2.49372L9.23744 8L14.7437 13.5063C15.0854 13.848 15.0854 14.402 14.7437 14.7437C14.402 15.0854 13.848 15.0854 13.5063 14.7437L8 9.23744L2.49372 14.7437C2.15201 15.0854 1.59799 15.0854 1.25628 14.7437C0.914573 14.402 0.914573 13.848 1.25628 13.5063L6.76256 8L1.25628 2.49372C0.914573 2.15201 0.914573 1.59799 1.25628 1.25628Z"
      fill="white"
    />
  </svg>
);

const ProcessingIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8" cy="8" r="7" stroke="orange" strokeWidth="2" />
  </svg>
);

const ErrorIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0ZM7 4C7 3.44772 7.44772 3 8 3C8.55228 3 9 3.44772 9 4V8C9 8.55228 8.55228 9 8 9C7.44772 9 7 8.55228 7 8V4ZM8 11C7.44772 11 7 11.4477 7 12C7 12.5523 7.44772 13 8 13C8.55228 13 9 12.5523 9 12C9 11.4477 8.55228 11 8 11Z"
      fill="red"
    />
  </svg>
);

const CanceledIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0ZM10.8284 5.17157C11.2189 4.78105 11.2189 4.14889 10.8284 3.75836C10.4379 3.36784 9.80574 3.36784 9.41521 3.75836L8 5.17357L6.58479 3.75836C6.19427 3.36784 5.5621 3.36784 5.17157 3.75836C4.78105 4.14889 4.78105 4.78105 5.17157 5.17157L6.58679 6.58679L5.17157 8.00201C4.78105 8.39253 4.78105 9.02469 5.17157 9.41521C5.5621 9.80574 6.19427 9.80574 6.58479 9.41521L8 8L9.41521 9.41521C9.80574 9.80574 10.4379 9.80574 10.8284 9.41521C11.2189 9.02469 11.2189 8.39253 10.8284 8.00201L9.41321 6.58679L10.8284 5.17157Z"
      fill="grey"
    />
  </svg>
);

const DefaultIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8" cy="8" r="8" fill="grey" />
  </svg>
);

type PaymentStatus =
  | "succeeded"
  | "processing"
  | "requires_payment_method"
  | "canceled"
  | "default";

const STATUS_CONTENT_MAP: Record<
  PaymentStatus,
  { text: string; iconColor: string; icon: JSX.Element }
> = {
  succeeded: { text: "Payment succeeded", iconColor: "green", icon: <SuccessIcon /> },
  processing: { text: "Processing payment", iconColor: "orange", icon: <ProcessingIcon /> },
  requires_payment_method: {
    text: "Payment requires a method",
    iconColor: "red",
    icon: <ErrorIcon />,
  },
  canceled: { text: "Payment canceled", iconColor: "grey", icon: <CanceledIcon /> },
  default: { text: "Unknown status", iconColor: "grey", icon: <DefaultIcon /> },
};

export default function CompletePage() {
  const stripe = useStripe();

  const [status, setStatus] = useState<PaymentStatus>("default");
  const [intentId, setIntentId] = useState<string | null>(null);
  const [hasFetched, setHasFetched] = useState(false);

  const { clearCart, cart } = useCartStore();

  const searchParams = useSearchParams();

  console.log("CompletePage rendered");

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = searchParams.get("payment_intent_client_secret");

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      if (!paymentIntent) {
        return;
      }

      setStatus(paymentIntent.status as PaymentStatus);
      setIntentId(paymentIntent.id);
    });
  }, [stripe]);

  useEffect(() => {
    if (status === "succeeded" && !hasFetched) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          foods: cart,
          paymentMethod: "CARD",
          paymentStatus: "PAID",
          restaurantId: "a61f26df-9b45-4764-9075-23efce13d259",
        }),
      })
        .then(() => {
          clearCart();
          setHasFetched(true); // Set hasFetched to true after successful fetch
        })
        .catch((error) => {
          console.error("Error while creating order:", error);
        });
    }
  }, [status, hasFetched, cart, clearCart]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div
        id="status-icon"
        className={`p-4 rounded-full ${
          STATUS_CONTENT_MAP[status].iconColor === "green"
            ? "bg-green-500"
            : STATUS_CONTENT_MAP[status].iconColor === "orange"
            ? "bg-orange-500"
            : STATUS_CONTENT_MAP[status].iconColor === "red"
            ? "bg-red-500"
            : "bg-gray-500"
        }`}
      >
        {STATUS_CONTENT_MAP[status].icon}
      </div>
      <h2 className="mt-4 text-xl font-semibold text-gray-900">
        {STATUS_CONTENT_MAP[status].text}
      </h2>
      {intentId && (
        <div className="mt-6">
          <table className="min-w-full border-separate border-spacing-2">
            <tbody>
              <tr>
                <td className="font-semibold">id</td>
                <td className="text-gray-700">{intentId}</td>
              </tr>
              <tr>
                <td className="font-semibold">status</td>
                <td className="text-gray-700">{status}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
      <Link href="/">Return to home</Link>
    </div>
  );
}
