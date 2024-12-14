"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { handleLogin } from "@/app/actions/auth";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

function SigninComponent() {
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = React.useState({
    email: "",
    password: "",
  });
  const handleSubmit = async (email: string, password: string) => {
    try {
      const res = await handleLogin(email, password);
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/2 grid-cols-6 flex flex-col items-center justify-center">
        <Image
          src={"/image/logo.png"}
          alt="Luxuer Logo"
          width={180}
          height={38}
          priority
        />
        <p className="">Apartment trading floor</p>
      </div>
      <div className="grid-cols-6 w-1/2 bg-primary flex items-center justify-center ">
        <div className="flex justify-center mt-8">
          <div className="w-full max-w-md mx-6">
            <div className="bg-card rounded-lg p-8">
              <h4 className="text-xl font-semibold mb-6">
                Xin chào,{" "}
                <p className="text-sm font-medium">
                  Hãy bắt đầu với công việc bằng một trạng thái tích cực nhất.
                </p>
              </h4>

              <div className="mb-4">
                <label about="email" className="text-sm font-medium">
                  Địa chỉ email
                </label>
                <Input
                  id="email"
                  className="mb-4"
                  placeholder="Nhập địa chỉ email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="text-sm font-medium">
                  Mật khẩu
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    className="mb-4 pr-10" // Thêm padding phải để icon không chèn lên text
                    type={showPassword ? "text" : "password"} // Thay đổi type
                    placeholder="Nhập mật khẩu"
                    value={form.password}
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)} // Thay đổi trạng thái hiển thị mật khẩu
                    className="absolute top-1/2 right-2 transform -translate-y-1/2"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5 text-gray-500" />
                    ) : (
                      <Eye className="w-5 h-5 text-gray-500" />
                    )}
                  </button>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="mb-4">
                  <input type="checkbox" id="remember" />
                  <label htmlFor="remember" className="text-sm font-medium">
                    Ghi nhớ đăng nhập
                  </label>
                </div>

                <div>
                  <Link className="underline" href="/auth/forgot-password">
                    Quên mật khẩu
                  </Link>
                </div>
              </div>

              <Button
                onClick={() => {
                  handleSubmit(form.email, form.password);
                }}
                className="bg-primary w-full"
                variant={"default"}
              >
                Đăng nhập
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SigninComponent;
