import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
function OTPComponent() {
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
                Vui lòng nhập 4 mã số mà hệ thông đã gửi về địa chỉ mail
                abc@email.com
              </h4>
              <div className=" justify-center flex p-3 ">
                <InputOTP maxLength={4}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                  </InputOTPGroup>
                  <InputOTPGroup>
                    <InputOTPSlot index={1} />
                  </InputOTPGroup>
                  <InputOTPGroup>
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                  </InputOTPGroup>
                </InputOTP>
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

export default OTPComponent;
