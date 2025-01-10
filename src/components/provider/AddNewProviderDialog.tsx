"use client";

import React, { FC, useEffect, useRef, useState } from "react";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import CombineCirlePlus from "@public/icon/CombineCirlePlus";
import { revalidateProjectPath } from "@/app/actions/revalidate";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { ProviderSchema } from "@/lib/schema/provdivderSchema";
import { createProvider } from "@/app/actions/provider";
import axios from "axios";

const AddNewProviderDialog = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedImages, setSelectedImages] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const inputImageRef = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const pathname = usePathname();
  const router = useRouter();

  const validateImage = (file: File) => {
    const maxFileSize = 15 * 1024 * 1024; // 15MB
    const validMimeTypes = ["image/jpeg", "image/png"];
    if (file.size > maxFileSize) {
      throw new Error("Dung lượng file không được vượt quá 15MB.");
    }
    if (!validMimeTypes.includes(file.type)) {
      throw new Error("Chỉ chấp nhận file định dạng JPEG hoặc PNG.");
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0]; // Lấy file duy nhất được chọn

      try {
        validateImage(file); // Gọi hàm kiểm tra file
        setSelectedImages(file); // Lưu file vào state
        setImagePreviewUrl(URL.createObjectURL(file)); // Tạo URL để hiển thị ảnh
        console.log("File in handleFileChange", file);

      } catch (error: any) {
        alert(error.message); // Hiển thị thông báo lỗi cho người dùng
        console.error("Error adding file:", error);
      }
    }
  };

  const handleRemoveFile = () => {
    setSelectedImages(null); // Xóa file đã chọn
    setImagePreviewUrl(null); // Xóa URL ảnh
    form.setValue("DiagramUrl", ""); // Đồng bộ với form
  };

  const handleOpenFileImagePicker = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (inputImageRef.current) {
      inputImageRef.current.click();
    }
  };

  useEffect(() => {
    form.setValue("DiagramUrl", selectedImages?.name || "");
  }, [selectedImages]);

  const form = useForm<z.infer<typeof ProviderSchema>>({
    resolver: zodResolver(ProviderSchema),
    defaultValues: {
      Name: "",
      Email: "",
      Password: "",
      ConfirmPassword: "",
      ApartmentProjectProviderName: "",
      ApartmentProjectDescription: "",
      Location: "",
      DiagramUrl: "",
    },
  });

  async function onSubmit(value: z.infer<typeof ProviderSchema>) {
    try {
      setIsSubmitting(true);
      const payload = { ...value, DiagramUrl: selectedImages };
      console.log("Payload in add new provider", payload);
      const response = await createProvider(payload);
      console.log("Response in add new provider", response);


      router.push(pathname);
      setSelectedImages(null);
      setImagePreviewUrl(null);
      form.reset();
      setIsDialogOpen(false);
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        setErrorMessage("Yêu cầu không hợp lệ. Vui lòng kiểm tra lại dữ liệu.");
      } else {
        setErrorMessage("Tài khoản mail bị trùng trên cơ sở dữ liệu.");
      }
      console.error("Error creating project:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={() => {
        setIsDialogOpen(!isDialogOpen);
        form.reset();
      }}>
        <DialogTrigger>
          <Button>
            Thêm nhà cung cấp
            <p>
              <CombineCirlePlus />
            </p>
          </Button>
        </DialogTrigger>
        <DialogContent className="w-[40%]">
          <DialogTitle>Thêm nhà cung cấp</DialogTitle>
          <DialogDescription asChild>
            <div>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit, (errors) => {
                    console.log("Lỗi validation:", errors);
                  })}
                  className="space-y-2"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="Name"
                      render={({ field }) => (
                        <FormItem>
                          <div className="font-semibold">Người đại diện</div>
                          <FormControl>
                            <Input placeholder="Nhập tên người đại diện" {...field} />
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
                          <div className="font-semibold">Địa chỉ email</div>
                          <FormControl>
                            <Input placeholder="Nhập địa chỉ mail" {...field} />
                          </FormControl>
                          <FormMessage className="text-error" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="Password"
                      render={({ field }) => (
                        <FormItem>
                          <div className="font-semibold">Mật khẩu</div>
                          <FormControl>
                            <Input placeholder="Nhập mật khẩu" {...field} />
                          </FormControl>
                          <FormMessage className="text-error" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="ConfirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <div className="font-semibold">Xác nhận lại</div>
                          <FormControl>
                            <Input placeholder="Nhập lại mật khẩu" {...field} />
                          </FormControl>
                          <FormMessage className="text-error" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="ApartmentProjectProviderName"
                    render={({ field }) => (
                      <FormItem>
                        <div className="font-semibold">Tên nhà cung cấp</div>
                        <FormControl>
                          <Input placeholder="Nhập tên cung cấp" {...field} />
                        </FormControl>
                        <FormMessage className="text-error" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="ApartmentProjectDescription"
                    render={({ field }) => (
                      <FormItem>
                        <div className="font-semibold">Thông tin mô tả</div>
                        <FormControl>
                          <Input placeholder="Nhập thông tin mô tả" {...field} />
                        </FormControl>
                        <FormMessage className="text-error" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="Location"
                    render={({ field }) => (
                      <FormItem>
                        <div className="font-semibold">Địa chỉ trụ sở</div>
                        <FormControl>
                          <Input placeholder="Nhập địa chỉ trụ sở" {...field} />
                        </FormControl>
                        <FormMessage className="text-error" />
                      </FormItem>
                    )}
                  />
                  {/* Quản lý hình ảnh */}
                  <div>
                    <div className="flex space-x-2 items-center">
                      {/* <h1 className="font-semibold">Hình ảnh căn hộ</h1> */}
                      <Button onClick={handleOpenFileImagePicker} variant="outline">
                        Chọn hình ảnh đại diện
                      </Button>
                    </div>

                    <div className="flex justify-start gap-5">
                      <FormField
                        control={form.control}
                        name="DiagramUrl"
                        render={({ field }) => {
                          return (
                            <FormItem className="w-3/5">
                              <FormControl>
                                <Input
                                  className="hidden"
                                  ref={inputImageRef}
                                  accept=".png,.jpg,.webp"
                                  type="file"
                                  multiple
                                  onChange={(e) => {
                                    handleFileChange(e);
                                    field.onChange(selectedImages); // Cập nhật giá trị form
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          );
                        }}
                      />
                    </div>
                    {imagePreviewUrl && (
                      <div className="mt-4">
                        <Image src={imagePreviewUrl} alt="Preview" width={80} height={80} />
                        <Button onClick={handleRemoveFile} variant="outline" className="mt-2">
                          Xóa ảnh
                        </Button>
                      </div>
                    )}
                  </div>

                  {errorMessage && (
                    <div className="text-red-500">
                      {errorMessage}
                    </div>
                  )}


                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      variant={"default"}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Đang tải file..." : "Xác nhận"}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AddNewProviderDialog;