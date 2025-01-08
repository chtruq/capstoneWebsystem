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
import { accountSchema, accountUpdateSchema } from "@/lib/schema/accountSchema";
import { revalidateProjectPath } from "@/app/actions/revalidate";
import { usePathname } from "next/navigation";
interface Props {
  data: User;
}

const UpdateAccountDialog: FC<Props> = ({ data }) => {
  const pathName = usePathname();
  const [isOpen, setIsOpen] = useState(false); // Quản lý trạng thái mở/đóng Dialog

  const form = useForm<z.infer<typeof accountUpdateSchema>>({
    resolver: zodResolver(accountUpdateSchema),
    defaultValues: {
      name: "",
      phoneNumber: "",
    },
  });

  useEffect(() => {
    if (data) {
      form.setValue("name", data.name);
      form.setValue("phoneNumber", data.phoneNumber || "");
    }
  }, [data]);


  const onSubmit = async (value: z.infer<typeof accountUpdateSchema>) => {
    try {
      const payload = { ...value };
      console.log("Payload in update account", payload);
      form.reset();
      revalidateProjectPath(pathName);
      setIsOpen(false);
    } catch (error) {
      console.error("Error update account:", error);
    }
  };
  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button onClick={() => setIsOpen(true)}>Cập nhật</Button>
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
                <DialogTitle>Cập nhật thông tin</DialogTitle>
              </DialogHeader>
              <DialogDescription>

                <div className="grid grid-cols-1 gap-1 space-y-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <span className="text-sm text-blur">
                          Nhập tên tài khoản
                        </span>
                        <FormControl>
                          <Input placeholder="Nhập tên tài khoản" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <span className="text-sm text-blur">
                          Nhập số điên thoại
                        </span>
                        <FormControl>
                          <Input placeholder="Nhập tên tài khoản" {...field} />
                        </FormControl>
                        <FormMessage />
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

export default UpdateAccountDialog;