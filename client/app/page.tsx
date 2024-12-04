import React from "react";
import Header from "@/components/common/header";
import FooterSection from "@/components/common/footer";
import HeroSection from "@/components/hero-section";
import FeaturedRestaurants from "@/components/restaurant-carousel";
import FeaturedDishes from "@/components/dish-card";


export default function FoodLandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <HeroSection />
      <FeaturedRestaurants />
      <FeaturedDishes />
      <FooterSection />
    </div>
  );
}
