import React from "react";
import OrderList from "./_components/order-list";
import Header from "@/components/common/header";
import FooterSection from "@/components/common/footer";
import { Metadata } from "next";
import Payment from "./_components/payment";

export const metadata: Metadata = {
  title: "Order",
  description: "Order Page",
};

export default function FoodOrderPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow flex w-full p-4 space-x-4 mt-12">
        {/* Phần danh sách món ăn (Trái) */}
        <OrderList />

        {/* Phần thanh toán (Phải) */}
        <Payment />
      </div>
      <FooterSection />
    </div>
  );
}
