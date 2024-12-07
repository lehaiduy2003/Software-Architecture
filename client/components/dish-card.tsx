import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

const FeaturedDishes = () => {
  const dishes = [
    {
      id: 1,
      name: "Margherita Pizza",
      restaurant: "Tasty Bites",
      image: "/images/food.jpg",
      price: "$12.99",
    },
    {
      id: 21,
      name: "Butter Chicken",
      restaurant: "Spice House",
      image: "/images/food.jpg",
      price: "$15.99",
    },
    {
      id: 34,
      name: "Veggie Bowl",
      restaurant: "Green Leaf",
      image: "/images/food.jpg",
      price: "$10.99",
    },
    {
      id: 33,
      name: "Veggie Bowl",
      restaurant: "Green Leaf",
      image: "/images/food.jpg",
      price: "$10.99",
    },
    {
      id: 32,
      name: "Veggie Bowl",
      restaurant: "Green Leaf",
      image: "/images/food.jpg",
      price: "$10.99",
    },
    {
      id: 31,
      name: "Veggie Bowl",
      restaurant: "Green Leaf",
      image: "/images/food.jpg",
      price: "$10.99",
    },
    {
      id: 67,
      name: "Veggie Bowl",
      restaurant: "Green Leaf",
      image: "/images/food.jpg",
      price: "$10.99",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-8 text-center">Featured Dishes</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {dishes.map((dish) => (
          <Card
            key={dish.id}
            className="rounded-2xl border-t border-l border-r"
          >
            <div className="relative w-full h-48 mb-4 overflow-hidden">
              <img
                src={dish.image}
                alt={dish.name}
                className="w-full h-full object-cover rounded-t-2xl"
              />
            </div>
            <CardContent className="p-4">
              <h3 className="text-xl font-semibold">{dish.name}</h3>
              <p className="text-muted-foreground">From {dish.restaurant}</p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-lg font-bold">{dish.price}</span>
                <Button variant="destructive" className="font-bold">
                  Add to cart
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FeaturedDishes;
