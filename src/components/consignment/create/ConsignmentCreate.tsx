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
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { revalidateProjectPath } from "@/app/actions/revalidate";
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
import { consignmentSchema } from "@/lib/schema/consignmentSchema";
import { createConsignment } from "@/app/actions/consignment";
import { usePathname, useRouter } from "next/navigation";

interface Props {
  apartmentOwners: Owner[];
  assignAccountId: string;
  data?: Consignment
}

interface LegalDocumentFiles {
  fileName: string;
  fileUrl: string;
}

const ConsignmentCreate: FC<Props> = ({ apartmentOwners, assignAccountId, data }) => {
  // console.log("apartmentOwners", apartmentOwners);
  // console.log("assignAccountId", assignAccountId);

  const pathname = usePathname();
  // console.log("Original pathname:", pathname);

  const newPathname = pathname.split("/").slice(0, -1).join("/");
  console.log("Updated pathname:", newPathname);

  const form = useForm<z.infer<typeof consignmentSchema>>({
    resolver: zodResolver(consignmentSchema),
    defaultValues: {
      VerificationName: "",
      LegalDocumentFiles: [],
      Comments: "",
      ApartmentOwnerApartmentID: "",
      ApartmentOwnerID: "",
      AssignedAccountID: assignAccountId,
      PropertyValue: "",
      DepositValue: "",
      BrokerageFee: "",
      CommissionRate: "",
      EffectiveDate: "",
      ExpiryDate: "",
    },
  });
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
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
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);

      try {
        filesArray.forEach(validateFile);
        filesArray.forEach(validateFile);
        const updatedFiles = [...selectedFile, ...filesArray];
        setSelectedFile(updatedFiles);;
      } catch (error: any) {
        alert(error.message); // Hiển thị thông báo lỗi cho người dùng
        console.error("Error adding file:", error);
      }
    }
  };

  useEffect(() => {
    form.setValue("LegalDocumentFiles", selectedFile); // Đồng bộ hóa sau khi trạng thái cập nhật
  }, [selectedFile]);

  const handleRemoveFiles = (index: number) => {
    setSelectedFile((prevFiles) => {
      const updatedFiles = prevFiles.filter((_, i) => i !== index);
      form.setValue("LegalDocumentFiles", updatedFiles); // Đồng bộ với form
      return updatedFiles;
    });
  };

  const handleOpenFilePicker = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (inputRef.current) {
      inputRef.current.click();
    }
  };
  const router = useRouter();

  const onSubmit = async (value: z.infer<typeof consignmentSchema>) => {
    try {
      const payload = { ...value, LegalDocumentFiles: selectedFile };
      console.log("Payload in create consignment", payload);

      if (data) {
        // const res = await updateProject(data.projectApartmentID, payload);
        // console.log("Update project successfully", res);
      } else {
        console.log("Create project payload", payload);
        const res = await createConsignment(payload);
        console.log("Create project successfully", res);

        form.reset({
          VerificationName: "",
          LegalDocumentFiles: [],
          Comments: "",
          ApartmentOwnerApartmentID: "",
          ApartmentOwnerID: "",
          AssignedAccountID: assignAccountId,
          PropertyValue: "",
          DepositValue: "",
          BrokerageFee: "",
          CommissionRate: "",
          EffectiveDate: "",
          ExpiryDate: "",
        });
        setSelectedFile([]);
        router.push(newPathname);
        router.refresh();
      }
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <h1 className="font-semibold">Thông tin hợp đồng</h1>
          <div className="flex justify-between gap-4">
            <div className="flex justify-start w-1/2 items-center gap-5">
              <span className="text-blur text-sm w-1/5">Tên hợp đồng</span>
              <FormField
                control={form.control}
                name="VerificationName"
                render={({ field }) => (
                  <FormItem className="w-3/5">
                    <FormControl>
                      <Input placeholder="Nhập tên hợp đồng" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-start w-1/2 items-center gap-5">
              <span className="text-blur text-sm w-1/5">Phí môi giới</span>
              <FormField
                control={form.control}
                name="BrokerageFee"
                render={({ field }) => (
                  <FormItem className="w-3/5">
                    <FormControl>
                      <Input
                        placeholder="Nhập phí môi giới"
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
                name="ApartmentOwnerID"
                render={({ field }) => (
                  <FormItem className="w-3/5">
                    <Popover {...field} open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <FormControl>

                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className="justify-between w-full pl-3 text-left font-normal"
                          >
                            {field.value
                              ? apartmentOwners.find(
                                (apartmentOwner) =>
                                  apartmentOwner.apartmentOwnerID ===
                                  field.value
                              )?.name
                              : "Chọn chủ chủ ký gửi"}
                            <ChevronDown className="items-end ml-2 h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className=" p-0">
                        <Command className="w-full">
                          <CommandInput placeholder="Tìm kiếm chủ ký gửi" />
                          <CommandList>
                            <CommandEmpty>
                              Không tìm bất kì chủ ký gửi nào.
                            </CommandEmpty>
                            <CommandGroup className="w-full">
                              {apartmentOwners.map((apartmentOwner) => (
                                <CommandItem
                                  key={apartmentOwner.apartmentOwnerID}
                                  value={
                                    apartmentOwner.name
                                  }
                                  onSelect={() => {
                                    field.onChange(
                                      apartmentOwner.apartmentOwnerID
                                    );
                                    setOpen(false);
                                  }}
                                  className="w-full"
                                >
                                  {apartmentOwner.name}
                                  <Check
                                    className={cn(
                                      "items-end h-4 w-4",
                                      field.value ===
                                        apartmentOwner.apartmentOwnerID
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
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-start w-1/2 items-center gap-5">
              <span className="text-blur text-sm w-1/5">
                Tỉ lệ hoa hồng
              </span>
              <FormField
                control={form.control}
                name="CommissionRate"
                render={({ field }) => (
                  <FormItem className="w-3/5">
                    <FormControl>
                      <Input
                        placeholder="Nhập tỉ lệ hoa hồng"
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
              <span className="text-blur text-sm w-1/5">
                Giá trị tài sản
              </span>
              <FormField
                control={form.control}
                name="PropertyValue"
                render={({ field }) => (
                  <FormItem className="w-3/5">
                    <FormControl>
                      <Input
                        placeholder="Nhập giá trị tài sản"
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
                              <span>Chọn ngày hiệu lực</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          captionLayout="dropdown-buttons"
                          fromYear={2020}
                          toYear={new Date().getFullYear() + 4}
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
              <span className="text-blur text-sm w-1/5">
                Giá trị đặt cọc giữ chỗ
              </span>
              <FormField
                control={form.control}
                name="DepositValue"
                render={({ field }) => (
                  <FormItem className="w-3/5">
                    <FormControl>
                      <Input
                        placeholder="Nhập giá trị đặt cọc giữ chỗ"
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
              <span className="text-blur text-sm w-1/5">Ngày hết hiệu lực</span>
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
                          fromYear={2020}
                          toYear={new Date().getFullYear() + 4}
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

          <div>
            <h1 className="font-semibold">File tài liệu liên quan</h1>
            <div className="flex justify-start gap-5">
              <FormField
                control={form.control}
                name="LegalDocumentFiles"
                render={({ field }) => {
                  return (
                    <FormItem className="w-3/5">
                      <Button onClick={handleOpenFilePicker} variant="outline">
                        Chọn tài liệu ({selectedFile.length} đã chọn)
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
            </div>
          </div>
          <div className="grid grid-cols-1 divide-y divide-slate-600 w-[60%]">
            {selectedFile.map((file, index) => {
              // Check if the file is a File or an object from the API response
              const fileUrl =
                typeof file === "string" // If it's already a URL string
                  ? file
                  : file instanceof File // If it's a File object
                    ? URL?.createObjectURL(file)
                    : (file as LegalDocumentFiles).fileUrl; // If it's an object from the API response

              return (
                <div key={index} className="relative">
                  <div className="flex justify-between items-center">
                    <p className="py-1">{file.name}</p>
                    <button
                      type="button"
                      onClick={() => handleRemoveFiles(index)}
                      className=" w-6 h-6 bg-red-500 text-white flex text-center items-center justify-center rounded-full p-1"
                    >
                      <span className="text-sm">X</span>
                    </button>
                  </div>




                </div>
              );
            })}
          </div>
          <Button variant="outline" type="submit">
            Tạo hợp đồng
          </Button>

        </form>
      </Form>
    </div>
  )
}


export default ConsignmentCreate;