"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Dialog } from "@headlessui/react";
import { CircleX, Trash2 } from "lucide-react";
import { deleteProjectImg } from "@/app/actions/project";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import ConfirmDeleteDialog from "../confirmdelete/ConfirmDeleteDialog";

interface ImageFile {
  imageID: string;
  url: string;
  description: string;
}

interface ImageGalleryProps {
  images: ImageFile[];
}

const ImageGalleryApt: React.FC<ImageGalleryProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const router = useRouter();

  return (
    <div>
      <div className="flex flex-wrap justify-start items-center space-x-4 pb-4">
        {images.map((image) => (
          <div key={image.imageID} className="relative cursor-pointer">
            <div
              key={image.imageID}
              className="relative cursor-pointer"
              onClick={() => setSelectedImage(image.url)} // Khi click, lưu URL ảnh vào state
            >
              <Image
                className="rounded-lg object-cover w-[10rem] h-[10rem]"
                src={image.url}
                alt="image"
                width={200}
                height={200}
              />
            </div>
            {/* <div className="absolute top-2 right-2 bg-white rounded-full">
              <ConfirmDeleteDialog imageID={image.imageID} />
            </div> */}
          </div>
        ))}
      </div>

      {/* xac nhan xoa anh */}

      {/* Popup xem ảnh */}
      <Dialog
        open={!!selectedImage} // Hiển thị modal khi có ảnh được chọn
        onClose={() => setSelectedImage(null)} // Đóng modal khi click ngoài hoặc nút close
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      >
        {/* Lớp nền mờ phía sau */}
        <div
          className="fixed inset-0 bg-black bg-opacity-50"
          aria-hidden="true"
        />

        {/* <div className="relative bg-white rounded-lg shadow-lg p-4"> */}
        <Dialog.Panel className="relative bg-white rounded-lg shadow-lg p-4">
          {selectedImage && (
            <>
              <Image
                src={selectedImage}
                alt="Selected"
                className="rounded-lg  w-[60rem] h-[40rem] object-contain"
                width={800}
                height={600}
              />
            </>
          )}
          <button
            className="absolute top-2 right-2 bg-white rounded-full p-2"
            onClick={() => setSelectedImage(null)} // Đóng modal
          >
            <CircleX size={24} />
          </button>
        </Dialog.Panel>
        {/* </div> */}
      </Dialog>
    </div>
  );
};

export default ImageGalleryApt;
