import { Button } from "./ui/button";

const HeroSection = () => {
  return (
    <div className="relative w-full h-[500px] bg-cover bg-center rounded-lg object-cover bg-heroImg">
      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
        <div className="text-center text-white max-w-2xl p-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Discover Delicious Dining
          </h1>
          <p className="text-xl mb-6">
            Explore the best restaurants in town and enjoy amazing cuisines
          </p>
          <div className="flex justify-center space-x-4">
            <Button className="bg-[#FF6347] font-bold" variant="default" size="lg">
              Browse Restaurants
            </Button>
            <Button variant="secondary" className="font-bold" size="lg">
              Find Food Nearby
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
