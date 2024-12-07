import { ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 shadow-sm py-4 bg-[#1A202C]">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="flex items-center">
          <img
            src="/images/system-logo.png"
            alt="Company Logo"
            className="h-8 mr-4"
          />
          <span className="text-lg font-bold text-white">Food Delivery</span>
        </div>
        <nav className="flex items-center space-x-4">
          <a href="/" className="text-white font-bold hover:underline ">
            Home
          </a>
          <a
            href="/restaurants"
            className="text-white font-bold hover:underline"
          >
            Restaurants
          </a>
          <a href="#" className="text-white font-bold hover:underline">
            Food
          </a>
          <a href="#" className="text-white font-bold hover:underline">
            About
          </a>
          <div className="relative">
            <button className="text-gray-600 hover:text-gray-800 relative">
              <ShoppingCart className="w-6 h-6 text-white" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                0
              </span>
            </button>
          </div>
          <a href="/login">
            <Button className="bg-[#FF6347] text-white font-bold hover:bg-[#7b5048]">
              Login
            </Button>
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
