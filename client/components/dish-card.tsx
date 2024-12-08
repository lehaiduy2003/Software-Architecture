
import { Card, CardContent } from "./ui/card";
import { footFetcher } from "@/app/action";
import AddToCart from "./add-to-cart";

type FoodItem = {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  description: string;
  quantity: number;
};


//Fix sau
const FeaturedDishes = async () => {
  const foods = await footFetcher();

  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-8 text-center">Featured Dishes</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {foods.map((dish: FoodItem) => (
          <Card
            key={dish.id}
            className="rounded-2xl border-t border-l border-r"
          >
            <div className="relative w-full h-48 mb-4 overflow-hidden">
              <img
                src={dish.imageUrl}
                alt={dish.name}
                className="w-full h-full object-cover rounded-t-2xl"
              />
            </div>
            <CardContent className="p-4">
              <h3 className="text-xl font-semibold">{dish.name}</h3>
              <p className="text-muted-foreground">From {dish.description}</p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-lg font-bold text-green-400">{dish.price} VND</span>
                <AddToCart food={dish} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FeaturedDishes;
