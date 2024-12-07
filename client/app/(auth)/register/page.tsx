"use client";
import React from "react";
import { useForm } from "react-hook-form";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-sm space-y-4"
    >
      <div>
        <label
          className="block text-sm font-medium text-gray-700"
          htmlFor="email"
        >
          Phone
        </label>
        <input
          id="email"
          {...register("phone", {
            required: "Phone is required",
            pattern: {
              value: /^[0-9\b]+$/,
              message: "Phone must be number",
            },
          })}
          placeholder="032xxxxxxx"
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.phone && (
          <p className="text-red-500 text-sm mt-1">Phone Invalid</p>
        )}
      </div>

      <div>
        <label
          className="block text-sm font-medium text-gray-700"
          htmlFor="fullname"
        >
          Full Name
        </label>
        <input
          type="text"
          id="password"
          placeholder="John Smith"
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
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
          placeholder="At least 8 characters"
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label
          className="block text-sm font-medium text-gray-700"
          htmlFor="password"
        >
          Retry Password
        </label>
        <input
          type="password"
          id="password"
          placeholder="At least 8 characters"
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-dark-gray text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Sign in
      </button>
    </form>
  );
};

export default Register;
