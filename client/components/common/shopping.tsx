"use client"

import useCartStore from '@/app/stores/cart-store';
import { ShoppingCart } from 'lucide-react';
import React from 'react'

const Shopping = () => {
   const { cart } = useCartStore();

  return (
    <a href="/order">
      <div className="relative">
        <button className="text-gray-600 hover:text-gray-800 relative">
          <ShoppingCart className="w-6 h-6 text-white" />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            {cart.length}
          </span>
        </button>
      </div>
    </a>
  );
}

export default Shopping
