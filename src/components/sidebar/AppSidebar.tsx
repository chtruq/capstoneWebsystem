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
import {
  BriefcaseBusiness,
  Building2,
  FolderKanban,
  Home,
  LayoutDashboard,
  ListCheck,
  Settings,
  User,
} from "lucide-react";
import { Button } from "../ui/button";
import Applogo from "@public/icon/applogo";
import { usePathname } from "next/navigation";
import { handleLogout } from "@/app/actions/auth";
export function AppSidebar() {
  const pathname = usePathname();
  const items = [
    {
      title: "Tổng quan",
      url: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Quản lý tài khoản",
      url: "/admin/dashboard/user-manage",
      icon: User,
    },
    {
      title: "Danh sách yêu cầu",
      url: "/admin/dashboard/request-manage",
      icon: ListCheck,
    },
    {
      title: "Quản lý căn hộ",
      url: "/admin/dashboard/apartment-manage",
      icon: Building2,
    },
    {
      title: "Quản lý dự án",
      url: "/admin/dashboard/project-manage",
      icon: FolderKanban,
    },
    {
      title: "Quản lý nhà cung cấp",
      url: "/admin/dashboard/provider-manage",
      icon: BriefcaseBusiness,
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
        <Button
          onClick={() => {
            handleLogout();
          }}
          color="secondary"
          className="w-full"
        >
          Đăng xuất
        </Button>
        <p>© 2024 Luxuer</p>
      </SidebarFooter>
    </Sidebar>
  );
}
