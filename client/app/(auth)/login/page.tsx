"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

import { useForm } from "react-hook-form";

const SignInPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [error, setError] = useState("");
  const router = useRouter();

  const onSubmit = async (data: any) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/general/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      }
    );

    const loginData = await response.json();

    console.log(loginData);
    
    if (loginData.error) {
      setError(loginData.error);
      return;
    }else{
      setError("");
      router.push("/");
    }
  };

  return (
    <>
      <title>Login</title>
      <form
        className="w-full max-w-sm space-y-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="email"
          >
            Phone
          </label>
          <input
            id="phone"
            {...register("phoneNumber", {
              required: "Phone is required",
              pattern: {
                value: /^[0-9\b]+$/,
                message: "Phone must be number",
              },
            })}
            placeholder="032xxxxxxx"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.phoneNumber && (
            <p className="text-red-500 text-sm mt-1">Phone Invalid</p>
          )}
        </div>

        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 8 characters",
              },
            })}
            placeholder="At least 8 characters"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              Password at least 8 character
            </p>
          )}
        </div>

        <div className="text-right">
          <a
            href="#"
            className="text-blue-500 text-sm hover:underline font-bold"
          >
            Forgot Password?
          </a>
        </div>

        <button
          type="submit"
          className="w-full bg-dark-gray text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Sign in
        </button>
        {error && <p className="text-red-500 text-center text-sm mt-1">{error}</p>}
      </form>
    </>
  );
};

export default SignInPage;
