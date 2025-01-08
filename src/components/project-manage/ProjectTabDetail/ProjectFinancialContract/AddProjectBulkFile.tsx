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
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [selectedVRImages, setSelectedVRImages] = useState<File[]>([]);
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
      throw new Error("Chỉ chấp nhận file định dạng doc, docx hoặc pdf.");
    }
  };

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
      const imagesArray = Array.from(event.target.files);

      try {
        imagesArray.forEach(validateImage);
        imagesArray.forEach(validateImage);
        const updatedImages = [...selectedImages, ...imagesArray];
        setSelectedImages(updatedImages);;
      } catch (error: any) {
        alert(error.message); // Hiển thị thông báo lỗi cho người dùng
        console.error("Error adding image:", error);
      }
    }
  };

  const handleVRImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const vrImagesArray = Array.from(event.target.files);

      try {
        vrImagesArray.forEach(validateImage);
        vrImagesArray.forEach(validateImage);
        const updatedVRImages = [...selectedVRImages, ...vrImagesArray];
        setSelectedVRImages(updatedVRImages);;
      } catch (error: any) {
        alert(error.message); // Hiển thị thông báo lỗi cho người dùng
        console.error("Error adding image:", error);
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


  //Xóa file
  const handleRemoveFile = () => {
    setSelectedFile(null); // Xóa file đã chọn
    form.setValue("file", null); // Đồng bộ với form
  };

  const handleRemoveImages = (index: number) => {
    setSelectedImages((prevImages) => {
      const updatedImages = prevImages.filter((_, i) => i !== index);
      form.setValue("images", updatedImages); // Đồng bộ với form
      return updatedImages;
    });
  };

  const handleRemoveVRImages = (index: number) => {
    setSelectedVRImages((prevVRImages) => {
      const updatedVRImages = prevVRImages.filter((_, i) => i !== index);
      form.setValue("vrFiles", updatedVRImages); // Đồng bộ với form
      return updatedVRImages;
    });
  };


  //Cập nhật form khi file thay đổi
  useEffect(() => {
    form.setValue("file", selectedFile); // Đồng bộ hóa sau khi trạng thái cập nhật
    form.setValue("images", selectedImages); // Đồng bộ hóa sau khi trạng thái cập nhật
    form.setValue("vrFiles", selectedVRImages); // Đồng bộ hóa sau khi trạng thái cập nhật
  }, [selectedFile, selectedImages, selectedVRImages]);


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
      console.log("Payload in uplaod bulk file", payload);
      const response = await addProjectBulkFIle(payload);
      console.log("Response in upload bulk file", response);
      setSelectedFile(null);
      setSelectedImages([]);
      setSelectedVRImages([]);
      form.reset();
      revalidateProjectPath(pathName);
      setIsSubmitting(false);
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error creating project:", error);
    } finally {
    }
  };

  const onClosed = () => {
    // form.reset();
    // setSelectedFile(null);
    setIsDialogOpen(false);
  };

  return (
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
      <DialogContent className="max-w-3xl">
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
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <div className="font-semibold">Tài liệu hợp đồng</div>
                        <FormControl>
                          <Input placeholder="Nhập tên danh sách" {...field} />
                        </FormControl>
                        <FormMessage className="text-error" />
                      </FormItem>
                    )}
                  />

                  <div>
                    <h1 className="font-semibold">Hình ảnh căn hộ</h1>
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

                  {/* Quản lý hình ảnh */}
                  <div>
                    <h1 className="font-semibold">Hình ảnh căn hộ</h1>
                    <div className="flex justify-start gap-5">
                      <FormField
                        control={form.control}
                        name="images"
                        render={({ field }) => {
                          return (
                            <FormItem className="w-3/5">
                              <Button onClick={handleOpenFileImagePicker} variant="outline">
                                Chọn hình ảnh ({selectedImages.length} đã chọn)
                              </Button>

                              <FormControl>
                                <Input
                                  className="hidden"
                                  ref={inputImageRef}
                                  accept=".png,.jpg,.webp"
                                  type="file"
                                  multiple
                                  onChange={(e) => {
                                    handleImageChange(e);
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
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedImages.map((image, index) => {
                      // Check if the image is a File or an object from the API response
                      const imageUrl =
                        typeof image === "string" // If it's already a URL string
                          ? image
                          : image instanceof File // If it's a File object
                            ? URL?.createObjectURL(image)
                            : (image as ImageType).url; // If it's an object from the API

                      return (
                        <div key={index} className="relative">
                          <Image
                            src={imageUrl || ""} // Use the resolved URL
                            alt={`selected ${index}`}
                            className="w-16 h-16 object-cover"
                            width={128}
                            height={128}
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveImages(index)}
                            className="absolute w-6 h-6 top-0 right-0 bg-red-500 text-white flex text-center items-center justify-center rounded-full p-1"
                          >
                            <span className="text-sm">X</span>
                          </button>
                        </div>
                      );
                    })}
                  </div>

                  {/* Quản lý hình ảnh VR */}
                  <div>
                    <h1 className="font-semibold">Hình ảnh VR dự án</h1>
                    <div className="flex justify-start gap-5">
                      <FormField
                        control={form.control}
                        name="vrFiles"
                        render={({ field }) => {
                          return (
                            <FormItem className="w-3/5">
                              <Button onClick={handleOpenFileVRPicker} variant="outline">
                                Chọn hình ảnh VR ({selectedVRImages.length} đã chọn)
                              </Button>

                              <FormControl>
                                <Input
                                  className="hidden"
                                  ref={inputVRRef}
                                  accept=".png,.jpg,.webp"
                                  type="file"
                                  multiple
                                  onChange={(e) => {
                                    handleVRImageChange(e);
                                    field.onChange(selectedVRImages); // Cập nhật giá trị form
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
                    {selectedVRImages.map((image, index) => {
                      // Check if the image is a File or an object from the API response
                      const imageUrl =
                        typeof image === "string" // If it's already a URL string
                          ? image
                          : image instanceof File // If it's a File object
                            ? URL?.createObjectURL(image)
                            : (image as VRVideoFile).url; // If it's an object from the API

                      return (
                        <div key={index} className="relative">
                          <Image
                            src={imageUrl || ""} // Use the resolved URL
                            alt={`selected ${index}`}
                            className="w-16 h-16 object-cover"
                            width={128}
                            height={128}
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveVRImages(index)}
                            className="absolute w-6 h-6 top-0 right-0 bg-red-500 text-white flex text-center items-center justify-center rounded-full p-1"
                          >
                            <span className="text-sm">X</span>
                          </button>
                        </div>
                      );
                    })}
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
  )
}

export default AddProjectBulkFile;






