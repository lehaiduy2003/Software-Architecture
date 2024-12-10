"use client";
import React, { useEffect, useState } from "react";
import RestaurantHeader from "../_components/header";
import FoodList from "../_components/food-list";
import RestaurantFooter from "../_components/footer";
import { useParams } from "next/navigation";

const Restaurant = () => {
  const params = useParams();
  const id = params.id;
  console.log(`${process.env.NEXT_PUBLIC_API_URL}/general/foods?restaurantId=${id}`);

  const [foods, setFoods] = useState([]);
  useEffect(() => {
    const fetchRestaurantFoods = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/general/foods?restaurantId=${id}`,
        // "http://localhost:8080/general/foods?restaurantId=a61f26df-9b45-4764-9075-23efce13d259",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await response.json();
      setFoods(data);
    };
    fetchRestaurantFoods;
  }, []);

  console.log("Foods:", foods);

  return (
    <div className="bg-[#F8F9FA]">
      <RestaurantHeader />
      <FoodList foods={foods} />
      <RestaurantFooter />
    </div>
  );
};

export default Restaurant;
