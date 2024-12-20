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
      title: "Tổng quan", // Tổng quan có thể là dashboard chính, nhưng không phải là hoạt động chính của nhân viên
      url: "/staff/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Quản lý yêu cầu", // Xử lý các yêu cầu tư vấn, đặt cọc, ký gửi - Hoạt động chính
      url: "/staff/dashboard/request-manage",
      icon: Users,
    },
    {
      title: "Danh sách lịch hẹn", // Lịch hẹn với khách hàng là một phần quan trọng của công việc nhân viên
      url: "/staff/dashboard/appointment-manage",
      icon: ListTodo,
    },
    {
      title: "Danh sách căn hộ", // Quản lý danh sách các căn hộ là công việc quan trọng của nhân viên
      url: "/staff/dashboard/apartment-manage",
      icon: Building2,
    },
    {
      title: "Giao dịch", // Quản lý các giao dịch là một phần quan trọng trong quy trình của hệ thống
      url: "/staff/dashboard/transaction-manage",
      icon: CreditCard,
    },
    {
      title: "Quản lý dự án", // Quản lý các dự án là cần thiết nhưng ít quan trọng hơn so với các hoạt động ở trên
      url: "/staff/dashboard/project-manage",
      icon: FolderKanban,
    },
    {
      title: "Quản lý nhóm", // Quản lý nhóm có thể không phải ưu tiên hàng đầu nhưng vẫn quan trọng để theo dõi thành viên
      url: "/staff/dashboard/team-manage",
      icon: ListTodo,
    },
    {
      title: "Cài đặt", // Cài đặt thường là phần ít tương tác nhất
      url: "/staff/dashboard/setting",
      icon: Settings,
    },
  ];

  const ProjectProviderItem = [
    {
      title: "Tổng quan",
      url: "/projectprovider/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Quản lý dự án",
      url: "/projectprovider/dashboard/project-manage",
      icon: FolderKanban,
    },
    {
      title: "Quản lý căn hộ",
      url: "/projectprovider/dashboard/apartment-manage",
      icon: Building2,
    },
    {
      title: "Quản lý nhà cung cấp",
      url: "/projectprovider/dashboard/provider-manage",
      icon: BriefcaseBusiness,
    },
    {
      title: "Cài đặt",
      url: "/projectprovider/dashboard/setting",
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
