"use client";
import React, { FC, useEffect, useState } from "react";
import {
  Dialog,
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
import { revalidateProjectPath } from "@/app/actions/revalidate";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useForm } from "react-hook-form";
import { AppointmentSchema } from "@/lib/schema/appointmentSchema";
import { DialogDescription } from "@radix-ui/react-dialog";
import { formatTime } from "@/lib/utils/dataFormat";
import { accepttRequestAppointment, createAppointment } from "@/app/actions/apointment";
import { usePathname } from "next/navigation";

interface Props {
  ReferenceCode: string;
  CustomerID: string;
  ApartmentID: string;
  AssignedStaffAccountID: string;
  RequestID: string;
  Name: string;
  Phone: string;
  onClose: () => void;
  isSubmitted: () => void;
}

const AddNewAppointmentDialog: FC<Props> = ({
  ReferenceCode,
  CustomerID,
  ApartmentID,
  AssignedStaffAccountID,
  RequestID,
  Name,
  Phone,
  onClose,
  isSubmitted,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const form = useForm<z.infer<typeof AppointmentSchema>>({
    resolver: zodResolver(AppointmentSchema),
    defaultValues: {
      title: "Lịch hẹn",
      description: "",
      location: "",
      appointmentDate: "",
      startTime: "",
      assignedStaffAccountID: AssignedStaffAccountID,
      customerID: CustomerID,
      apartmentID: ApartmentID,
      referenceCode: ReferenceCode,
      username: Name,
      phoneNumber: Phone,
    },
  });


  const pathName = usePathname();

  console.log("ReferenceCode in AddNewAppointmentDialog:", ReferenceCode);
  console.log("CustomerID in AddNewAppointmentDialog:", CustomerID);
  console.log("ApartmentID in AddNewAppointmentDialog:", ApartmentID);
  console.log("AssignedStaffAccountID in AddNewAppointmentDialog:", AssignedStaffAccountID);
  console.log("RequestID in AddNewAppointmentDialog:", RequestID);
  console.log("Name in AddNewAppointmentDialog:", Name);
  console.log("Phone in AddNewAppointmentDialog:", Phone);



  // useEffect(() => {
  //   console.log("Dữ liệu trong form:", form.watch());
  // }, [form.watch()]);

  // console.log("ReferenceCode in AddNewAppointmentDialog:", ReferenceCode);


  async function onSubmit(values: z.infer<typeof AppointmentSchema>) {
    let hasError = false;
    try {
      setIsSubmitting(true);
      console.log("Đang gửi form với giá trị:", values); // Thêm log kiểm tra

      // Gọi API tạo lịch hẹn
      const appointmentResponse = await createAppointment(values);
      console.log("Tạo lịch hẹn thành công:", appointmentResponse);
    } catch (error) {
      hasError = true;
      console.error("Đã xảy ra lỗi khi tạo lịch hẹn:", error);
      console.log("Đã xảy ra lỗi:", error); // Log nếu xảy ra lỗi
      alert("Đã xảy ra lỗi khi tạo lịch hẹn");
    } finally {
      if (hasError) {
        setIsSubmitting(false);
        return; // Thoát khỏi finally nếu có lỗi
      }

      // Đóng dialog
      isSubmitted();
      form.reset();
      setIsSubmitting(false);
    }
  }

  return (
    <div>
      <Dialog open={!!RequestID} onOpenChange={onClose}>
        <DialogTrigger>
          <p>Chấp nhận</p>
        </DialogTrigger>
        <DialogContent showOverlay={true}>
          {/* <DialogContent> */}
          <DialogHeader>
            <DialogTitle>Thêm lịch hẹn</DialogTitle>
            <DialogDescription asChild>
              <div>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit, (errors) => {
                      console.log("Lỗi validation:", errors);
                    })}
                  >
                    {/* <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <div>Ten tua de</div>
                          <FormControl>
                            <Input placeholder="Nhập tiêu đề" {...field} />
                          </FormControl>
                          <FormMessage className="text-error" />
                        </FormItem>
                      )}
                    /> */}
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <div>Thông tin mô tả</div>
                          <FormControl>
                            <Textarea placeholder="Nhập mô tả" {...field} />
                          </FormControl>
                          <FormMessage className="text-error" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <div>Địa chỉ</div>
                          <FormControl>
                            <Input placeholder="Nhập địa điểm" {...field} />
                          </FormControl>
                          <FormMessage className="text-error" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="appointmentDate"
                      render={({ field }) => (
                        <FormItem>
                          <div>Ngày hẹn</div>
                          <FormControl>
                            <Input type="datetime-local"
                              {...field}
                              onChange={(e) => {
                                field.onChange(e); // Cập nhật giá trị của appointmentDate
                                const date = new Date(e.target.value);
                                const timeString = formatTime(date.toISOString());
                                form.setValue("startTime", timeString); // Cập nhật startTime
                              }}
                            />
                          </FormControl>
                          <FormMessage className="text-error" />
                        </FormItem>
                      )}
                    />
                    <Button
                      className="mt-2"
                      variant="default"
                      type="submit"
                      disabled={isSubmitting}
                      onClick={() => console.log("Nút Chấp nhận được nhấn")}
                    >
                      <span>Chấp nhận</span>
                    </Button>
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

export default AddNewAppointmentDialog;  
