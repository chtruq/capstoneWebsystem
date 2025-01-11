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
import { ProjectBulkFileSchema } from "@/lib/schema/projectFileSchema";
import Image from "next/image";
import { addProjectBulkFIle } from "@/app/actions/project";

interface Props {
  ProjectApartmentID: string;
}

type ImageType = {
  url?: string;
};
type VRVideoFile = {
  url?: string;
};

const AddProjectBulkFile: FC<Props> = ({ ProjectApartmentID }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [selectedImageFiles, setSelectedImageFiles] = useState<File[]>([]);
  const [selectedVRFiles, setSelectedVRFiles] = useState<File[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const inputImageRef = useRef<HTMLInputElement>(null);
  const inputVRRef = useRef<HTMLInputElement>(null);
  const pathName = usePathname();

  const validateFile = (file: File) => {
    const maxFileSize = 10 * 1024 * 1024; // 10MB
    const validMimeTypes = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
      "application/vnd.ms-excel", // .xls
    ];
    if (file.size > maxFileSize) {
      throw new Error("Dung lượng file không được vượt quá 10MB.");
    }
    if (!validMimeTypes.includes(file.type)) {
      throw new Error("Chỉ chấp nhận file định dạng xlsx, xls.");
    }
  };

  const validateZipOrRar = (file: File) => {
    const maxFileSize = 15 * 1024 * 1024; // 15MB
    const validMimeTypes = ["application/zip", "application/x-rar-compressed"];
    const validExtensions = ["zip", "rar"];
    const fileExtension = file.name.split(".").pop()?.toLowerCase();

    if (file.size > maxFileSize) {
      throw new Error("Dung lượng file không được vượt quá 15MB.");
    }

    if (!validMimeTypes.includes(file.type) && !validExtensions.includes(fileExtension || "")) {
      throw new Error("Chỉ chấp nhận file định dạng ZIP hoặc RAR.");
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

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const imageFilesArray = Array.from(event.target.files);

      try {
        imageFilesArray.forEach(validateZipOrRar);
        const updatedImageFiles = [...selectedImageFiles, ...imageFilesArray];
        setSelectedImageFiles(updatedImageFiles);
      } catch (error: any) {
        alert(error.message); // Hiển thị thông báo lỗi cho người dùng
        console.error("Error adding image files:", error);
      }
    }
  };

  const handleVRFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const vrFilesArray = Array.from(event.target.files);

      try {
        vrFilesArray.forEach(validateZipOrRar);
        const updatedVRFiles = [...selectedVRFiles, ...vrFilesArray];
        setSelectedVRFiles(updatedVRFiles);
      } catch (error: any) {
        alert(error.message); // Hiển thị thông báo lỗi cho người dùng
        console.error("Error adding VR files:", error);
      }
    }
  };

  // Quản lý file
  const handleOpenFilePicker = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (inputRef.current) {
      inputRef.current.click();
    }
  };
  const handleOpenFileImagePicker = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (inputImageRef.current) {
      inputImageRef.current.click();
    }
  };

  const handleOpenFileVRPicker = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (inputVRRef.current) {
      inputVRRef.current.click();
    }
  };

  // Xóa file
  const handleRemoveFile = () => {
    setSelectedFile(null); // Xóa file đã chọn
    form.setValue("file", null); // Đồng bộ với form
  };

  const handleRemoveImageFiles = (index: number) => {
    setSelectedImageFiles((prevFiles) => {
      const updatedFiles = prevFiles.filter((_, i) => i !== index);
      form.setValue("images", updatedFiles); // Đồng bộ với form
      return updatedFiles;
    });
  };

  const handleRemoveVRFiles = (index: number) => {
    setSelectedVRFiles((prevFiles) => {
      const updatedFiles = prevFiles.filter((_, i) => i !== index);
      form.setValue("vrFiles", updatedFiles); // Đồng bộ với form
      return updatedFiles;
    });
  };

  // Cập nhật form khi file thay đổi
  useEffect(() => {
    form.setValue("file", selectedFile); // Đồng bộ hóa sau khi trạng thái cập nhật
    form.setValue("images", selectedImageFiles); // Đồng bộ hóa sau khi trạng thái cập nhật
    form.setValue("vrFiles", selectedVRFiles); // Đồng bộ hóa sau khi trạng thái cập nhật
  }, [selectedFile, selectedImageFiles, selectedVRFiles]);

  const form = useForm<z.infer<typeof ProjectBulkFileSchema>>({
    resolver: zodResolver(ProjectBulkFileSchema),
    defaultValues: {
      file: "",
      description: "",
      expiryDate: "2025-10-10",
      projectApartmentId: ProjectApartmentID,
      images: [],
      vrFiles: [],
    },
  });

  const onSubmit = async (value: z.infer<typeof ProjectBulkFileSchema>) => {
    try {
      setIsSubmitting(true);
      const payload = { ...value, FileBulk: selectedFile };
      console.log("Payload in upload bulk file", payload);
      const response = await addProjectBulkFIle(payload);

      if (response?.status === 400) {
        console.error("API returned 400 error:", response.data);
        alert("API Error: " + (response.data.message || "Invalid request data")); // Thông báo lỗi cho người dùng
        return; // Dừng thực thi các hàm tiếp theo
      }

      console.log("Response in upload bulk file", response);
      setSelectedFile(null);
      setSelectedImageFiles([]);
      setSelectedVRFiles([]);
      form.reset();
      revalidateProjectPath(pathName);
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error creating project:", error);
      // Hiển thị thông báo lỗi từ API
      console.error("Error creating project:", error);
      alert(error || "An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const onClosed = () => {
    setIsDialogOpen(false);
    setSelectedFile(null);
    setSelectedImageFiles([]);
    setSelectedVRFiles([]);
    form.reset();
  };

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(open) => {
        setIsDialogOpen(open);
        if (!open) {
          onClosed();
        }
      }}
    >
      <DialogTrigger>
        <Button variant="outline">
          Danh sách bàn giao
          <span>
            <CombineCirlePlus />
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Thêm danh sách bàn giao</DialogTitle>
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
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <div className="font-semibold">Tài liệu bàn giao</div>
                        <FormControl>
                          <Input placeholder="Nhập tên danh sách" {...field} />
                        </FormControl>
                        <FormMessage className="text-error" />
                      </FormItem>
                    )}
                  />

                  <div>
                    <h1 className="font-semibold">File tài liệu</h1>
                    <FormField
                      control={form.control}
                      name="file"
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
                                accept=".xls,.xlsx"
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
                  </div>
                  <div className="grid grid-cols-1 divide-y divide-slate-600">
                    {selectedFile && (
                      <div className="relative">
                        <div className="flex justify-between items-center">
                          <p className="w-[90%] py-1">{selectedFile.name}</p>
                          <button
                            type="button"
                            onClick={handleRemoveFile}
                            className="w-6 h-6 bg-red-500 text-white flex text-center items-center justify-center rounded-full p-1"
                          >
                            <span className="text-sm">X</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                    <h1 className="font-semibold">File nén hình ảnh</h1>
                    <div className="flex justify-start gap-5">
                      <FormField
                        control={form.control}
                        name="images"
                        render={({ field }) => {
                          return (
                            <FormItem className="w-3/5">
                              <Button onClick={handleOpenFileImagePicker} variant="outline">
                                Chọn file hình ảnh ({selectedImageFiles.length} đã chọn)
                              </Button>

                              <FormControl>
                                <Input
                                  className="hidden"
                                  ref={inputImageRef}
                                  accept=".zip,.rar"
                                  type="file"
                                  multiple
                                  onChange={(e) => {
                                    handleImageChange(e);
                                    field.onChange(selectedImageFiles); // Cập nhật giá trị form
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          );
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedImageFiles.map((file, index) => (
                      <div key={index} className="relative">
                        <p className="text-sm">{file.name}</p>
                        <button
                          type="button"
                          onClick={() => handleRemoveImageFiles(index)}
                          className="absolute w-6 h-6 top-0 right-0 bg-red-500 text-white flex text-center items-center justify-center rounded-full p-1"
                        >
                          <span className="text-sm">X</span>
                        </button>
                      </div>
                    ))}
                  </div>

                  <div>
                    <h1 className="font-semibold">File nén hình ảnh VR</h1>
                    <div className="flex justify-start gap-5">
                      <FormField
                        control={form.control}
                        name="vrFiles"
                        render={({ field }) => {
                          return (
                            <FormItem className="w-3/5">
                              <Button onClick={handleOpenFileVRPicker} variant="outline">
                                Chọn file nén VR ({selectedVRFiles.length} đã chọn)
                              </Button>

                              <FormControl>
                                <Input
                                  className="hidden"
                                  ref={inputVRRef}
                                  accept=".zip,.rar"
                                  type="file"
                                  multiple
                                  onChange={(e) => {
                                    handleVRFileChange(e);
                                    field.onChange(selectedVRFiles); // Cập nhật giá trị form
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          );
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedVRFiles.map((file, index) => (
                      <div key={index} className="relative">
                        <p className="text-sm">{file.name}</p>
                        <button
                          type="button"
                          onClick={() => handleRemoveVRFiles(index)}
                          className="absolute w-6 h-6 top-0 right-0 bg-red-500 text-white flex text-center items-center justify-center rounded-full p-1"
                        >
                          <span className="text-sm">X</span>
                        </button>
                      </div>
                    ))}
                  </div>

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
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AddProjectBulkFile;
