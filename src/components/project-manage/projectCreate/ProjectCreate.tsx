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
import { projectSchema } from "@/lib/schema/projectSchema";
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
import { Provider } from "../../../../model/provider";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { createProject } from "@/app/actions/project";
import { revalidateProjectPath } from "@/app/actions/revalidate";

interface Props {
  facilities: Facility[];
  teams: Team[];
  providers: Provider[];
  data?: Project;
}

const ProjectCreate: FC<Props> = ({ facilities, teams, providers, data }) => {
  console.log("data", data);

  const form = useForm<z.infer<typeof projectSchema>>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
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
      ApartmentProjectProviderID: "",
      FacilityIDs: [],
      ProjectType: 1,
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
    { label: "Đang mở bán", value: 1 },
    { label: "Đã bàn giao", value: 2 },
  ];

  const onSubmit = async (value: z.infer<typeof projectSchema>) => {
    try {
      const payload = { ...value, Images: selectedImages };
      if (data) {
        const res = await updateProject(data.projectApartmentID, payload);
        console.log("Update project successfully", res);
      } else {
        console.log("Create project payload", payload);

        const res = await createProject(payload);
        console.log("Create project successfully", res);
        revalidateProjectPath("/manager/dashboard/project-manage");
        return res;
      }
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  //if have the data then fill the form
  useEffect(() => {
    if (data) {
      // Chuyển đổi dữ liệu nếu cần
      form.setValue("ProjectApartmentName", data.projectApartmentName || "");
      form.setValue("ApartmentArea", data.apartmentArea?.toString() || "");
      form.setValue(
        "ApartmentProjectProviderID",
        data.apartmentProjectProviderID || ""
      );
      form.setValue("ProjectSize", data.projectSize?.toString() || "");
      form.setValue("ProjectType", Number(data.projectType || 0)); // Chuyển đổi sang số nếu cần
      form.setValue(
        "ConstructionStartYear",
        data.constructionStartYear
          ? new Date(data.constructionStartYear).toISOString()
          : ""
      );
      form.setValue(
        "ConstructionEndYear",
        data.constructionEndYear
          ? new Date(data.constructionEndYear).toISOString()
          : ""
      );
      form.setValue("ProjectArea", data.projectArea || "");
      form.setValue("TotalApartment", data.totalApartment?.toString() || "");
      form.setValue("TeamID", data.teamID || ""); // Nếu TeamID không tồn tại, bạn có thể sử dụng teamName làm fallback
      form.setValue("Address", data.address || "");
      form.setValue("AddressUrl", data.addressUrl || "");
      form.setValue(
        "ProjectApartmentDescription",
        data.projectApartmentDescription || ""
      );
      const facilityIDs: [string, ...string[]] = data?.facilities?.map(
        (f) => f.facilitiesID
      ) as [string, ...string[]];
      form.setValue("FacilityIDs", facilityIDs);

      form.setValue("Images", data.projectImages || []);
    }
  }, [data]);

  useEffect(() => {
    if (data?.projectImages?.length) {
      setSelectedImages(data?.projectImages); // Nếu có URL của hình ảnh, bạn có thể lưu trực tiếp URL hoặc xử lý khác.
    }
  }, [data]);

  useEffect(() => {
    form.setValue("Price_range", "2 - 10");
  }, []);

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
              <span className="text-blur text-sm w-1/5">Chủ đầu tư</span>
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
                              : "Chọn chủ đầu tư"}
                            <ChevronDown className="items-end ml-2 h-4 w-4 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className=" p-0">
                          <Command className="w-full">
                            <CommandInput placeholder="Tìm kiếm chủ đầu tư" />
                            <CommandList>
                              <CommandEmpty>
                                Không tìm bất kì chủ đầu tư nào.
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

          <div className="flex justify-between  gap-4">
            <div className="flex justify-start w-1/2 items-center gap-5">
              <span className="text-blur text-sm w-1/5">
                Diện tích dự án(m²)
              </span>
              <FormField
                control={form.control}
                name="ProjectArea"
                render={({ field }) => (
                  <FormItem className="w-3/5">
                    <FormControl>
                      <Input
                        placeholder="Nhập diện tích dự án(m²)"
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
                          mode="single"
                          selected={
                            field.value ? new Date(field.value) : undefined
                          }
                          onSelect={(date) =>
                            field.onChange(date?.toISOString())
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
                          value={Array.isArray(field.value) ? field.value : []}
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
                    : image.url; // If it's an object from the API

              return (
                <div key={index} className="relative">
                  <Image
                    src={imageUrl} // Use the resolved URL
                    alt={image.description || `selected ${index}`} // Use description if available
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
          <Button variant="outline" type="submit">
            Tạo dự án
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ProjectCreate;
