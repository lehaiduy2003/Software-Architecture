import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Star, Clock, ChevronRight } from "lucide-react";
import RestaurantCard from "./_components/restaurant-card";
import FoodCarousel from "./_components/food-carousel";
import Filter from "./_components/filter";
import Header from "@/components/common/header";
import Footer from "@/components/common/footer";

// Mock data - in a real app, this would come from an API

const restaurants = [
  {
    id: 1,
    name: "Delicious Pizza Palace",
    image: "/images/restaurant.jpg",
    rating: 4.5,
    reviewCount: 500,
    isOpen: true,
    promotion: "20% Off First Order",
    cuisine: "Italian",
  },
  {
    id: 2,
    name: "Sushi Master",
    image: "/images/restaurant.jpg",
    rating: 4.8,
    reviewCount: 350,
    isOpen: false,
    promotion: "Weekend Special",
    cuisine: "Japanese",
  },
  {
    id: 3,
    name: "Sushi Master",
    image: "/images/restaurant.jpg",
    rating: 4.8,
    reviewCount: 350,
    isOpen: false,
    promotion: "Weekend Special",
    cuisine: "Japanese",
  },
  {
    id: 4,
    name: "Sushi Master",
    image: "/images/restaurant.jpg",
    rating: 4.8,
    reviewCount: 350,
    isOpen: false,
    promotion: "Weekend Special",
    cuisine: "Japanese",
  },
  {
    id: 5,
    name: "Delicious Pizza Palace",
    image: "/images/restaurant.jpg",
    rating: 4.5,
    reviewCount: 500,
    isOpen: true,
    promotion: "20% Off First Order",
    cuisine: "Italian",
  },
  {
    id: 6,
    name: "Delicious Pizza Palace",
    image: "/images/restaurant.jpg",
    rating: 4.5,
    reviewCount: 500,
    isOpen: true,
    promotion: "20% Off First Order",
    cuisine: "Italian",
  },
  // Add more restaurant mock data
];

const RestaurantListingsPage = () => {
  return (
    <div>
      <Header />
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Featured Food Carousel */}
        <FoodCarousel />

        {/* Search and Filters */}
        <Filter />

        {/* Restaurant Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurants.map((restaurant) => (
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
