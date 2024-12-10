import { cookies } from "next/headers";
import { Button } from "../ui/button";
import { logout } from "@/app/action";
import Shopping from "./shopping";

const Header = () => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  return (
    <header className="fixed top-0 left-0 right-0 z-50 shadow-sm py-4 bg-[#1A202C]">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="flex items-center">
          <img
            src="/logos/system-logo.webp"
            alt="Company Logo"
            className="h-8 mr-4 bg-transparent"
          />
          <span className="text-lg font-bold text-white">Food Delivery</span>
        </div>
        <nav className="flex items-center space-x-4">
          <a href="/" className="text-white font-bold hover:underline">
            Home
          </a>
          <a href="/#" className="text-white font-bold hover:underline">
            Restaurants
          </a>
          <a href="#" className="text-white font-bold hover:underline">
            Food
          </a>
          <a href="#" className="text-white font-bold hover:underline">
            About
          </a>
          <Shopping />
          {accessToken ? (
            <form action={logout}>
              <Button
                type="submit"
                className="bg-[#FF6347] text-white font-bold hover:bg-[#7b5048]"
              >
                Logout
              </Button>
            </form>
          ) : (
            <a href="/login">
              <Button className="bg-[#FF6347] text-white font-bold hover:bg-[#7b5048]">
                Login
              </Button>
            </a>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
