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
  ListTodo,
  FileCheck2,
  MessageCircle,
} from "lucide-react";
import { Button } from "../ui/button";
import Applogo from "@public/icon/applogo";
import { usePathname } from "next/navigation";
import { handleLogout } from "@/app/actions/auth";
export function AppSidebar() {
  const pathname = usePathname();

  const items = [
    // {
    //   title: "Tổng quan",
    //   url: "/admin/dashboard",
    //   icon: LayoutDashboard,
    // },
    {
      title: "Quản lý tài khoản",
      url: "/admin/dashboard/user-manage",
      icon: User,
    },
    // {
    //   title: "Danh sách yêu cầu",
    //   url: "/admin/dashboard/request-manage",
    //   icon: ListCheck,
    // },
    // {
    //   title: "Quản lý căn hộ",
    //   url: "/admin/dashboard/apartment-manage",
    //   icon: Building2,
    // },
    // {
    //   title: "Quản lý dự án",
    //   url: "/admin/dashboard/project-manage",
    //   icon: FolderKanban,
    // },
    // {
    //   title: "Quản lý nhà cung cấp",
    //   url: "/admin/dashboard/provider-manage",
    //   icon: BriefcaseBusiness,
    // },
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
    // {
    //   title: "Quản lý tài khoản",
    //   url: "/manager/dashboard/user-manage",
    //   icon: User,
    // },
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
    // {
    //   title: "Hợp đồng",
    //   url: "/manager/dashboard/contract-manage",
    //   icon: ReceiptText,
    // },
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
    // {
    //   title: "Tổng quan",
    //   url: "/staff/dashboard",
    //   icon: LayoutDashboard,
    // },
    {
      title: "Quản lý yêu cầu",
      url: "/staff/dashboard/request-manage",
      icon: Users,
    },
    {
      title: "Danh sách lịch hẹn",
      url: "/staff/dashboard/appointment-manage",
      icon: ListTodo,
    },
    {
      title: "Danh sách căn hộ",
      url: "/staff/dashboard/apartment-manage",
      icon: Building2,
    },
    {
      title: "Ký gửi",
      url: "/staff/dashboard/consignment-manage",
      icon: FileCheck2,
    },
    {
      title: "Giao dịch",
      url: "/staff/dashboard/transaction-manage",
      icon: CreditCard,
    },
    {
      title: "Quản lý dự án",
      url: "/staff/dashboard/project-manage",
      icon: FolderKanban,
    },
    {
      title: "Quản lý nhóm",
      url: "/staff/dashboard/team-manage",
      icon: ListTodo,
    },
    {
      title: "Chat",
      url: "/staff/dashboard/chat",
      icon: MessageCircle,
    },
    {
      title: "Cài đặt",
      url: "/staff/dashboard/setting",
      icon: Settings,
    },
  ];

  const ProviderItem = [
    {
      title: "Tổng quan",
      url: "/provider/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Quản lý dự án",
      url: "/provider/dashboard/project-manage",
      icon: FolderKanban,
    },
    {
      title: "Giao dịch",
      url: "/provider/dashboard/transaction-manage",
      icon: CreditCard,
    },
    {
      title: "Cài đặt",
      url: "/provider/dashboard/setting",
      icon: Settings,
    },
  ];

  const SellerItem = [
    // {
    //   title: "Tổng quan",
    //   url: "/seller/dashboard",
    //   icon: LayoutDashboard,
    // },
    {
      title: "Quản lý yêu cầu",
      url: "/seller/dashboard/request-manage",
      icon: Users,
    },
    {
      title: "Danh sách lịch hẹn",
      url: "/seller/dashboard/appointment-manage",
      icon: ListTodo,
    },
    {
      title: "Danh sách căn hộ",
      url: "/seller/dashboard/apartment-manage",
      icon: Building2,
    },
    {
      title: "Ký gửi",
      url: "/seller/dashboard/consignment-manage",
      icon: FileCheck2,
    },
    {
      title: "Giao dịch",
      url: "/seller/dashboard/transaction-manage",
      icon: CreditCard,
    },
    {
      title: "Quản lý dự án",
      url: "/seller/dashboard/project-manage",
      icon: FolderKanban,
    },
    {
      title: "Quản lý nhóm",
      url: "/seller/dashboard/team-manage",
      icon: ListTodo,
    },
    {
      title: "Cài đặt",
      url: "/seller/dashboard/setting",
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
                            {item.title}
                          </span>
                        </a>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}

              {pathname.includes("/seller/dashboard") &&
                SellerItem.map((item) => (
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

              {pathname.includes("/provider/dashboard") &&
                ProviderItem.map((item) => (
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
