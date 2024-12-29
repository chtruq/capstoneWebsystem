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
import {
  createApartment,
  createMultipleApartment,
} from "@/app/actions/apartment";
import { usePathname, useRouter } from "next/navigation";
import { revalidateProjectPath } from "@/app/actions/revalidate";

interface Props {
  projectId: string;
  staffId: string;
  data?: Apartment;
}

type ImageType = {
  url?: string;
};

const ApartmentCreate: FC<Props> = ({ data, projectId, staffId }) => {
  console.log("Project id in createapt:", projectId);
  console.log("Staff id increate apt:", staffId);
  console.log("Data in create apt:", data);

  const form = useForm<z.infer<typeof apartmentSchema>>({
    resolver: zodResolver(apartmentSchema),
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
      Price: "",
      EffectiveDate: "",
      ExpiryDate: "",
      ApartmentType: 1,
      BalconyDirection: 1,
      Building: "",
      Floor: "",
      RoomNumber: "",
      ProjectApartmentID: projectId,
      Images: [],
      VRVideoFile: "nossne",
      AssignedAccountID: staffId,
      Quantity: null,
    },
  });

  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const validateFile = (file: File) => {
    const maxFileSize = 5 * 1024 * 1024; // 5MB
    const validMimeTypes = ["image/jpeg", "image/png"];
    if (file.size > maxFileSize) {
      throw new Error("Dung lượng file không được vượt quá 5MB.");
    }
    if (!validMimeTypes.includes(file.type)) {
      throw new Error("Chỉ chấp nhận file định dạng JPEG hoặc PNG.");
    }
  };

  const pathname = usePathname();
  console.log("Original pathname:", pathname);

  const newPathname = pathname.split("/").slice(0, -1).join("/") + "/detail";

  console.log("Updated pathname:", newPathname);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);

      try {
        filesArray.forEach(validateFile);
        setSelectedImages((prevImages) => {
          const updatedImages = [...prevImages, ...filesArray];
          form.setValue("Images", updatedImages); // Đồng bộ với form
          return updatedImages;
        });
      } catch (error) {
        console.error("Error adding image:", error);
      }
    }
  };

  const handleRemoveImage = (index: number) => {
    setSelectedImages((prevImages) => {
      const updatedImages = prevImages.filter((_, i) => i !== index);
      form.setValue("Images", updatedImages); // Đồng bộ với form
      return updatedImages;
    });
  };

  const handleOpenFilePicker = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  useEffect(() => {
    if (data?.images?.length) {
      const validImages = data.images.filter((image) => image instanceof File);
      setSelectedImages(validImages);
    }
  }, [data]);

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

  const router = useRouter();

  const onSubmit = async (value: z.infer<typeof apartmentSchema>) => {
    try {
      const payload = { ...value, Images: selectedImages };
      console.log("quantity", value.Quantity);
      console.log("Payload:", payload);
      // Kiểm tra lỗi của form
      const errors = form.formState.errors;
      if (Object.keys(errors).length > 0) {
        console.log("Form validation errors:", errors); // In ra lỗi từ zod
        return; // Dừng lại nếu có lỗi
      }
      if (data) {
        // const res = await updateProject(data.projectApartmentID, payload);
        // console.log("Update apartment successfully", res);
      } else {
        if (value.Quantity) {
          console.log("Payload create multi apt:", payload);
          setIsDialogOpen(false);
          await createMultipleApartment(payload);
          router.push(newPathname);
          router.refresh();
        } else {
          console.log("Payload create single apt:", payload);
          await createApartment(payload);
          revalidateProjectPath(newPathname);
          router.push(newPathname);
          router.refresh();
        }
        revalidateProjectPath(newPathname);
      }
      // revalidateProjectPath("/manager/dashboard/project-manage");
    } catch (error) {
      console.log("Error creating apartment:", error);
      console.error("Error creating apartment:", error);
    }
  };

  return (
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
              <span className="text-blur text-sm w-1/5">Giá trị căn hộ</span>
              <FormField
                control={form.control}
                name="Price"
                render={({ field }) => (
                  <FormItem className="w-3/5">
                    <FormControl>
                      <Input
                        placeholder="Nhập giá trị căn hộ"
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
              <span className="text-blur text-sm w-1/5">Ngày hiệu lực</span>
              <FormField
                control={form.control}
                name="EffectiveDate"
                render={({ field }) => (
                  <FormItem className="w-3/5">
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(new Date(field.value), "PPP", {
                                locale: vi,
                              })
                            ) : (
                              <span> Chọn ngày hiệu lực </span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          captionLayout="dropdown-buttons"
                          mode="single"
                          selected={
                            field.value ? new Date(field.value) : undefined
                          }
                          onSelect={(date) =>
                            field.onChange(date?.toISOString())
                          }
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                          locale={vi}
                        />
                      </PopoverContent>
                    </Popover>

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
            <div className="flex justify-start w-1/2 items-center gap-2">
              <span className="text-blur text-sm w-1/5">Ngày hết hạn</span>
              <FormField
                control={form.control}
                name="ExpiryDate"
                render={({ field }) => (
                  <FormItem className="w-3/5">
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(new Date(field.value), "PPP", {
                                locale: vi,
                              })
                            ) : (
                              <span>Chọn ngày hết hạn</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          captionLayout="dropdown-buttons"
                          mode="single"
                          selected={
                            field.value ? new Date(field.value) : undefined
                          }
                          onSelect={(date) =>
                            field.onChange(date?.toISOString())
                          }
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                          locale={vi}
                        />
                      </PopoverContent>
                    </Popover>

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
          <div>
            <h1 className="font-semibold">Hình ảnh dự án</h1>
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
                          accept="image/*"
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
                    onClick={() => handleRemoveImage(index)}
                    className="absolute w-6 h-6 top-0 right-0 bg-red-500 text-white flex text-center items-center justify-center rounded-full p-1"
                  >
                    <span className="text-sm">X</span>
                  </button>
                </div>
              );
            })}
          </div>

          {!data ? (
            <>
              <div className="flex space-x-4">
                <Button
                  variant="outline"
                  type="submit"
                  onClick={() => {
                    console.log("Form data:", form.getValues());
                  }}
                >
                  Tạo căn hộ
                </Button>

                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline">Tạo nhiều bản sao</Button>
                  </DialogTrigger>

                  <DialogContent className="w-[24rem]">
                    <DialogHeader>
                      <DialogTitle>
                        Nhập số lượng mà bạn muốn sao chép{" "}
                      </DialogTitle>
                      <FormField
                        control={form.control}
                        name="Quantity"
                        render={({ field }) => (
                          <FormItem>
                            {/* <span className="text-sm text-blur">
                        Số lượng sao chép
                      </span> */}
                            <FormControl>
                              <Input
                                placeholder="Nhập số lượng sao chép"
                                {...field}
                                type="number"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        variant="outline"
                        onClick={form.handleSubmit(onSubmit)}
                      >
                        Xác nhận
                      </Button>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </div>
            </>
          ) : (
            <Button
              variant="outline"
              type="submit"
              onClick={() => {
                console.log("Form data:", form.getValues());
              }}
            >
              Cập nhật căn hộ
            </Button>
          )}
        </form>
      </Form>
    </div>
  );
};
export default ApartmentCreate;
