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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const validateForm = () => {
    const newErrors: { email: string; password: string } = { email: "", password: "" };

    // Kiểm tra email
    if (!form.email) {
      newErrors.email = "Vui lòng nhập địa chỉ email.";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Địa chỉ email không hợp lệ.";
    }

    // Kiểm tra mật khẩu
    if (!form.password) {
      newErrors.password = "Vui lòng nhập mật khẩu.";
    } else if (form.password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự.";
    }

    setErrors(newErrors);
    return !newErrors.email && !newErrors.password; // Form hợp lệ nếu không có lỗi
  };

  const handleSubmit = async () => {
    if (!validateForm()) return; // Dừng lại nếu form không hợp lệ

    try {
      setIsSubmitting(true);
      const res = await handleLogin(form.email, form.password);
      if (res?.invalidRole) {
        setErrors({
          ...errors,
          email: "Đăng nhập thất bại. Quyền truy cập không hợp lệ.",
          password: "",
        });
      } else {
        console.log(res); // Xử lý kết quả thành công
      }
    } catch (e) {
      console.log("Đăng nhập thất bại:", e);
      setErrors({ ...errors, email: "Đăng nhập thất bại. Vui lòng kiểm tra thông tin.", password: "" });
    } finally {
      setIsSubmitting(false);
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
        <p className="text-money text-2xl font-semibold">Apartment trading floor</p>
      </div>
      <div className="grid-cols-6 w-1/2 bg-primary flex items-center justify-center">
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
                <label htmlFor="email" className="text-sm font-medium">
                  Địa chỉ email
                </label>
                <Input
                  id="email"
                  className={`mb-2 ${errors.email ? "border-red-500" : ""}`}
                  placeholder="Nhập địa chỉ email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>

              <div className="mb-8">
                <label htmlFor="password" className="text-sm font-medium">
                  Mật khẩu
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    className={`mb-2 pr-10 ${errors.password ? "border-red-500" : ""}`}
                    type={showPassword ? "text" : "password"}
                    placeholder="Nhập mật khẩu"
                    value={form.password}
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-1/2 right-2 transform -translate-y-1/2"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5 text-gray-500" />
                    ) : (
                      <Eye className="w-5 h-5 text-gray-500" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password}</p>
                )}
              </div>

              {/* <div className="flex justify-between mb-4">
                <div>
                  <input type="checkbox" id="remember" />
                  <label htmlFor="remember" className="text-sm font-medium ml-2">
                    Ghi nhớ đăng nhập
                  </label>
                </div>
                <div>
                  <Link className="underline" href="/auth/forgot-password">
                    Quên mật khẩu
                  </Link>
                </div>
              </div> */}

              <Button
                onClick={handleSubmit}
                className="bg-primary w-full"
                variant={"default"}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Đang đăng nhập..." : "Đăng nhập"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SigninComponent;
