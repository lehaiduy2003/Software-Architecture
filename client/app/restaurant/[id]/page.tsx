import React from 'react'
import RestaurantHeader from '../_components/header'
import FoodList from '../_components/food-list'
import RestaurantFooter from '../_components/footer'

const Restaurant = () => {
  return (
    <div className="bg-[#F8F9FA]">
      <RestaurantHeader />
      <FoodList />
      <RestaurantFooter />
    </div>
  );
}

export default Restaurant
