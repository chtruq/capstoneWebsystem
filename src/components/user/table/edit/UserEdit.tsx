"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { accountSchema } from "@/lib/schema/accountSchema";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const UserEdit = ({ data }: { data: User }) => {
  //   const [form, setForm] = React.useState({
  //     name: data?.name || "",
  //     phoneNumber: data?.phoneNumber || "",
  //     // lockAccount: data?.accountStatus === "0" ? true : false,
  //   });

  //   useEffect(() => {
  //     console.log(form);
  //   }, [form]);
  const form = useForm<z.infer<typeof accountSchema>>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      name: data?.name || "",
      phoneNumber: data?.phoneNumber || "",
    },
  });

  function onSubmit(values: z.infer<typeof accountSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
        <div>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Tên người dùng" />
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
                <FormControl>
                  <Input {...field} placeholder="Số điện thoại" />
                </FormControl>

                <FormMessage className="text-error" />
              </FormItem>
            )}
          />

          {/* <div className="flex items-center space-x-1 p-2">
          <Checkbox
            value={form.lockAccount}
            onChange={(e) => {
              setForm({
                ...form,
                lockAccount: 
              });
            }}
            id="lockAccount"
          />
          <Label className="text-sm font-semibold" htmlFor="lockAccount">
            Khoá tài khoản
          </Label>
        </div> */}
        </div>
        <div>
          <Button type="submit" variant="default">
            Lưu
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default UserEdit;
