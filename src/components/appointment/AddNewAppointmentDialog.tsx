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

interface Props {
  ReferenceCode: string;
  CustomerID: string;
  ApartmentID: string;
  AssignedStaffAccountID: string;
}

const AddNewAppointmentDialog: FC<Props> = ({
  ReferenceCode,
  CustomerID,
  ApartmentID,
  AssignedStaffAccountID,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const form = useForm<z.infer<typeof AppointmentSchema>>({
    resolver: zodResolver(AppointmentSchema),
    defaultValues: {
      title: "",
      description: "",
      location: "",
      appointmentDate: "",
      startTime: { ticks: "10:00:00" },
      assignedStaffAccountID: AssignedStaffAccountID,
      customerID: CustomerID,
      apartmentID: ApartmentID,
      referenceCode: ReferenceCode,
    },
  });

  async function onSubmit(values: z.infer<typeof AppointmentSchema>) {

    try {
      setIsSubmitting(true);
      console.log("Đang gửi form với giá trị:", values); // Thêm log kiểm tra
    } catch (error) {
      console.log("Đã xảy ra lỗi:", error); // Log nếu xảy ra lỗi
    } finally {
      form.reset();
      setIsSubmitting(false);
      // revalidateProjectPath("/manager/dashboard/appointment-manage");
    }
  }

  return (
    <div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger>
          <p>Chấp nhận</p>
        </DialogTrigger>
        {/* <DialogContent showOverlay={false}> */}
        <DialogContent>
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
                    <FormField
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
                    />
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <div>Thong tin mo ta</div>
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
                          <div>Dia chi</div>
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
                          <div>Ngay hen</div>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage className="text-error" />
                        </FormItem>
                      )}
                    />
                    <Button variant="outline" type="submit" disabled={isSubmitting} onClick={() => console.log("Nút Chấp nhận được nhấn")}>
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
