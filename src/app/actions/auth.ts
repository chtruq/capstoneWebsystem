"use server";
import apiClient from "@/app/actions/apiClient";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const handleLogin = async (email: string, password: string) => {
  try {
    const response = await apiClient.post("/auth/login", {
      email: email,
      password: password,
    });
    const data = await response.data;
    const token = data.data.token;
    const cookieStore = await cookies();

    if (token) {
      // Save the token securely (e.g., in localStorage or cookies)
      cookieStore.set("token", token, { secure: true, sameSite: "strict" });
      // localStorage.setItem("token", token);

      // Decode the token to get role data
      const decoded = jwtDecode<{
        sub: string;
        [key: string]: any;
      }>(token);

      // Access role with bracket notation
      const role =
        decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      console.log(role); // Outputs: Admin (or the relevant role)
      if (role === "Admin") {
        redirect("/admin/dashboard");
      } else if (role === "Management") {
        redirect("/manager/dashboard");
      } else if (role === "Staff") {
        redirect("/staff/dashboard");
      }
    }

    return data.data;
  } catch (e) {
    throw e;
  }
};

export const handleLogout = async () => {
  (await cookies()).delete("token");
  redirect("/auth/signin");
};
