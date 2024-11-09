import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

function ConfirmPasswordComponent() {
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
        <p className="text-money text-2xl font-semibold">
          Apartment trading floor
        </p>
      </div>
      <div className="grid-cols-6 w-1/2 bg-primary flex items-center justify-center ">
        <div className="flex justify-center mt-8">
          <div className="w-full max-w-md mx-6">
            <div className="bg-card rounded-lg p-8">
              <h4 className="text-xl font-semibold mb-6">
                Hãy đặt lại mật khẩu của bạn
              </h4>
              <div className=" justify-center pb-4">
                <div className="py-2">
                  <label className="text-sm font-medium">Mật khẩu mới</label>
                  <Input placeholder="Nhập mật khẩu mới" />
                </div>
                <div className="py-2">
                  <label className="text-sm font-medium">
                    Nhập lại mật khẩu mới
                  </label>
                  <Input placeholder="Nhập lại mật khẩu mới" />
                </div>
              </div>

              <Button className="bg-primary w-full" variant={"default"}>
                Xác nhận
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmPasswordComponent;
