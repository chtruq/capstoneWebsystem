"use client";
import React, { FC, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { createTeam } from "@/app/actions/team";
import { DialogDescription } from "@radix-ui/react-dialog";
import { accountSchema, accountUpdateSchema, updatePasswordSchema } from "@/lib/schema/accountSchema";
import { revalidateProjectPath } from "@/app/actions/revalidate";
import { usePathname } from "next/navigation";
import { updatePassword } from "@/app/actions/user";

interface Props {
  accountId: string;
}

const UpdatePasswordAccountDialog: FC<Props> = ({ accountId }) => {
  const pathName = usePathname();
  const [isOpen, setIsOpen] = useState(false); // Quản lý trạng thái mở/đóng Dialog
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const form = useForm<z.infer<typeof updatePasswordSchema>>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      accountId: accountId,
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const onSubmit = async (value: z.infer<typeof updatePasswordSchema>) => {
    try {
      const payload = { ...value };
      console.log("Payload in update password", payload);
      const res = await updatePassword(accountId, payload.currentPassword, payload.newPassword);
      console.log("Response in update account", res);
      // revalidateProjectPath(pathName);
      // setIsOpen(false);
      // form.reset();
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error update password:", error.message);
        setErrorMessage(error.message); // Ghi lại thông báo lỗi
      }
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={() => {
        setIsOpen(!isOpen)
        form.reset()
      }}>
        <DialogTrigger asChild>
          <Button onClick={() => setIsOpen(true)}>Thay đổi mật khẩu</Button>
        </DialogTrigger>
        <DialogContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit, (errors) => {
                console.log("Lỗi validation:", errors);
              })}
              className="space-y-2"
            >
              <DialogHeader>
                <DialogTitle>Cập nhật mật khẩu</DialogTitle>
              </DialogHeader>
              <DialogDescription>

                <div className="grid grid-cols-1 gap-1 space-y-2">
                  <FormField
                    control={form.control}
                    name="currentPassword"
                    render={({ field }) => (
                      <FormItem>
                        <span className="text-sm text-blur">
                          Mật khẩu hiện tại
                        </span>
                        <FormControl>
                          <Input placeholder="Nhập mật khẩu hiện tại" {...field} />
                        </FormControl>
                        <FormMessage className="text-red-500 text-sm"/>
                      </FormItem>
                    )}
                  />
                  {/* Hiển thị lỗi nếu có */}
                  {errorMessage && (
                    <div className="text-red-500 text-sm">
                      {errorMessage}
                    </div>
                  )}
                  <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <span className="text-sm text-blur">
                          Mật khẩu mới
                        </span>
                        <FormControl>
                          <Input placeholder="Nhập mật khẩu mới" {...field} />
                        </FormControl>
                        <FormMessage className="text-red-500 text-sm"/>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="confirmNewPassword"
                    render={({ field }) => (
                      <FormItem>
                        <span className="text-sm text-blur">
                          Xác nhận mật khẩu
                        </span>
                        <FormControl>
                          <Input placeholder="Nhập lại mật khẩu mới" {...field} />
                        </FormControl>
                        <FormMessage className="text-red-500 text-sm"/>
                      </FormItem>
                    )}
                  />
                </div>

              </DialogDescription>
              <DialogFooter>
                <Button type="submit">Cập nhật</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  )
}


export default UpdatePasswordAccountDialog;