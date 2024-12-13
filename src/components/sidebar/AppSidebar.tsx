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
  CreditCard,
  FolderKanban,
  LayoutDashboard,
  ListCheck,
  ReceiptText,
  Settings,
  User,
  Users,
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
  const ManagerItem = [
    {
      title: "Tổng quan",
      url: "/manager/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Quản lý tài khoản",
      url: "/manager/dashboard/user-manage",
      icon: User,
    },
    {
      title: "Danh sách yêu cầu",
      url: "/manager/dashboard/request-manage",
      icon: ListCheck,
    },
    {
      title: "Quản lý căn hộ",
      url: "/manager/dashboard/apartment-manage",
      icon: Building2,
    },
    {
      title: "Quản lý dự án",
      url: "/manager/dashboard/project-manage",
      icon: FolderKanban,
    },
    {
      title: "Quản lý nhóm",
      url: "/manager/dashboard/team-manage",
      icon: Users,
    },
    {
      title: "Hợp đồng",
      url: "/manager/dashboard/contract-manage",
      icon: ReceiptText,
    },
    {
      title: "Giao dịch",
      url: "/manager/dashboard/transaction-manage",
      icon: CreditCard,
    },
    {
      title: "Quản lý nhà cung cấp",
      url: "/manager/dashboard/provider-manage",
      icon: BriefcaseBusiness,
    },
    {
      title: "Cài đặt",
      url: "/manager/dashboard/setting",
      icon: Settings,
    },
  ];

  const StaffItem = [
    {
      title: "Tổng quan",
      url: "/staff/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Danh sách căn hộ",
      url: "/staff/dashboard/apartment-manage",
      icon: Building2,
    },
    {
      title: "Quản lý dự án",
      url: "/staff/dashboard/project-manage",
      icon: FolderKanban,
    },
    {
      title: "Quản lý nhóm",
      url: "/staff/dashboard/team-manage",
      icon: Users,
    },
    {
      title: "Giao dịch",
      url: "/staff/dashboard/transaction-manage",
      icon: CreditCard,
    },
    {
      title: "Cài đặt",
      url: "/staff/dashboard/setting",
      icon: Settings,
    },
  ];

  return (
    <Sidebar>
      <SidebarHeader className="flex items-center">
        <Applogo />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {pathname.includes("/admin/dashboard") &&
                items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      {item.title === "Tổng quan" ? (
                        <a
                          href={item.url}
                          className={`flex items-center gap-2 p-5 rounded-xl ${pathname === item.url
                            ? "bg-primary-foreground  text-money hover:bg-primary-foreground hover:text-money  "
                            : "text-gray-700 hover:bg-gray-400"
                            }`}
                        >
                          <item.icon />
                          <span>{item.title}</span>
                        </a>
                      ) : (
                        <a
                          href={item.url}
                          className={`flex items-center gap-2 p-5 rounded-xl ${pathname.includes(item.url)
                            ? "bg-primary-foreground  text-money hover:bg-primary-foreground hover:text-money  "
                            : "text-gray-700 hover:bg-gray-400"
                            }`}
                        >
                          <item.icon />
                          <span>{item.title}</span>
                        </a>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}

              {pathname.includes("/manager/dashboard") &&
                ManagerItem.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      {item.title === "Tổng quan" ? (
                        <a
                          href={item.url}
                          className={`flex items-center gap-2 p-5 rounded-xl ${pathname === item.url
                            ? "bg-primary-foreground hover:text-black hover:bg-primary"
                            : "text-gray-700 hover:bg-gray-400 hover:text-black"
                            }`}
                        >
                          <item.icon />
                          <span
                            className={`flex items-center gap-2 p-5 rounded-xl`}
                          >
                            {item.title}
                          </span>
                        </a>
                      ) : (
                        <a
                          href={item.url}
                          className={`flex items-center gap-2 p-5 rounded-xl ${pathname.includes(item.url)
                            ? "bg-primary-foreground  text-money hover:bg-primary-foreground hover:text-money  "
                            : "text-gray-700 hover:bg-gray-400"
                            }`}
                        >
                          <item.icon />
                          <span
                            className={`flex items-center gap-2 p-5 rounded-xl`}
                          >
                            {item.title}
                          </span>
                        </a>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              {pathname.includes("/staff/dashboard") &&
                StaffItem.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      {item.title === "Tổng quan" ? (
                        <a
                          href={item.url}
                          className={`flex items-center gap-2 p-5 rounded-xl ${pathname === item.url
                            ? "bg-primary-foreground hover:text-black hover:bg-primary"
                            : "text-gray-700 hover:bg-gray-400 hover:text-black"
                            }`}
                        >
                          <item.icon />
                          <span
                            className={`flex items-center gap-2 p-5 rounded-xl`}
                          >
                            {item.title}
                          </span>
                        </a>
                      ) : (
                        <a
                          href={item.url}
                          className={`flex items-center gap-2 p-5 rounded-xl ${pathname.includes(item.url)
                            ? "bg-primary-foreground  text-money hover:bg-primary-foreground hover:text-money  "
                            : "text-gray-700 hover:bg-gray-400"
                            }`}
                        >
                          <item.icon />
                          <span
                            className={`flex items-center gap-2 p-5 rounded-xl`}
                          >
                            {item.title}</span>
                        </a>
                      )}
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
