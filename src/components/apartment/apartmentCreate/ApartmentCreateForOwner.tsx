"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { apartmentSchema } from "@/lib/schema/apartmentSchema";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import React, { FC, useState, useEffect, useRef } from "react";
import { z } from "zod";
import { vi } from "date-fns/locale";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";

import { usePathname } from "next/navigation";
import { revalidateProjectPath } from "@/app/actions/revalidate";
import { useRouter } from "next/navigation";
import { apartmentOwnerSchema } from "@/lib/schema/apartmentOwnerSchema";
import { createApartmentForOwner } from "@/app/actions/apartment";

interface Props {
  PropertyVerificationID: string;
  data?: Apartment;
}

type ImageType = {
  url?: string;
};
type VRVideoFile = {
  url?: string;
};

const ApartmentCreateForOwner: FC<Props> = ({ PropertyVerificationID, data }) => {
  console.log("PropertyVerificationID", PropertyVerificationID);


  const form = useForm<z.infer<typeof apartmentOwnerSchema>>({
    resolver: zodResolver(apartmentOwnerSchema),
    defaultValues: {
      ApartmentName: "",
      Description: "",
      Address: "",
      Area: "",
      District: "",
      Ward: "",
      NumberOfRooms: "",
      NumberOfBathrooms: "",
      Location: "",
      Direction: 1,
      ApartmentType: 1,
      BalconyDirection: 1,
      Building: "",
      Floor: "",
      RoomNumber: "",
      PropertyVerificationID: PropertyVerificationID,
      ProjectApartmentID: "404e6595-9ac2-4969-8bf7-5cf8f74731b2",
      Images: [],
      VRVideoFile: [],
    },
  });

  const router = useRouter();
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [selectedVRImages, setSelectedVRImages] = useState<File[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const inputVRRef = useRef<HTMLInputElement>(null);

  const pathname = usePathname();
  // console.log("Original pathname:", pathname);

  const newPathname = pathname.split("/").slice(0, -2).join("/");
  // console.log("Updated pathname:", newPathname);

  const validateFile = (file: File) => {
    const maxFileSize = 15 * 1024 * 1024; // 15MB
    const validMimeTypes = ["image/jpeg", "image/png"];
    if (file.size > maxFileSize) {
      throw new Error("Dung lượng file không được vượt quá 15MB.");
    }
    if (!validMimeTypes.includes(file.type)) {
      throw new Error("Chỉ chấp nhận file định dạng JPEG hoặc PNG.");
    }
  };

  // handle image change
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const imagesArray = Array.from(event.target.files);

      try {
        imagesArray.forEach(validateFile);
        imagesArray.forEach(validateFile);
        const updatedImages = [...selectedImages, ...imagesArray];
        setSelectedImages(updatedImages);;
      } catch (error: any) {
        alert(error.message); // Hiển thị thông báo lỗi cho người dùng
        console.error("Error adding image:", error);
      }
    }
  };

  useEffect(() => {
    form.setValue("Images", selectedImages); // Đồng bộ hóa sau khi trạng thái cập nhật
  }, [selectedImages]);

  const handleRemoveImages = (index: number) => {
    setSelectedImages((prevImages) => {
      const updatedImages = prevImages.filter((_, i) => i !== index);
      form.setValue("Images", updatedImages); // Đồng bộ với form
      return updatedImages;
    });
  };

  // handle VR image change
  const handleVRImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const vrImagesArray = Array.from(event.target.files);

      try {
        vrImagesArray.forEach(validateFile);
        vrImagesArray.forEach(validateFile);
        const updatedVRImages = [...selectedVRImages, ...vrImagesArray];
        setSelectedVRImages(updatedVRImages);;
      } catch (error: any) {
        alert(error.message); // Hiển thị thông báo lỗi cho người dùng
        console.error("Error adding image:", error);
      }
    }
  };

  useEffect(() => {
    form.setValue("VRVideoFile", selectedVRImages); // Đồng bộ hóa sau khi trạng thái cập nhật
  }, [selectedVRImages]);

  const handleRemoveVRImages = (index: number) => {
    setSelectedVRImages((prevVRImages) => {
      const updatedVRImages = prevVRImages.filter((_, i) => i !== index);
      form.setValue("VRVideoFile", updatedVRImages); // Đồng bộ với form
      return updatedVRImages;
    });
  };

  // Open file picker
  const handleOpenFilePicker = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleOpenFileVRPicker = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (inputVRRef.current) {
      inputVRRef.current.click();
    }
  };

  // Add lable for the form
  const direction = [
    { label: "Đông", value: 1 },
    { label: "Tây", value: 2 },
    { label: "Nam", value: 3 },
    { label: "Bắc", value: 4 },
    { label: "Đông Nam", value: 5 },
    { label: "Đông Bắc", value: 6 },
    { label: "Tây Nam", value: 7 },
    { label: "Tây Bắc", value: 8 },
  ];

  const typeApt = [
    { label: "Căn hộ truyền thống", value: 1 },
    { label: "Penthouse", value: 2 },
    { label: "Duplex", value: 3 },
    { label: "Shophouse", value: 4 },
    { label: "Studio", value: 5 },
    { label: "Officetel", value: 6 },
  ];

  // useEffect(() => {
  //   console.log("Dữ liệu trong form:", form.watch());
  // }, [form.watch()]);

  const onSubmit = async (value: z.infer<typeof apartmentOwnerSchema>) => {
    console.log("Values received:", value);
    try {
      const payload = { ...value, Images: selectedImages, VRVideoFiles: selectedVRImages };
      console.log("Payload in create apartment for owner", payload);

      if (data) {
        // const res = await updateProject(data.projectApartmentID, payload);
        // console.log("Update project successfully", res);
      } else {
        console.log("Create apartment for owner payload", payload);
        const res = await createApartmentForOwner(payload);
        console.log("Create apartment for owner successfully", res);
        form.reset();
        setSelectedImages([]);
        setSelectedVRImages([]);
        router.push(newPathname);
        // router.refresh();

      }
    } catch (error) {
      console.error("Error creating apartment for owner:", error);
    }
  };


  return (
    <>
      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit, (errors) => {
              console.log("Lỗi validation:", errors);
            })}
            className="space-y-8"
          >
            <h1 className="font-semibold">Thông tin dự án</h1>

            <div className="flex justify-between gap-4">
              <div className="flex justify-start w-1/2 items-center gap-2">
                <span className="text-blur text-sm w-1/5">Tên căn hộ</span>
                <FormField
                  control={form.control}
                  name="ApartmentName"
                  render={({ field }) => (
                    <FormItem className="w-3/5">
                      <FormControl>
                        <Input placeholder="Nhập tên căn hộ" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex justify-start w-1/2 items-center gap-2">
                <span className="text-blur text-sm w-1/5">Tòa</span>
                <FormField
                  control={form.control}
                  name="Building"
                  render={({ field }) => (
                    <FormItem className="w-3/5">
                      <FormControl>
                        <Input placeholder="Nhập tòa của căn hộ" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="flex justify-between gap-4">
              <div className="flex justify-start w-1/2 items-center gap-2">
                <span className="text-blur text-sm w-1/5">Kiểu căn hộ</span>
                <FormField
                  control={form.control}
                  name="ApartmentType"
                  render={({ field }) => (
                    <FormItem className="w-3/5">
                      <FormControl>
                        <Select
                          {...field}
                          value={field.value?.toString() ?? ""}
                          onValueChange={(value) => field.onChange(Number(value))}
                        >
                          <SelectTrigger className="">
                            <SelectValue placeholder="Chọn kiểu căn hộ" />
                          </SelectTrigger>
                          <SelectContent>
                            {typeApt.map((type) => (
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
              <div className="flex justify-start w-1/2 items-center gap-2">
                <span className="text-blur text-sm w-1/5">Tầng</span>
                <FormField
                  control={form.control}
                  name="Floor"
                  render={({ field }) => (
                    <FormItem className="w-3/5">
                      <FormControl>
                        <Input
                          placeholder="Nhập số tầng của căn hộ"
                          {...field}
                          type="number"
                          inputMode="numeric"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="flex justify-between gap-4">
              <div className="flex justify-start w-1/2 items-center gap-2">
                <span className="text-blur text-sm w-1/5">
                  Diện tích căn hộ (m²)
                </span>
                <FormField
                  control={form.control}
                  name="Area"
                  render={({ field }) => (
                    <FormItem className="w-3/5">
                      <FormControl>
                        <Input
                          placeholder="Nhập diện tích căn hộ"
                          {...field}
                          type="number"
                          inputMode="numeric"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex justify-start w-1/2 items-center gap-2">
                <span className="text-blur text-sm w-1/5">Số phòng</span>
                <FormField
                  control={form.control}
                  name="RoomNumber"
                  render={({ field }) => (
                    <FormItem className="w-3/5">
                      <FormControl>
                        <Input
                          placeholder="Nhập số phòng căn hộ"
                          {...field}
                          type="number"
                          inputMode="numeric"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="flex justify-between gap-4">
              <div className="flex justify-start w-1/2 items-center gap-2">
                <span className="text-blur text-sm w-1/5">Số phòng ngủ</span>
                <FormField
                  control={form.control}
                  name="NumberOfRooms"
                  render={({ field }) => (
                    <FormItem className="w-3/5">
                      <FormControl>
                        <Input
                          placeholder="Nhập số lượng phòng ngủ"
                          {...field}
                          type="number"
                          inputMode="numeric"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex justify-start w-1/2 items-center gap-2">
                <span className="text-blur text-sm w-1/5">Hướng nhà</span>
                <FormField
                  control={form.control}
                  name="Direction"
                  render={({ field }) => (
                    <FormItem className="w-3/5">
                      <FormControl>
                        <Select
                          {...field}
                          value={field.value?.toString() ?? ""}
                          onValueChange={(value) => field.onChange(Number(value))}
                        >
                          <SelectTrigger className="">
                            <SelectValue placeholder="Chọn hướng nhà" />
                          </SelectTrigger>
                          <SelectContent>
                            {direction.map((type) => (
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
            </div>

            <div className="flex justify-between gap-4">
              <div className="flex justify-start w-1/2 items-center gap-2">
                <span className="text-blur text-sm w-1/5">Số nhà tắm</span>
                <FormField
                  control={form.control}
                  name="NumberOfBathrooms"
                  render={({ field }) => (
                    <FormItem className="w-3/5">
                      <FormControl>
                        <Input
                          placeholder="Nhập số lượng phòng nhà tắm"
                          {...field}
                          type="number"
                          inputMode="numeric"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex justify-start w-1/2 items-center gap-2">
                <span className="text-blur text-sm w-1/5">Hướng nhà</span>
                <FormField
                  control={form.control}
                  name="BalconyDirection"
                  render={({ field }) => (
                    <FormItem className="w-3/5">
                      <FormControl>
                        <Select
                          {...field}
                          value={field.value?.toString() ?? ""}
                          onValueChange={(value) => field.onChange(Number(value))}
                        >
                          <SelectTrigger className="">
                            <SelectValue placeholder="Chọn hướng ban công" />
                          </SelectTrigger>
                          <SelectContent>
                            {direction.map((type) => (
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
            </div>

            <div className="flex justify-between gap-4">
              <div className="flex justify-start w-1/2 items-center gap-2">
                <span className="text-blur text-sm w-1/5">Địa chỉ</span>
                <FormField
                  control={form.control}
                  name="Address"
                  render={({ field }) => (
                    <FormItem className="w-3/5">
                      <FormControl>
                        <Input placeholder="Nhập địa chỉ" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="flex justify-start gap-4 ">
              <div className="w-3/4">
                <h1 className="font-semibold">Thông tin mô tả</h1>
                <FormField
                  control={form.control}
                  name="Description"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder="Nhập mô tả căn hộ"
                          {...field}
                          rows={6}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Quản lý hình ảnh */}
            <div>
              <h1 className="font-semibold">Hình ảnh căn hộ</h1>
              <div className="flex justify-start gap-5">
                <FormField
                  control={form.control}
                  name="Images"
                  render={({ field }) => {
                    return (
                      <FormItem className="w-3/5">
                        <Button onClick={handleOpenFilePicker} variant="outline">
                          Chọn hình ảnh ({selectedImages.length} đã chọn)
                        </Button>

                        <FormControl>
                          <Input
                            className="hidden"
                            ref={inputRef}
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
                      className="w-32 h-32 object-cover"
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
                  name="VRVideoFile"
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
                      className="w-32 h-32 object-cover"
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
            <Button
              variant="outline"
              type="submit"
              onClick={() => {
                console.log("Form data:", form.getValues());
              }}
            >
              Tạo căn hộ
            </Button>

          </form>
        </Form>
      </div>
    </>
  );
}

export default ApartmentCreateForOwner;