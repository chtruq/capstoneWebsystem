"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Home, Settings, User } from "lucide-react";
import { Button } from "../ui/button";
import Applogo from "@public/icon/applogo";
import { usePathname } from "next/navigation";
export function AppSidebar() {
  const pathname = usePathname();
  const items = [
    {
      title: "Tổng quan",
      url: "/admin/dashboard",
      icon: Home,
    },
    {
      title: "Quản lý tài khoản",
      url: "/admin/dashboard/user-manage",
      icon: User,
    },
    {
      title: "Danh sách yêu cầu",
      url: "/admin/dashboard/request-manage",
      icon: Home,
    },
    {
      title: "Quản lý căn hộ",
      url: "/admin/dashboard/apartment-manage",
      icon: Home,
    },
    {
      title: "Quản lý dự án",
      url: "/admin/dashboard/project-manage",
      icon: Home,
    },
    {
      title: "Quản lý nhà cung cấp",
      url: "/admin/dashboard/provider-manage",
      icon: Home,
    },
    {
      title: "Cài đặt",
      url: "/admin/dashboard/setting",
      icon: Settings,
    },
  ];
  return (
    <Sidebar>
      <SidebarHeader>
        <Applogo />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a
                      href={item.url}
                      className={`flex items-center gap-2 p-5 rounded-xl ${
                        pathname === item.url
                          ? "bg-primary  text-white hover:bg-primary "
                          : "text-gray-700 hover:bg-gray-400 hover:text-black"
                      }`}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Button color="secondary" className="w-full">
          Đăng xuất
        </Button>
        <p>© 2024 Luxuer</p>
      </SidebarFooter>
    </Sidebar>
  );
}
