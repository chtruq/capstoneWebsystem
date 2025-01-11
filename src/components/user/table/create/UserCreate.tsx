"use client";

import { creatAccount } from "@/app/actions/user";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { accountSchema } from "@/lib/schema/accountSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const UserCreate = () => {
  const form = useForm<z.infer<typeof accountSchema>>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      name: "",
      phoneNumber: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "Admin",
      avatar: undefined,
    },
  });

  function onSubmit(values: z.infer<typeof accountSchema>) {
    console.log(values);
    handleSubmitForm(values);
  }

  const handleSubmitForm = async (values: z.infer<typeof accountSchema>) => {
    try {
      // Chuẩn bị FormData
      const formData = new FormData();
      formData.append("Email", values.email); // Đặt Email
      formData.append("Password", values.password); // Đặt Password
      formData.append("ConfirmPassword", values.confirmPassword); // Đặt ConfirmPassword
      formData.append("Name", values.name); // Đặt Name
      formData.append("Role", values.role); // Đặt Role
      formData.append("Avatar", values.avatar || ""); // Đặt Avatar, có thể để trống

      console.log("FormData:", Object.fromEntries(formData.entries()));

      // Gửi yêu cầu tới API
      const response = await creatAccount(formData);
      console.log("Account created successfully:", response);
    } catch (error: any) {
      console.error("Error creating account:", error.response?.data || error.message);
    }
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmitForm)}
          className="space-y-4 w-full"
        >
          <div>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="name">Tên người dùng</Label>
                  <FormControl>
                    <Input {...field} placeholder="Tên người dùng" />
                  </FormControl>

                  <FormMessage className="text-error" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="email">Email</Label>
                  <FormControl>
                    <Input id="email" {...field} placeholder="Email" />
                  </FormControl>

                  <FormMessage className="text-error" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="email">Mật khẩu</Label>
                  <FormControl>
                    <Input id="email" {...field} type="password" placeholder="Nhập mật khẩu" />
                  </FormControl>

                  <FormMessage className="text-error" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="email">Nhập lại mật khẩu</Label>
                  <FormControl>
                    <Input id="email" {...field} type="password" placeholder="Nhập lại mật khẩu" />
                  </FormControl>

                  <FormMessage className="text-error" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="role">Chọn vai trò</Label>

                  <FormControl>
                    <Select
                      onValueChange={(value) => field.onChange(value)}
                      value={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn vai trò" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Admin">Admin</SelectItem>
                        <SelectItem value="Management">Quản lý</SelectItem>
                        <SelectItem value="Staff">Nhân viên</SelectItem>
                        <SelectItem value="Project Provider">
                          Nhà cung cấp
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>

                  <FormMessage className="text-error" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="avatar"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="avatar">Avatar</Label>
                  <FormControl>
                    <Input
                      id="avatar"
                      type="file"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        field.onChange(file); // Set the file as the field's value
                      }}
                    />
                  </FormControl>
                  <FormMessage className="text-error" />
                </FormItem>
              )}
            />
          </div>
          <div>
            <Button
              onClick={() => {
                console.log(form.getValues());
                handleSubmitForm(form.getValues());
              }}
              variant="outline"
              type="submit"
              className="w-full"
            >
              Thêm tài khoản
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default UserCreate;
