"use client";
import React from "react";
import { Button } from "./ui/button";
import useCartStore  from "@/app/stores/cart-store";

const AddToCart = ({food}: any) => {
  const { addToCart } = useCartStore();
  return (
    <Button  variant="destructive" className="font-bold" onClick={() => {
        addToCart(food);
    }}>
      Add to cart
    </Button>
  );
};

export default AddToCart;
