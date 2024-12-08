"use client"
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Minus, Plus, Trash2 } from 'lucide-react';
import React  from 'react'

const initialFoodItems = [
  {
    id: 1,
    name: "Phở Hà Nội",
    price: "45000",
    quantity: 1,
    image: "/api/placeholder/100/100",
  },
  {
    id: 2,
    name: "Bánh Mì Đặc Biệt",
    price: "25000",
    quantity: 2,
    image: "/api/placeholder/100/100",
  },
  {
    id: 2,
    name: "Bánh Mì Đặc Biệt",
    price: "25000",
    quantity: 2,
    image: "/api/placeholder/100/100",
  },
];


const OrderList = () => {

    const incrementQuantity = (id: number) => {
      
    };

    // Giảm số lượng món ăn
    const decrementQuantity = (id: number) => {
      
    };

    const removeItem = (id: number) => {
      
    };

  return (
    <div className="w-2/3 bg-white rounded-lg shadow-md">
      <ScrollArea className="h-[500px] w-full">
        {initialFoodItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center p-4 border-b hover:bg-gray-50 transition-colors"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-20 object-cover rounded-md mr-4"
            />
            <div className="flex-grow">
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="text-gray-500">{item.price.toLocaleString()}đ</p>
            </div>

            {/* Điều khiển số lượng */}
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => decrementQuantity(item.id)}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="font-medium">{item.quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => incrementQuantity(item.id)}
              >
                <Plus className="h-4 w-4" />
              </Button>

              <Button
                variant="destructive"
                size="icon"
                onClick={() => removeItem(item.id)}
                className="ml-2"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </ScrollArea>
    </div>
  );
}

export default OrderList