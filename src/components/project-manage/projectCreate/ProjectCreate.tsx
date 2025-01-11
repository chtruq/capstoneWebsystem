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
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { projectSchema, projectUpdateSchema } from "@/lib/schema/projectSchema";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, Check, ChevronDown } from "lucide-react";
import React, { FC, useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { vi } from "date-fns/locale";
import { Textarea } from "@/components/ui/textarea";
import { MultiSelect } from "@/components/ui/multi-select";
import Image from "next/image";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { createProject, updateProject } from "@/app/actions/project";
import { revalidateProjectPath } from "@/app/actions/revalidate";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface Props {
  facilities: Facility[];
  teams: Team[];
  providers: Provider[];
  data?: Project;
}

interface ImageType {
  url: string;
  description?: string;
}

const ProjectCreate: FC<Props> = ({ facilities, teams, providers, data }) => {
  console.log("data of projects", data);
  const router = useRouter();
  const pathname = usePathname();
  // console.log("Original pathname:", pathname);

  const newPathname = pathname.split("/").slice(0, -1).join("/");
  // console.log("Updated pathname:", newPathname);

  const form = useForm<
    z.infer<typeof projectSchema | typeof projectUpdateSchema>
  >({
    resolver: zodResolver(data ? projectUpdateSchema : projectSchema),
    defaultValues: data
      ? {
          ProjectApartmentName: data.projectApartmentName || "",
          ProjectApartmentDescription: data.projectApartmentDescription || "",
          Price_range: "2 - 10tỷ",
          ApartmentArea: data.apartmentArea?.toString() || "",
          ProjectArea: data.projectArea || "",
          ProjectSize: data.projectSize?.toString() || "",
          ConstructionStartYear: data.constructionStartYear || "",
          ConstructionEndYear: data.constructionEndYear || "",
          Address: data.address || "",
          AddressUrl: data.addressUrl || "",
          TotalApartment: data.totalApartment?.toString() || "",
          LicensingAuthority: data.licensingAuthority || "",
          LicensingDate: data.licensingDate
            ? new Date(data.licensingDate).toISOString()
            : "",
          ApartmentProjectProviderID: data.apartmentProjectProviderID || "",
          ProjectType: data.projectType === "projectType" ? 2 : 3,
          TeamID: data.teamID || "",
        }
      : {
          ProjectApartmentName: "",
          ProjectApartmentDescription: "",
          Price_range: "2 - 10tỷ",
          ApartmentArea: "",
          ProjectArea: "",
          ProjectSize: "",
          ConstructionStartYear: "",
          ConstructionEndYear: "",
          Address: "",
          AddressUrl: "",
          TotalApartment: "",
          LicensingAuthority: "",
          LicensingDate: "",
          ApartmentProjectProviderID: "",
          FacilityIDs: [],
          ProjectType: 0,
          TeamID: "",
          Images: [],
        },
  });

  const [open, setOpen] = useState(false);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
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
    if (data?.projectImages?.length) {
      const validImages = data.projectImages.filter(
        (image) => image instanceof File
      );
      setSelectedImages(validImages);
    }
  }, [data]);

  const projectType = [
    { label: "Đang mở bán", value: 2 },
    { label: "Đã bàn giao", value: 3 },
  ];

  const onSubmit = async (
    value: z.infer<typeof projectSchema | typeof projectUpdateSchema>
  ) => {
    try {
      const payload = data
        ? { ...value } // Omit Images and FacilityIDs for updates
        : { ...value, Images: selectedImages };
      console.log("Create project payload", payload);
      if (data) {
        const res = await updateProject(data.projectApartmentID, payload);
        // window.location.href = newPathname;
        if (res) {
          router.back();
          toast.success("Cập nhật dự án thành công");
        }

        // console.log("Update project successfully", res);
      } else {
        const res = await createProject(payload);
        console.log("Create project successfully", res);
        // router.push(newPathname);
        window.location.href = newPathname;
      }
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  useEffect(() => {
    if (data?.projectImages?.length) {
      const validImages = data.projectImages.filter(
        (image) => image instanceof File
      ) as File[];
      setSelectedImages(validImages); // Nếu có URL của hình ảnh, bạn có thể lưu trực tiếp URL hoặc xử lý khác.
    }
  }, [data]);

  useEffect(() => {
    form.setValue("Price_range", "2 - 10");
  }, []);

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={
            data
              ? form.handleSubmit(onSubmit, (errors) => {
                  console.log("Lỗi validation:", errors);
                })
              : form.handleSubmit(onSubmit, (errors) => {
                  console.log("Lỗi validation:", errors);
                })
          }
          className="space-y-8"
        >
          <h1 className="font-semibold">Thông tin dự án</h1>
          <div className="flex justify-between gap-4">
            <div className="flex justify-start w-1/2 items-center gap-5">
              <span className="text-blur text-sm w-1/5">Tên dự án</span>
              <FormField
                control={form.control}
                name="ProjectApartmentName"
                render={({ field }) => (
                  <FormItem className="w-3/5">
                    <FormControl>
                      <Input placeholder="Nhập tên dự án" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-start w-1/2 items-center gap-5">
              <span className="text-blur text-sm w-1/5">Diện tích căn hộ</span>
              <FormField
                control={form.control}
                name="ApartmentArea"
                render={({ field }) => (
                  <FormItem className="w-3/5">
                    <FormControl>
                      <Input
                        placeholder="Nhập diện tích căn hộ (vd:44 - 55 m2)"
                        {...field}
                        value={field.value ?? ""}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex justify-between  gap-4">
            <div className="flex justify-start w-1/2 items-center gap-5">
              <span className="text-blur text-sm w-1/5">Nhà cung cấp</span>
              <FormField
                control={form.control}
                name="ApartmentProjectProviderID"
                render={({ field }) => (
                  <FormItem className="w-3/5">
                    <FormControl>
                      <Popover {...field} open={open} onOpenChange={setOpen}>
                        <PopoverTrigger className="" asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className="justify-start w-full pl-3 text-left font-normal"
                          >
                            {field.value
                              ? providers.find(
                                  (provider) =>
                                    provider.apartmentProjectProviderID ===
                                    field.value
                                )?.apartmentProjectProviderName
                              : "Chọn nhà cung cấp"}
                            <ChevronDown className="items-end ml-2 h-4 w-4 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className=" p-0">
                          <Command className="w-full">
                            <CommandInput placeholder="Tìm kiếm nhà cung cấp" />
                            <CommandList>
                              <CommandEmpty>
                                Không tìm bất kì nhà cung cấp nào.
                              </CommandEmpty>
                              <CommandGroup className="w-full">
                                {providers.map((provider) => (
                                  <CommandItem
                                    key={provider.apartmentProjectProviderID}
                                    value={
                                      provider.apartmentProjectProviderName
                                    }
                                    onSelect={() => {
                                      field.onChange(
                                        provider.apartmentProjectProviderID
                                      );
                                      setOpen(false);
                                    }}
                                    className="w-full"
                                  >
                                    {provider.apartmentProjectProviderName}
                                    <Check
                                      className={cn(
                                        "items-end h-4 w-4",
                                        field.value ===
                                          provider.apartmentProjectProviderID
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-start w-1/2 items-center gap-5">
              <span className="text-blur text-sm w-1/5">Quy mô dự án</span>
              <FormField
                control={form.control}
                name="ProjectSize"
                render={({ field }) => (
                  <FormItem className="w-3/5">
                    <FormControl>
                      <Input
                        placeholder="Quy mô dự án (vd: 4 toà)"
                        {...field}
                        value={field.value ?? ""}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex justify-between  gap-4">
            <div className="flex justify-start w-1/2 items-center gap-5">
              <span className="text-blur text-sm w-1/5">Trạng thái</span>
              <FormField
                control={form.control}
                name="ProjectType"
                render={({ field }) => (
                  <FormItem className="w-3/5">
                    <FormControl>
                      <Select
                        {...field}
                        value={field.value?.toString() ?? ""}
                        onValueChange={(value) => field.onChange(Number(value))}
                      >
                        <SelectTrigger className="">
                          <SelectValue placeholder="Chọn trạng thái của dự án" />
                        </SelectTrigger>
                        <SelectContent>
                          {projectType.map((type) => (
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
            <div className="flex justify-start w-1/2 items-center gap-5">
              <span className="text-blur text-sm w-1/5">Năm khởi công</span>
              <FormField
                control={form.control}
                name="ConstructionStartYear"
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
                              <span>Chọn năm khởi công </span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          captionLayout="dropdown-buttons"
                          fromYear={1990}
                          toYear={new Date().getFullYear() + 4}
                          mode="single"
                          selected={
                            field.value ? new Date(field.value) : undefined
                          }
                          onSelect={(date) =>
                            field.onChange(date?.toISOString())
                          }
                          disabled={(date) => date < new Date("1900-01-01")}
                          fromDate={new Date(1990, 0, 1)} // Đặt ngày bắt đầu
                          toDate={
                            new Date(new Date().getFullYear() + 4, 11, 31)
                          } // Đặt ngày kết thúc
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

          <div className="flex justify-between  gap-4">
            <div className="flex justify-start w-1/2 items-center gap-5">
              <span className="text-blur text-sm w-1/5">
                Diện tích dự án(ha)
              </span>
              <FormField
                control={form.control}
                name="ProjectArea"
                render={({ field }) => (
                  <FormItem className="w-3/5">
                    <FormControl>
                      <Input
                        placeholder="Nhập diện tích dự án(ha)"
                        type="number"
                        {...field}
                        value={field.value ?? ""}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-start w-1/2 items-center gap-5">
              <span className="text-blur text-sm w-1/5">Năm bàn giao</span>
              <FormField
                control={form.control}
                name="ConstructionEndYear"
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
                              <span>Chọn năm bàn giao</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          captionLayout="dropdown-buttons"
                          fromYear={1990}
                          toYear={new Date().getFullYear() + 4}
                          mode="single"
                          selected={
                            field.value ? new Date(field.value) : undefined
                          }
                          onSelect={(date) =>
                            field.onChange(date?.toISOString())
                          }
                          disabled={(date) => date < new Date("1900-01-01")}
                          fromDate={new Date(1990, 0, 1)} // Đặt ngày bắt đầu
                          toDate={
                            new Date(new Date().getFullYear() + 4, 11, 31)
                          } // Đặt ngày kết thúc
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

          <div className="flex justify-between  gap-4">
            <div className="flex justify-start w-1/2 items-center gap-5">
              <span className="text-blur text-sm w-1/5">Số lượng căn hộ</span>
              <FormField
                control={form.control}
                name="TotalApartment"
                render={({ field }) => (
                  <FormItem className="w-3/5">
                    <FormControl>
                      <Input
                        placeholder="Số lượng căn hộ"
                        type="number"
                        {...field}
                        value={field.value ?? ""}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-start w-1/2 items-center gap-5">
              <span className="text-blur text-sm w-1/5">Nhóm quản lí</span>
              <FormField
                control={form.control}
                name="TeamID"
                render={({ field }) => (
                  <FormItem className="w-3/5">
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={(value) => field.onChange(value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn nhóm quản lí" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Chọn nhóm</SelectLabel>
                            {teams?.map((team) => (
                              <SelectItem key={team.teamID} value={team.teamID}>
                                {team.teamName}
                              </SelectItem>
                            ))}
                          </SelectGroup>
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
            <div className="flex justify-start w-1/2 items-center gap-5">
              <span className="text-blur text-sm w-1/5">Địa chỉ</span>
              <FormField
                control={form.control}
                name="Address"
                render={({ field }) => (
                  <FormItem className="w-3/5">
                    <FormControl>
                      <Textarea
                        placeholder="Nhập địa chỉ"
                        {...field}
                        value={field.value ?? ""}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-start w-1/2 items-center gap-5">
              <span className="text-blur text-sm w-1/5">Đường dẫn</span>
              <FormField
                control={form.control}
                name="AddressUrl"
                render={({ field }) => (
                  <FormItem className="w-3/5">
                    <FormControl>
                      <Input
                        placeholder="Nhập địa chỉ GoogleMap"
                        {...field}
                        value={field.value ?? ""}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex justify-between  gap-4">
            <div className="flex justify-start w-1/2 items-center gap-5">
              <span className="text-blur text-sm w-1/5">Cơ quan cấp phép</span>
              <FormField
                control={form.control}
                name="LicensingAuthority"
                render={({ field }) => (
                  <FormItem className="w-3/5">
                    <FormControl>
                      <Input
                        placeholder="Cơ căn cấp phép"
                        {...field}
                        value={field.value ?? ""}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-start w-1/2 items-center gap-5">
              <span className="text-blur text-sm w-1/5">Năm cấp phép</span>
              <FormField
                control={form.control}
                name="LicensingDate"
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
                              <span>Chọn năm cấp phép</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          captionLayout="dropdown-buttons"
                          fromYear={1990}
                          toYear={new Date().getFullYear() + 4}
                          mode="single"
                          selected={
                            field.value ? new Date(field.value) : undefined
                          }
                          onSelect={(date) =>
                            field.onChange(date?.toISOString())
                          }
                          disabled={(date) => date < new Date("1900-01-01")}
                          fromDate={new Date(1990, 0, 1)} // Đặt ngày bắt đầu
                          toDate={
                            new Date(new Date().getFullYear() + 4, 11, 31)
                          } // Đặt ngày kết thúc
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

          <div className="flex justify-center gap-4 ">
            <div className="w-1/2">
              <h1 className="font-semibold">Thông tin mô tả</h1>
              <FormField
                control={form.control}
                name="ProjectApartmentDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="Nhập mô tả dự án"
                        {...field}
                        rows={5}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {!data && (
              <div className=" w-1/2 ">
                <h1 className="font-semibold">Tiện ích nội khu</h1>
                <div className="flex justify-start gap-5 ">
                  <span className="text-blur text-sm w-1/5">Tiện ích</span>
                  <FormField
                    control={form.control}
                    name="FacilityIDs"
                    render={({ field }) => (
                      <FormItem className="w-3/5">
                        <FormControl>
                          <MultiSelect
                            options={
                              facilities?.map((facility) => ({
                                label: facility.facilitiesName,
                                value: facility.facilitiesID,
                              })) || []
                            }
                            value={
                              Array.isArray(field.value) ? field.value : []
                            }
                            onValueChange={(value) => field.onChange(value)}
                            placeholder="Chọn tiện ích nội khu"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            )}
          </div>

          {!data && (
            <div>
              <h1 className="font-semibold">Hình ảnh dự án</h1>
              <div className="flex justify-start gap-5">
                <FormField
                  control={form.control}
                  name="Images"
                  render={({ field }) => {
                    return (
                      <FormItem className="w-3/5">
                        <Button
                          onClick={handleOpenFilePicker}
                          variant="outline"
                        >
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
          )}

          {!data && (
            <>
              <div className="flex flex-wrap gap-2">
                {selectedImages.map((image, index) => {
                  // Check if the image is a File or an object from the API response
                  const imageUrl =
                    typeof image === "string" // If it's already a URL string
                      ? image
                      : image instanceof File // If it's a File object
                      ? URL?.createObjectURL(image)
                      : (image as ImageType).url;

                  return (
                    <div key={index} className="relative">
                      <Image
                        src={imageUrl} // Use the resolved URL
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
            </>
          )}

          <Button variant="outline" type="submit">
            {!data ? "Tạo dự án" : "Cập nhật dự án"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ProjectCreate;
