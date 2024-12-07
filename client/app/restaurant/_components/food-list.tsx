"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const foodCategories = [
  "All",
  "Khai vị",
  "Món chính",
  "Tráng miệng",
  "Đồ uống",
];
const foods = [
  {
    id: 1,
    name: "Gỏi cuốn",
    price: "35000",
    category: "Khai vị",
    image: "/images/food.jpg",
    description: "Gỏi cuốn tươi mát với tôm tươi",
  },
  {
    id: 2,
    name: "Phở bò",
    price: "65000",
    category: "Món chính",
    image: "/images/food.jpg",
    description: "Phở bò truyền thống với nước dùng đậm đà",
  },
  {
    id: 3,
    name: "Phở bò",
    price: "65000",
    category: "Món chính",
    image: "/images/food.jpg",
    description: "Phở bò truyền thống với nước dùng đậm đà",
  },
  {
    id: 4,
    name: "Phở bò",
    price: "65000",
    category: "Món chính",
    image: "/images/food.jpg",
    description: "Phở bò truyền thống với nước dùng đậm đà",
  },
  {
    id: 5,
    name: "Phở bò",
    price: "65000",
    category: "Món chính",
    image: "/images/food.jpg",
    description: "Phở bò truyền thống với nước dùng đậm đà",
  },
  {
    id: 6,
    name: "Phở bò",
    price: "65000",
    category: "Món chính",
    image: "/images/food.jpg",
    description: "Phở bò truyền thống với nước dùng đậm đà",
  },
  // Thêm các món ăn khác
];



export default function FoodList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");

  const filteredFoods = foods.filter(
    (food) =>
      food.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === "Tất cả" || food.category === selectedCategory)
  );

  return (
    <div className="container mx-auto p-4">
      <div className="flex space-x-4 mb-6">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="relative flex-grow"
        >
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search food"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </motion.div>

        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Chọn danh mục" />
            </SelectTrigger>
            <SelectContent>
              {foodCategories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </motion.div>
      </div>

      <AnimatePresence>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredFoods.map((food, index) => (
            <motion.div
              key={food.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{
                delay: index * 0.1, // Tạo hiệu ứng cascading
                duration: 0.3,
              }}
              whileHover={{
                scale: 1.05, // Hiệu ứng phóng to khi hover
                transition: { duration: 0.2 },
              }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="relative overflow-hidden">
                <img
                  src={food.image}
                  alt={food.name}
                  className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2 text-[#212529]">
                  {food.name}
                </h3>
                <p className="text-[#6C757D] mb-4">{food.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-primary">
                    {food.price.toLocaleString()} VNĐ
                  </span>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ scale: 1.05 }}
                    className="bg-[#007BFF] text-white font-bold px-4 py-2 rounded-md hover:bg-[#0056b3] transition-colors"
                  >
                    Add to cart
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="flex justify-center mt-8 space-x-2">
          <Button variant="outline" className="font-bold">Previous</Button>
          <Button className="font-bold">Next</Button>
        </div>
      </AnimatePresence>
    </div>
  );
}
