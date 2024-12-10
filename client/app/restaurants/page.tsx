"use client"
import React from "react";

import { Button } from "@/components/ui/button";


import RestaurantCard from "./_components/restaurant-card";
import FoodCarousel from "./_components/food-carousel";
import Filter from "./_components/filter";
import Header from "@/components/common/header";
import Footer from "@/components/common/footer";
import { fetchRestaurants } from "../action";

// Mock data - in a real app, this would come from an API


const RestaurantListingsPage = async () => {
  const restaurants = await fetchRestaurants(1, 6);

  return (
    <div className="mt-20">
      <Header />
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Featured Food Carousel */}
        <FoodCarousel />

        {/* Search and Filters */}
        <Filter />

        {/* Restaurant Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurants.map((restaurant: any) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-8 space-x-2">
          <Button variant="outline">Previous</Button>
          <Button>Next</Button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RestaurantListingsPage;
