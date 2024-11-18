"use client";

import React, { FC, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { projectFinancialContractSchema } from "@/lib/schema/ProjectFinancialContractSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { createFinancialContract } from "@/app/actions/project";
import CombineCirlePlus from "@public/icon/CombineCirlePlus";
import { revalidateProjectPath } from "@/app/actions/revalidate";
import { usePathname } from "next/navigation";

interface Props {
  title: string;
  dialogTitle: string;
  projectApartmentId: string;
  data?: FinancialContract;
}

const AddFinancialContract: FC<Props> = ({
  title,
  dialogTitle,
  projectApartmentId,
  data,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const pathName = usePathname();
  const form = useForm<z.infer<typeof projectFinancialContractSchema>>({
    resolver: zodResolver(projectFinancialContractSchema),
    defaultValues: {
      lowestPrice: 0,
      highestPrice: 0,
      depositAmount: 0,
      brokerageFee: 0,
      commissionFee: 0,
      projectApartmentID: projectApartmentId,
    },
  });

  useEffect(() => {
    if (data) {
      form.reset({
        lowestPrice: data.lowestPrice,
        highestPrice: data.highestPrice,
        depositAmount: data.depositAmount,
        brokerageFee: data.brokerageFee,
        commissionFee: data.commissionFee,
        projectApartmentID: projectApartmentId,
      });
    }
  }, [data, projectApartmentId, form]);

  async function onSubmit(
    values: z.infer<typeof projectFinancialContractSchema>
  ) {
    console.log(values);
    setIsSubmitting(true);
    try {
      await createFinancialContract(values);
      setIsDialogOpen(false);
      revalidateProjectPath(pathName);
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger>
          <Button variant="outline">
            {title}
            {data ? (
              <></>
            ) : (
              <span>
                <CombineCirlePlus />
              </span>
            )}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{dialogTitle}</DialogTitle>
            <DialogDescription>
              <div>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-2"
                  >
                    <FormField
                      control={form.control}
                      name="lowestPrice"
                      render={({ field }) => (
                        <FormItem>
                          <div>Khoảng dưới</div>
                          <FormControl>
                            <Input
                              placeholder="Nhập giá trị khoảng dưới (VD : 2000000000)"
                              {...field}
                              type="number"
                            />
                          </FormControl>

                          <FormMessage className="text-error" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="highestPrice"
                      render={({ field }) => (
                        <FormItem>
                          <div>Khoảng trên</div>
                          <FormControl>
                            <Input
                              placeholder="Nhập giá trị khoảng trên (VD : 4000000000)"
                              {...field}
                              type="number"
                            />
                          </FormControl>
                          <FormMessage className="text-error" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="depositAmount"
                      render={({ field }) => (
                        <FormItem>
                          <div>Giá trị đặt cọc</div>
                          <FormControl>
                            <Input
                              placeholder="Nhập giá trị đặt cọc"
                              {...field}
                              type="number"
                            />
                          </FormControl>

                          <FormMessage className="text-error" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="brokerageFee"
                      render={({ field }) => (
                        <FormItem>
                          <div>Giá trị môi giới</div>
                          <FormControl>
                            <Input
                              placeholder="Giá trị môi giới"
                              {...field}
                              type="number"
                            />
                          </FormControl>

                          <FormMessage className="text-error" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="commissionFee"
                      render={({ field }) => (
                        <FormItem>
                          <div>Hoa hồng</div>
                          <FormControl>
                            <Input
                              placeholder="Hoa hồng"
                              type="number"
                              {...field}
                            />
                          </FormControl>

                          <FormMessage className="text-error" />
                        </FormItem>
                      )}
                    />

                    <Button
                      disabled={isSubmitting}
                      variant="outline"
                      type="submit"
                    >
                      Xác nhận
                    </Button>
                  </form>
                </Form>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddFinancialContract;
