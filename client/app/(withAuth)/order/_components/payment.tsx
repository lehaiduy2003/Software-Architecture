import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import React  from "react";

const initialFoodItems = [
  {
    id: 1,
    name: "Phở Hà Nội",
    price: "45000",
    quantity: 1,
    image: "/api/placeholder/100/100",
  },
  {
    id: 2,
    name: "Bánh Mì Đặc Biệt",
    price: "25000",
    quantity: 2,
    image: "/api/placeholder/100/100",
  },
];

const Payment = () => {
  const totalPrice = initialFoodItems.reduce(
    (total, item) => total + Number(item.price) * item.quantity,
    0
  );
  
  return (
    <div className="w-1/3">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Order Details</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Chi tiết từng món */}
          {initialFoodItems.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center mb-2"
            >
              <span>
                {item.name}{" "}
                <span className="text-gray-500">x{item.quantity}</span>
              </span>
              <span>
                {(Number(item.price) * item.quantity).toLocaleString()}đ
              </span>
            </div>
          ))}

          <Separator className="my-4" />

          {/* Tổng tiền */}
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>{totalPrice.toLocaleString()}đ</span>
          </div>

          {/* Nút thanh toán */}
          <Button className="w-full mt-4" variant="default">
            Payment
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Payment;
