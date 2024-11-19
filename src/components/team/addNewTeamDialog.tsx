"use client";
import React, { FC } from "react";
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
import { useForm } from "react-hook-form";
import { CreateTeamSchema } from "@/lib/schema/teamSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { createTeam } from "@/app/actions/team";
import { revalidateProjectPath } from "@/app/actions/revalidate";

interface Props {
  leaders: Leader[];
}

const NewTeamDialog: FC<Props> = ({ leaders }) => {
  const form = useForm<z.infer<typeof CreateTeamSchema>>({
    resolver: zodResolver(CreateTeamSchema),
    defaultValues: {
      teamName: "",
      managerAccountID: "",
      teamType: "",
      teamDescription: "",
    },
  });

  console.log("leaders", leaders);

  async function onSubmit(values: z.infer<typeof CreateTeamSchema>) {
    try {
      const res = await createTeam(values);
      console.log("res", res);
    } catch (error) {
      console.log("error", error);
    } finally {
      form.reset();
      revalidateProjectPath("/manager/dashboard/team-manage");
    }
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
                  <div className="grid grid-cols-1 grid-rows-4 gap-1 pb-4">
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
                      name="managerAccountID"
                      render={({ field }) => (
                        <FormItem>
                          <span className="text-sm text-blur">
                            Chọn nhóm trưởng
                          </span>
                          <FormControl>
                            {/* <Input placeholder="Chọn trưởng nhóm" {...field} /> */}
                            <Select onValueChange={field.onChange}>
                              <SelectTrigger className="">
                                <SelectValue placeholder="Chọn trưởng nhóm" />
                              </SelectTrigger>
                              <SelectContent>
                                {leaders?.map((leader) => (
                                  <SelectItem
                                    key={leader.staffId}
                                    value={leader.staffId}
                                    disabled={leader.isAssignedToTeam}
                                  >
                                    {leader.name}{" "}
                                    {leader.isAssignedToTeam
                                      ? "(Đã được phân công)"
                                      : ""}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="teamType"
                      render={({ field }) => (
                        <FormItem>
                          <span className="text-sm text-blur">Chọn đơn vị</span>
                          <FormControl>
                            <Select onValueChange={field.onChange}>
                              <SelectTrigger className="">
                                <SelectValue placeholder="Đơn vị" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="1">Theo dự án</SelectItem>
                                <SelectItem value="2">Ký gửi</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="teamDescription"
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
