"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Dialog } from "@headlessui/react";
import { CircleX } from "lucide-react";
import ConfirmApartmentVRDeleteDialog from "../confirmdelete/ConfirmVRDeleteDialog";

interface ImageFile {
  vrExperienceID: string;
  videoUrl: string;
  description: string;
}

interface ImageGalleryProps {
  images: ImageFile[];
}

const ImageVR: React.FC<ImageGalleryProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  console.log("Images list in component:", JSON.stringify(images, null, 2));

  const generateHtmlContent = (imageUrl: string) => `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>360 Viewer</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.css"/>
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.js"></script>
    <style>
    #panorama {
        height: 90vh;
    }
    </style>
  </head>
  <body>
    <div id="panorama"></div>
    <script>
      pannellum.viewer('panorama', {
        type: 'equirectangular',
        panorama: '${imageUrl}',
        autoLoad: true
      });
    </script>
  </body>
  </html>
`;

  console.log("URLsdaasd", selectedImage);


  return (
    <div>
      <div className="flex flex-wrap justify-start items-center space-x-4 pb-4">
        {images.map((image) => (
          <div key={image.vrExperienceID} className="relative cursor-pointer">
            <div
              key={image.vrExperienceID}
              className="relative cursor-pointer"
              onClick={() => setSelectedImage(image.videoUrl)} // Khi click, lưu URL ảnh vào state
            >
              <Image
                className="rounded-lg object-cover w-[10rem] h-[10rem]"
                src={image.videoUrl}
                alt="image"
                width={200}
                height={200}
              />
            </div>
            <div className="absolute top-2 right-2 bg-white rounded-full">
              <ConfirmApartmentVRDeleteDialog imageID={image.vrExperienceID} />
            </div>
          </div>
        ))}
      </div>

      {/* Popup xem ảnh */}
      <Dialog
        open={!!selectedImage} // Hiển thị modal khi có ảnh được chọn
        onClose={() => setSelectedImage(null)} // Đóng modal khi click ngoài hoặc nút close
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      >
        {/* Lớp nền mờ phía sau */}
        <div className="fixed inset-0 bg-black bg-opacity-50" aria-hidden="true" />

        <Dialog.Panel className="relative bg-white rounded-lg shadow-lg p-4 w-full max-w-5xl">

          {selectedImage && (
            <iframe
              srcDoc={generateHtmlContent(selectedImage)} // Nhúng nội dung HTML vào iframe
              title="360 Viewer"
              className="rounded-lg  w-[60rem] h-[40rem] object-contain"
            />
          )}
          <button
            className="absolute top-2 right-2 bg-white rounded-full p-2"
            onClick={() => setSelectedImage(null)} // Đóng modal
          >
            <CircleX size={24} />
          </button>
        </Dialog.Panel>
      </Dialog>
    </div>
  );
};

export default ImageVR;
