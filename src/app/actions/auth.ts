import apiClient from "@/app/actions/apiClient";
import { jwtDecode } from "jwt-decode";

export const handleLogin = async (email: string, password: string) => {
  try {
    const response = await apiClient.post("/auth/login", {
      email: email,
      password: password,
    });
    const data = await response.data;
    const token = data.data.token;

    if (token) {
      // Save the token securely (e.g., in localStorage or cookies)
      localStorage.setItem("token", token);

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
        // Redirect to admin dashboard
        window.location.href = "/admin/dashboard";
      } else {
        // Redirect to user dashboard
        window.location.href = "/user/dashboard";
      }
    }

    return data.data;
  } catch (e) {
    throw e;
  }
};
