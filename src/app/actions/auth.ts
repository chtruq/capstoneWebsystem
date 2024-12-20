"use server";
import apiClient from "@/app/actions/apiClient";
import { de } from "date-fns/locale";
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

      console.log("Decoded token:", decoded);


      // // Access role with bracket notation
      // const userId = decoded.id;
      const role =
        decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      // const name = decoded.name;

      // console.log("User ID:", userId);
      // console.log(role); // Outputs: Admin (or the relevant role)
      // console.log("User Name:", name);

      // // Lưu userId và role vào cookie dưới dạng JSON string
      // const userInfo = JSON.stringify({ id: userId, role, name });
      // cookieStore.set("userInfo", userInfo, {
      //   secure: true,
      //   sameSite: "strict",
      //   path: "/",
      //   httpOnly: false,
      // });

      // console.log("User Info Cookie:", cookieStore.get("userInfo"));


      switch (role) {
        case "Admin":
          redirect("/admin/dashboard");
          break;
        case "Management":
          redirect("/manager/dashboard");
          break;
        case "Staff":
          redirect("/staff/dashboard");
          break;
        case "Seller":
          redirect("/seller/dashboard");
          break;
        case "Project Provider":
          redirect("/provider/dashboard");
          break;
        default:
          // Xử lý nếu role không khớp với bất kỳ case nào
          console.warn("Role không hợp lệ");
          break;
      }

    }

    return data.data;
  } catch (e) {
    throw e;
  }
};

export const handleLogout = async () => {
  (await cookies()).delete("token");
  redirect("/");
};

export const getUserTokenFromCookies = () => {
  const cookieStore = cookies();
  const user = cookieStore.get("token");

  if (user) {
    console.log("User from cookie:", user);
    return user;
  } else {
    console.log("No User found in cookies.");
    return null;
  } ``
};

export const getUserInfoFromCookies = () => {
  const cookieStore = cookies();
  const userInfoCookie = cookieStore.get("userInfo");

  if (userInfoCookie) {
    try {
      // Parse JSON string từ cookie để lấy thông tin user
      const userInfo = JSON.parse(userInfoCookie.value);
      console.log("Decoded User Info from Cookie:", userInfo);
      return userInfo;
    } catch (error) {
      console.error("Error parsing user info cookie:", error);
      return null;
    }
  } else {
    console.log("No User Info found in cookies.");
    return null;
  }
};
export const getUserInforFromCookie = () => {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  console.log("Token from cookieeeee:", token);
  if (token) {
    const decoded = jwtDecode<{
      sub: string;
      [key: string]: any;
    }>(token.value);
    console.log("Decoded token:", decoded);
    const userId = decoded.id;
    const role =
      decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    const name = decoded.name;
    console.log("User ID:", userId);
    console.log(role); // Outputs: Admin (or the relevant role)
    console.log("User Name:", name);

    // Lưu userId và role vào cookie dưới dạng JSON string
    const userInfor = { id: userId, role, name };
    console.log("User Info Cookiaaaaae:", userInfor);
    return userInfor;
  } else {
    console.log("No token found in cookies.");
    return null;
  }
};