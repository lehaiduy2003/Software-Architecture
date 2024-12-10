import React from "react";
import RestaurantHeader from "../_components/header";
import FoodList from "../_components/food-list";
import RestaurantFooter from "../_components/footer";
import { cookies } from "next/headers";

const fetchRestaurantFoods = async (id: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/general/foods?restaurantId=${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  );
  const data = await response.json();
  return data;
};

const Restaurant = async ({ params }: { params: { id: string } }) => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  // console.log(accessToken);

  const foods = await fetchRestaurantFoods(params.id);

  return (
    <div className="bg-[#F8F9FA]">
      <RestaurantHeader />
      <FoodList foods={foods} accessToken={accessToken} />
      <RestaurantFooter />
    </div>
  );
};

export default Restaurant;
