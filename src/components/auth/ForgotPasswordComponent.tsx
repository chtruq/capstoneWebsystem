"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
function ForgotPasswordComponent() {
  const router = useRouter();

  const handleForgotPassword = () => {
    router.push("/auth/otp");
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
                Hãy gửi địa chỉ email của bạn để khôi phục lại mật khẩu!
              </h4>
              <div className="mb-4">
                <label about="email" className="text-sm font-medium">
                  Địa chỉ email
                </label>
                <Input
                  id="email"
                  className="mb-4"
                  placeholder="Nhập địa chỉ email"
                />
              </div>
              <Button
                onClick={handleForgotPassword}
                className="text-primary w-full"
                variant={"outline"}
              >
                Xác nhận
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordComponent;
