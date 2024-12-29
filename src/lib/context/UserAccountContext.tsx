// /context/UserAccountContext.tsx
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { getUserInforFromCookie } from "@/app/actions/auth"; // Replace with your actual API method

interface UserAccount {
  id: string;
  name: string;
  role: string;
}

interface UserAccountContextProps {
  user: UserAccount | null;
  setUser: React.Dispatch<React.SetStateAction<UserAccount | null>>;
}

const UserAccountContext = createContext<UserAccountContextProps | undefined>(undefined);

export const UserAccountProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserAccount | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUserInforFromCookie();
        // console.log("User data from cookiess:", userData);
        setUser(userData);
      } catch (error) {
        console.error("Failed to load user data", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <UserAccountContext.Provider value={{ user, setUser }}>
      {children}
    </UserAccountContext.Provider>
  );
};

export const useUserAccount = (): UserAccountContextProps => {
  const context = useContext(UserAccountContext);
  // console.log("Contextttt", context?.user);

  if (!context) {
    throw new Error("useUserAccount must be used within a UserAccountProvider");
  }
  return context;
};
