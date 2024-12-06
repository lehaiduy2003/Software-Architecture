"use client"
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const featuredFoodItems = [
  { id: 3, name: "Caesar Salad", image: "/images/food.jpg" },
  { id: 4, name: "Burger Classic", image: "/images/food.jpg" },
  { id: 5, name: "Burger Classic", image: "/images/food.jpg" },
  { id: 6, name: "Burger Classic", image: "/images/food.jpg" },
  { id: 7, name: "Burger Classic", image: "/images/food.jpg" },
  { id: 8, name: "Burger Classic", image: "/images/food.jpg" },
];

function FoodCarousel () {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <Slider {...settings}>
      {featuredFoodItems.map((item) => (
        <div key={item.id} className="pl-4">
          <div className="card">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-40 object-cover rounded-t-lg"
            />
            <div className="card-content p-4">
              <h3>{item.name}</h3>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default FoodCarousel;
