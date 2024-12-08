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