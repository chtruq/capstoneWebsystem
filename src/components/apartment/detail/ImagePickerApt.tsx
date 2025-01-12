"use client";
import { addAptImages } from "@/app/actions/apartment";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { FC, useRef, useState } from "react";
import { toast } from "react-toastify";

interface props {
  apartmentId: string;
}

interface ImageType {
  url: string;
  description?: string;
}

const ImagePickerApt: FC<props> = ({ apartmentId }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const router = useRouter();

  const handleRemoveImage = (index: number) => {
    setSelectedImages((prevImages) => {
      const updatedImages = prevImages.filter((_, i) => i !== index);
      return updatedImages;
    });
  };

  const handleOpenFilePicker = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (inputRef.current) {
      inputRef.current.click();
    }
  };
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

          return updatedImages;
        });
      } catch (error) {
        console.error("Error adding image:", error);
      }
    }
  };

  const handleAddImages = async () => {
    try {
      console.log("selectedImages", selectedImages);
      const res = await addAptImages(apartmentId, selectedImages);
      router.refresh();
      setSelectedImages([]);
      console.log(res);
      if (res) {
        toast.success("Thêm ảnh thành công", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Button onClick={handleOpenFilePicker} variant="outline">
        Chọn hình ảnh ({selectedImages.length} đã chọn)
      </Button>

      <Input
        className="hidden"
        ref={inputRef}
        accept="image/*"
        type="file"
        multiple
        onChange={(e) => {
          handleImageChange(e);
        }}
      />

      <div className="flex flex-wrap gap-2">
        {selectedImages.map((image, index) => {
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

      {selectedImages.length > 0 && (
        <div>
          <Button onClick={handleAddImages}>
            Thêm {selectedImages.length} ảnh{" "}
          </Button>
        </div>
      )}
    </div>
  );
};

export default ImagePickerApt;
