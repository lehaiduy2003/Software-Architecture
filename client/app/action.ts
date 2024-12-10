import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


//This file used to handle common actions
export async function logout() {
    "use server";
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/general/auth/logout`,
            {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        const logoutData = await response.json();

        if (logoutData.success) {
            cookies().delete("accessToken");
            cookies().delete("refreshToken");
            revalidatePath("/");
        } else {
            throw new Error("Logout failed");
        }
    } catch (error) {
        console.error("Logout error:", error);
        redirect("/login");
    }
}


export const footFetcher = async () => {
    'use server'
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/general/restaurants/best-seller/a61f26df-9b45-4764-9075-23efce13d259`
    );

    const foods = await response.json()

    return foods.data;
}

export const restaurantFetcher = async () => {
    'use server'
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/general/restaurants/top10`
    );

    const restaurants = await response.json()

    return restaurants.data;
}

export const fetchRestaurants = async (page: number, pageSize: number) => {
    'use server'
    const response = await fetch(
        `http://localhost:8080/general/restaurants/all?page=${page}&pageSize=${pageSize}`
    );
    const result = await response.json();
    return result.data;
}
