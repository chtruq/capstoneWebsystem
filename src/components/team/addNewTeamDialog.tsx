"use client";
import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
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
import { CreateTeamSchema } from "@/lib/schema/teamSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
const NewTeamDialog = () => {
  const form = useForm<z.infer<typeof CreateTeamSchema>>({
    resolver: zodResolver(CreateTeamSchema),
    defaultValues: {
      teamName: "",
      leader: "",
      unit: "",
      description: "",
    },
  });
  function onSubmit(values: z.infer<typeof CreateTeamSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Tạo mới</Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tạo nhóm quản lý</DialogTitle>
            <div>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <div className="grid grid-cols-1 grid-rows-4 gap-1">
                    <FormField
                      control={form.control}
                      name="teamName"
                      render={({ field }) => (
                        <FormItem>
                          <span className="text-sm text-blur">
                            Nhập tên nhóm
                          </span>
                          <FormControl>
                            <Input placeholder="Nhập tên nhóm" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="leader"
                      render={({ field }) => (
                        <FormItem>
                          <span className="text-sm text-blur">
                            Chọn nhóm trưởng
                          </span>
                          <FormControl>
                            <Input placeholder="Chọn trưởng nhóm" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="unit"
                      render={({ field }) => (
                        <FormItem>
                          <span className="text-sm text-blur">Chọn đơn vị</span>
                          <FormControl>
                            <Input placeholder="Chọn trưởng nhóm" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <span className="text-sm text-blur">
                            Nhập thông tin mô tả
                          </span>
                          <FormControl>
                            <Textarea
                              placeholder="Nhập thông tin mô tả"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <DialogClose asChild>
                    <Button type="button" variant="secondary">
                      Đóng
                    </Button>
                  </DialogClose>
                  <Button type="submit">Xác nhận</Button>
                </form>
              </Form>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NewTeamDialog;
