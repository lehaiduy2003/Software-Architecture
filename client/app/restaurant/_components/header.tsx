"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";

export default function RestaurantHeader() {
  return (
    <header className="bg-[#343A40] shadow-md py-2">
      <div className="container mx-auto flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center space-x-4"
        >
          <motion.img
            src="/logos/restaurant-logo.png"
            alt="Logo nhà hàng"
            initial={{ scale: 0.8 }}
            animate={{
              scale: [0.8, 1.05, 1],
              transition: { duration: 0.8 },
            }}
            className="w-20 h-20 object-contain bg-transparent mix-blend-multiply"
          />
          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-3xl text-white font-mono font-bold text-primary"
          >
            Vin Fast Food
          </motion.h1>
        </motion.div>

        <nav className="space-x-4 flex  ">
          <a
            href="/"
            className="text-white font-bold font-sans hover:text-primary transition-colors"
          >
            Home page
          </a>
          <div className="relative">
            <button className="text-gray-600 hover:text-gray-800 relative">
              <ShoppingCart className="w-6 h-6 text-white" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                0
              </span>
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
