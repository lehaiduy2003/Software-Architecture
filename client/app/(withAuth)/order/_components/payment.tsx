"use client";
import useCartStore from "@/app/stores/cart-store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Payment = () => {
  const { cart, getTotalPrice } = useCartStore();

  return (
    <div className="w-1/3">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Order Details</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Chi tiết từng món */}
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between items-center mb-2">
              <span>
                {item.name} <span className="text-gray-500">x{item.quantity}</span>
              </span>
              <span>{(Number(item.price) * item.quantity).toLocaleString()}$</span>
            </div>
          ))}

          <Separator className="my-4" />

          {/* Tổng tiền */}
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>{getTotalPrice().toLocaleString()}$</span>
          </div>

          <Link href="/checkout">
            <Button className="w-full mt-4" variant="default">
              Pay
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default Payment;
