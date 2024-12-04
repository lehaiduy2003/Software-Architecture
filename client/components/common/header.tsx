import { Button } from "../ui/button";

const Header = () => {
  return (
    <header className="bg-white shadow-sm py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="flex items-center">
          <img src="/images/system-logo.png" alt="Company Logo" className="h-8 mr-4" />
          <span className="text-lg font-bold">Food Delivery</span>
        </div>
        <nav className="space-x-4">
          <a href="#" className="text-gray-600 hover:text-gray-800">
            Home
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-800">
            Restaurants
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-800">
            Menu
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-800">
            About
          </a>
          <Button variant="default">Login</Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
