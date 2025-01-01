"use client";
import React, { FC, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";
import { useForm } from "react-hook-form";
import { usePathname } from "next/navigation";
import { OwnerSchema } from "@/lib/schema/ownerSchema";
import { DialogDescription } from "@radix-ui/react-dialog";
import { formatTime, formatDateTime } from "@/lib/utils/dataFormat";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createOwner } from "@/app/actions/apartmentOwer";

interface Props {
  data?: Owner;
  onClose: () => void;
  AccountID: string;
}

const gender = [
  { label: "Nam", value: 1 },
  { label: "Nư", value: 2 },
  { label: "Kh", value: 3 },
];

const AddNewOwner: FC<Props> = ({ onClose, AccountID, data }) => {

  const form = useForm<z.infer<typeof OwnerSchema>>({
    resolver: zodResolver(OwnerSchema),
    defaultValues: {
      Name: "",
      Email: "",
      PhoneNumber: "",
      NationalID: "",
      IssueDate: "",
      BirthDate: "",
      Nationality: "",
      Gender: 1,
      Address: "",
      AccountID: AccountID,
    },
  });

  async function onSubmit(values: z.infer<typeof OwnerSchema>) {
    let hasError = false;
    try {
      console.log("Đang gửi form với giá trị:", values); // Thêm log kiểm tra
      if (data) {

      } else {
        console.log("tạo mới chủ căn hộ", values);
        const createOwnerResponse = await createOwner(values);
        console.log("createOwnerResponse", createOwnerResponse);
        onClose();
      }


    } catch (error) {
      hasError = true;
      console.error("Đã xảy ra lỗi khi tạo lịch hẹn:", error);
      console.log("Đã xảy ra lỗi:", error); // Log nếu xảy ra lỗi
      alert("Đã xảy ra lỗi khi tạo lịch hẹn");
    } finally {
      form.reset(
        {
          Name: "",
          Email: "",
          PhoneNumber: "",
          NationalID: "",
          IssueDate: "",
          BirthDate: "",
          Nationality: "",
          Gender: 1,
          Address: "",
          AccountID: AccountID,
        },
      );
    }
  }

  return (
    <div>
      <Dialog open={!!AccountID} onOpenChange={onClose}>
        <DialogTrigger>
          <Button type="button">Thêm chủ căn hộ</Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Thêm chủ căn hộ</DialogTitle>
            <DialogDescription asChild>
              <div>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit, (errors) => {
                      console.log("Lỗi validation:", errors);
                    })}
                  >

                    <div className="mb-3 grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="Name"
                        render={({ field }) => (
                          <FormItem>
                            <div className="font-semibold">Tên chủ căn hộ</div>
                            <FormControl>
                              <Input placeholder="Nhập tên chủ căn hộ" {...field} />
                            </FormControl>
                            <FormMessage className="text-error" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="Email"
                        render={({ field }) => (
                          <FormItem>
                            <div className="font-semibold">Địa chỉ mail</div>
                            <FormControl>
                              <Input placeholder="Nhập địa chỉ mail" {...field} />
                            </FormControl>
                            <FormMessage className="text-error" />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="mb-3 grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="PhoneNumber"
                        render={({ field }) => (
                          <FormItem>
                            <div className="font-semibold">Số điện thoại</div>
                            <FormControl>
                              <Input placeholder="Nhập số điện thoại" {...field} />
                            </FormControl>
                            <FormMessage className="text-error" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="NationalID"
                        render={({ field }) => (
                          <FormItem>
                            <div className="font-semibold">Số căn cước</div>
                            <FormControl>
                              <Input placeholder="Nhập số căn cước công dân" {...field} />
                            </FormControl>
                            <FormMessage className="text-error" />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="mb-3 grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="BirthDate"
                        render={({ field }) => (
                          <FormItem>
                            <div className="font-semibold">Ngày sinh</div>
                            <FormControl>
                              <Input type="date"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="text-error" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="IssueDate"
                        render={({ field }) => (
                          <FormItem>
                            <div className="font-semibold">Ngày cấp phát</div>
                            <FormControl>
                              <Input type="date"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="text-error" />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="mb-3 grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="Nationality"
                        render={({ field }) => (
                          <FormItem>
                            <div className="font-semibold">Quốc tịch</div>
                            <FormControl>
                              <Input placeholder="Nhập quốc tịch" {...field} />
                            </FormControl>
                            <FormMessage className="text-error" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="Gender"
                        render={({ field }) => (
                          <FormItem className="w-3/5">
                            <div className="font-semibold">Chọn giới tính</div>
                            <FormControl>
                              <Select
                                {...field}
                                value={field.value?.toString() ?? ""}
                                onValueChange={(value) => field.onChange(Number(value))}
                              >
                                <SelectTrigger className="">
                                  <SelectValue placeholder="Chọn giới tính" />
                                </SelectTrigger>
                                <SelectContent>
                                  {gender.map((type) => (
                                    <SelectItem
                                      key={type.value}
                                      value={type.value.toString()}
                                    >
                                      {type.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="Address"
                      render={({ field }) => (
                        <FormItem>
                          <div className="font-semibold">Địa chỉ</div>
                          <FormControl>
                            <Input placeholder="Nhập địa chỉ" {...field} />
                          </FormControl>
                          <FormMessage className="text-error" />
                        </FormItem>
                      )}
                    />

                    <div className="flex justify-center">
                      <Button
                        className="mt-2"
                        variant="default"
                        type="submit"
                        onClick={() => console.log("Nút Chấp nhận được nhấn")}
                      >
                        <span>Chấp nhận</span>
                      </Button>
                    </div>

                  </form>
                </Form>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AddNewOwner;