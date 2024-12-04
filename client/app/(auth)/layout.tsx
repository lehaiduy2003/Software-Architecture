import React from "react";
import Image from "next/image";
import Link from "next/link";

import FacebookIcon from "@/components/icon/facebook-icon";
import GoogleIcon from "@/components/icon/google-icon";
import { Button } from "@/components/ui/button";


export function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white">
      {/* Left Section */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 md:px-12">
        <div className="">
          <h1 className="text-3xl mt-3 font-semibold mb-6 font-serif">
            Food Order Management
          </h1>
        </div>
        {children}
        <div className="mt-6 text-center w-full max-w-96">
          <p className="text-gray-500 text-sm">Or</p>
          <div className="flex flex-col space-y-4 mt-4">
            <Button className="flex items-center justify-center h-full w-full px-4 py-2  bg-light-aqua text-black hover:bg-light-gray font-medium font-sans">
              <GoogleIcon width={29} height={29} className="pr-5" />
              Sign in with Google
            </Button>
            <Button className="flex items-center justify-center h-full w-full px-4 py-2  bg-light-aqua text-black hover:bg-light-gray font-medium font-sans">
              <FacebookIcon width={29} height={29} className=" pl-4 pr-5" />
              Sign in with Facebook
            </Button>
          </div>
        </div>

        <p className="mt-20 text-base text-gray-500">
          Don’t have an account?{" "}
          <Link
            href={"/register"}
            className="text-blue-500 hover:underline font-bold"
          >
            Sign up
          </Link>
        </p>
      </div>

      {/* Right Section */}
      <div className="flex-1 hidden md:flex justify-center items-center">
        <Image
          width={1500}
          height={1500}
          src={"/images/bg-login.png"}
          className="max-w-full max-h-ful h-full object-cover rounded-l-3xl round"
          alt=""
        />
      </div>
    </div>
  );
}

export default AuthLayout;
