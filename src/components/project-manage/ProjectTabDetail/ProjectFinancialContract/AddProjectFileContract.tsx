"use client"

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
import { usePathname } from "next/navigation";
import { projectFileSchema } from "@/lib/schema/projectFileSchema";
import { createProjectFileContract } from "@/app/actions/project";
import { se } from "date-fns/locale";

interface Props {
  ProjectApartmentID: string;
}


const AddProjectFileContract: FC<Props> = ({ ProjectApartmentID }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const pathName = usePathname();

  // console.log("ProjectApartmentID in add", ProjectApartmentID);


  const validateFile = (file: File) => {
    const maxFileSize = 10 * 1024 * 1024; // 10MB
    const validMimeTypes = [
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
      "application/msword", // .doc
      "application/pdf", // .pdf
    ];
    if (file.size > maxFileSize) {
      throw new Error("Dung lượng file không được vượt quá 10MB.");
    }
    if (!validMimeTypes.includes(file.type)) {
      throw new Error("Chỉ chấp nhận file định dạng doc, docx hoặc pdf.");
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0]; // Lấy file duy nhất được chọn

      try {
        validateFile(file); // Gọi hàm kiểm tra file
        setSelectedFile(file); // Lưu file vào state
        console.log("File in handleFileChange", file);

      } catch (error: any) {
        alert(error.message); // Hiển thị thông báo lỗi cho người dùng
        console.error("Error adding file:", error);
      }
    }
  };


  const handleOpenFilePicker = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null); // Xóa file đã chọn
    form.setValue("ProjectFileUrl", null); // Đồng bộ với form
  };

  useEffect(() => {
    form.setValue("ProjectFileUrl", selectedFile); // Đồng bộ hóa sau khi trạng thái cập nhật
  }, [selectedFile]);

  const form = useForm<z.infer<typeof projectFileSchema>>({
    resolver: zodResolver(projectFileSchema),
    defaultValues: {
      Description: "",
      ExpiryDate: "",
      ProjectApartmentID: ProjectApartmentID,
      ProjectFileUrl: "",
    },
  });

  const onSubmit = async (value: z.infer<typeof projectFileSchema>) => {
    try {
      setIsSubmitting(true);
      const payload = { ...value, ProjectFileUrl: selectedFile };
      console.log("Payload in create consignment", payload);
      const response = await createProjectFileContract(payload);
      console.log("Response in create consignment", response);
      setSelectedFile(null);
      form.reset();
      revalidateProjectPath(pathName);
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error creating project:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const onClosed = () => {
    form.reset();
    setSelectedFile(null);
    setIsDialogOpen(false);
  };

  return (
    <div>
      <Dialog open={isDialogOpen} onOpenChange={(open) => {
        setIsDialogOpen(open);
        if (!open) {
          onClosed();
        }
      }} >
        <DialogTrigger>
          <Button variant="outline">
            Thêm hợp đồng
            <span>
              <CombineCirlePlus />
            </span>
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Thêm hợp đồng thỏa thuận</DialogTitle>
            <DialogDescription asChild>
              <div>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit, (errors) => {
                      console.log("Lỗi validation:", errors);
                    })}
                    className="space-y-2"
                  >
                    <FormField
                      control={form.control}
                      name="Description"
                      render={({ field }) => (
                        <FormItem>
                          <div className="font-semibold">Nhập tên tài liệu</div>
                          <FormControl>
                            <Input placeholder="Nhập tên tài liệu" {...field} />
                          </FormControl>
                          <FormMessage className="text-error" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="ProjectFileUrl"
                      render={({ field }) => {
                        return (
                          <FormItem className="w-3/5">
                            <Button onClick={handleOpenFilePicker} variant="outline">
                              Chọn tài liệu
                            </Button>

                            <FormControl>
                              <Input
                                className="hidden"
                                ref={inputRef}
                                accept=".doc,.docx,.pdf"
                                type="file"
                                multiple
                                onChange={(e) => {
                                  handleFileChange(e);
                                  field.onChange(selectedFile); // Cập nhật giá trị form
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />
                    <div className="grid grid-cols-1 divide-y divide-slate-600">
                      {selectedFile && (
                        <div className="relative">
                          <div className="flex justify-between items-center">
                            {/* Nếu là File hoặc object từ API */}
                            <p className="w-[90%] py-1">
                              {selectedFile.name}
                            </p>
                            <button
                              type="button"
                              onClick={handleRemoveFile} // Chỉ cần hàm xử lý một file
                              className="w-6 h-6 bg-red-500 text-white flex text-center items-center justify-center rounded-full p-1"
                            >
                              <span className="text-sm">X</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex justify-end">
                      {/* <Button variant="default" type="submit">
                        Tạo hợp đồng
                      </Button> */}
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
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AddProjectFileContract;