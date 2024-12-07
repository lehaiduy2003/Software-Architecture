import React from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, Home } from "lucide-react";
import Link from "next/link";

const UnauthorizedPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md w-full space-y-6">
        <div className="flex justify-center mb-4">
          <AlertCircle className="text-red-500 w-16 h-16" />
        </div>

        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-3">
            Access denied
          </h1>
          <p className="text-gray-600 mb-6">
            You don't have permission to access this page
          </p>
        </div>

        <div className="space-y-4">
          <Link href="/">
            <Button variant="outline" className="w-full">
              <Home className="mr-2 h-4 w-4" />
              Back to home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
