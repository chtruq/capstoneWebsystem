import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";
import { getUserTokenFromCookies } from "@/app/actions/auth";

// Định nghĩa kiểu dữ liệu cho người dùng
interface User {
  id: string;
  sub: string;
  role: string;
  name: string;
}

// Tạo context với giá trị mặc định là null
interface UserContextType {
  user: User | null;
  setUserInfo: (userInfo: User) => void;
}

const UserContext = createContext<UserContextType | null>(null);

// Tạo provider component để cung cấp thông tin người dùng cho các component khác
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const setUserInfo = (userInfo: User) => {
    setUser(userInfo);
  };

  // Lấy token và giải mã khi UserProvider được khởi tạo
  useEffect(() => {
    const userToken = getUserTokenFromCookies();
    if (userToken) {
      try {
        const decoded = jwtDecode<{
          sub: string;
          [key: string]: any;
        }>(userToken.value);

        const role =
          decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
        
        // Thiết lập thông tin người dùng
        setUserInfo({
          id: decoded.id || '',
          sub: decoded.sub,
          role: role || '',
          name: decoded.name || '', // Thay đổi tùy theo payload của JWT
        });
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []); // Chỉ chạy một lần khi component được mount

  return (
    <UserContext.Provider value={{ user, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook để sử dụng thông tin người dùng từ context
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
