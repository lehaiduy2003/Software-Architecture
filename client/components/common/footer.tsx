const FooterSection = () => {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <img src="/logo.svg" alt="Company Logo" className="h-8 mr-4" />
          <span className="text-lg font-bold">Food Delivery</span>
        </div>
        <nav className="space-x-4">
          <a href="#" className="text-gray-400 hover:text-white">
            Home
          </a>
          <a href="#" className="text-gray-400 hover:text-white">
            Restaurants
          </a>
          <a href="#" className="text-gray-400 hover:text-white">
            Menu
          </a>
          <a href="#" className="text-gray-400 hover:text-white">
            About
          </a>
        </nav>
      </div>
    </footer>
  );
};

export default FooterSection;
