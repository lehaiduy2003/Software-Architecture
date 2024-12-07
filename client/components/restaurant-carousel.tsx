import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";

const FeaturedRestaurants = () => {
  const restaurants = [
    {
      id: 1,
      name: "Tasty Bites",
      cuisine: "Italian",
      image: "/images/restaurant.jpg",
      description: "Authentic Italian cuisine in a cozy setting",
    },
    {
      id: 2,
      name: "Spice House",
      cuisine: "Indian",
      image: "/images/restaurant.jpg",
      description: "Authentic Indian spices and flavors",
    },
    {
      id: 3,
      name: "Green Leaf",
      cuisine: "Vegetarian",
      image: "/images/restaurant.jpg",
      description: "Fresh and healthy vegetarian options",
    },
    {
      id: 4,
      name: "Green Leaf",
      cuisine: "Vegetarian",
      image: "/images/restaurant.jpg",
      description: "Fresh and healthy vegetarian options",
    },
    {
      id: 5,
      name: "Green Leaf",
      cuisine: "Vegetarian",
      image: "/images/restaurant.jpg",
      description: "Fresh and healthy vegetarian options",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Featured Restaurants
      </h2>
      <Carousel className="w-full">
        <CarouselContent>
          {restaurants.map((restaurant) => (
            <CarouselItem
              key={restaurant.id}
              className="md:basis-1/2 lg:basis-1/3 bg-[#f1f1f1] rounded-t-2xl"
            >
              <Card className="h-full">
                <div className="relative w-full h-48 mb-4 overflow-hidden">
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-full h-full object-cover rounded-t-2xl"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="text-xl font-semibold">{restaurant.name}</h3>
                  <p className="text-muted-foreground">
                    {restaurant.cuisine} Cuisine
                  </p>
                  <p className="mt-2 text-sm">{restaurant.description}</p>
                  <Button className="mt-4 w-full font-bold">View Restaurant</Button>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default FeaturedRestaurants;
