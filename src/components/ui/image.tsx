"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Dialog } from "@headlessui/react";
import { CircleX } from "lucide-react";
const ImageGallery = ({ images }: { images: { projectImageID: string; url: string }[] }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div>
      <div className="grid grid-cols-4 gap-4">
        {images.map((image) => (
          <div
            key={image.projectImageID}
            className="flex justify-center items-center cursor-pointer"
            onClick={() => setSelectedImage(image.url)} // Khi click, lưu URL ảnh vào state
          >
            <Image
              src={image.url}
              alt="image"
              width={200}
              height={200}
              className="rounded-lg object-cover"
            />
          </div>
        ))}
      </div>

      {/* Popup xem ảnh */}
      <Dialog
        open={!!selectedImage} // Hiển thị modal khi có ảnh được chọn
        onClose={() => setSelectedImage(null)} // Đóng modal khi click ngoài hoặc nút close
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      >
        <div className="relative bg-white rounded-lg shadow-lg p-4">
          {selectedImage && (
            <Image
              src={selectedImage}
              alt="Selected"
              className="rounded-lg w-[32rem] h-[32rem] object-contain"
              width={800}
              height={600}
            />
          )}
          <button
            className="absolute top-2 right-2 bg-white rounded-full p-2"
            onClick={() => setSelectedImage(null)} // Đóng modal
          >
            <CircleX size={24} />
          </button>
        </div>
      </Dialog>
    </div>
  );
};

export default ImageGallery;
