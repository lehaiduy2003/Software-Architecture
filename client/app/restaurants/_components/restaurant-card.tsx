import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Star } from "lucide-react";

const RestaurantCard = ({ restaurant }: any) => {
  return (
    <Card
      className="w-full 
      transition-all 
      duration-300 
      ease-in-out 
      cursor-pointer 
      hover:scale-105 
      hover:shadow-2xl 
      hover:border-gray-200 
      border 
      border-transparent"
    >
      <div className="relative">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        {restaurant.promotion && (
          <Badge variant="destructive" className="absolute top-2 right-2">
            {restaurant.promotion}
          </Badge>
        )}
      </div>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl">{restaurant.name}</CardTitle>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-500" fill="currentColor" />
            <span>{restaurant.rating}</span>
            <span className="text-gray-500 text-sm">
              ({restaurant.reviewCount})
            </span>
          </div>
        </div>
        <CardDescription className="flex justify-between items-center">
          <span>{restaurant.cuisine}</span>
          <Badge
            variant={restaurant.isOpen ? "default" : "secondary"}
            className={restaurant.isOpen ? "bg-green-500" : "bg-gray-400"}
          >
            {restaurant.isOpen ? "Open" : "Closed"}
          </Badge>
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

export default RestaurantCard;
