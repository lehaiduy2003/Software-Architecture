"use client";
import useCartStore from "@/app/stores/cart-store";
import { useState } from "react";
import CustomDialog from "./common/dialog";

const AddToCart = ({ food, accessToken }: any) => {
  const { addToCart, restaurantId, clearCart } = useCartStore();
  const [isOpen, setOpen] = useState(false);
  const [type, setType] = useState<"cart" | "auth">("cart");
  const [message, setMessage] = useState("");

  const handleAddToCart = (food: any) => {
    if (!accessToken) {
      setOpen(true);
      setType("auth");
      setMessage("Please login to add food to cart");
      return;
    }
    if (restaurantId !== null && food.restaurantId !== restaurantId) {
      setOpen(true);
      setType("cart");
      setMessage(
        "You have items from another restaurant in your cart. Do you want to clear the cart and add the new item?"
      );
      return;
    }
    addToCart(food);
  };

  const onConfirm = () => {
    if (type === "cart") {
      clearCart();
      addToCart(food);
    }
    setOpen(false);
  };

  const onCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <button
        className="font-bold bg-red-500 text-white px-4 py-2 rounded"
        onClick={() => handleAddToCart(food)}
      >
        Add to Cart
      </button>
      <CustomDialog
        isOpen={isOpen}
        type={type}
        message={message}
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
    </>
  );
};

export default AddToCart;
