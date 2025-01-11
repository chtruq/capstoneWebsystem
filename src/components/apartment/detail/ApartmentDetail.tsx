import ImageGallery from "@/components/ui/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TextPrice } from "@/lib/utils/project";
import Image from "next/image";
import React, { FC } from "react";
import { formatDirection } from "@/lib/utils/dataFormat";
import ImageVR from "@/components/ui/imageVr";
interface Props {
  data: Apartment;
}

const ApartmentDetail: FC<Props> = ({ data }) => {
  console.log("Images list:", JSON.stringify(data.images, null, 2));
  return (
    <div>
      <Tabs defaultValue="overview" className="">
        <TabsList>
          <TabsTrigger value="overview">Tổng quan</TabsTrigger>
          <TabsTrigger value="media">Phương tiện</TabsTrigger>
          {data?.apartmentType === "CanHoTruyenThong" ? (
            <TabsTrigger value="contract">Hợp đồng ký gửi</TabsTrigger>
          ) : null}
        </TabsList>
        <TabsContent value="overview">
          <div>
            {/* <h1>{data?.apartmentID}</h1>
            <h1>{data?.apartmentStatus}</h1> */}
            <h1 className="font-semibold">Thông tin căn hộ</h1>
            <div className="grid grid-cols-2 gap-4">
              <div className="w-full flex">
                <span className="text-sm text-blur w-1/3">Tên căn hộ</span>
                <span className="w-2/3">{data.apartmentName}</span>
              </div>
              <div className="w-full flex">
                <span className="text-sm text-blur w-1/3">Toà</span>
                <span className="w-2/3">{data.building}</span>
              </div>
              <div className="w-full flex">
                <span className="text-sm text-blur w-1/3">Mã căn hộ</span>
                <span className="w-2/3">{data.apartmentCode}</span>
              </div>
              <div className="w-full flex">
                <span className="text-sm text-blur w-1/3">Tầng</span>
                <span className="w-2/3">{data.floor}</span>
              </div>
              <div className="w-full flex">
                <span className="text-sm text-blur w-1/3">Dự án</span>
                <span className="w-2/3">{data.projectApartmentName}</span>
              </div>
              <div className="w-full flex">
                <span className="text-sm text-blur w-1/3">Số phòng</span>
                <span className="w-2/3">{data.roomNumber}</span>
              </div>
              <div className="w-full flex">
                <span className="text-sm text-blur w-1/3">Mức giá</span>
                <span className="w-2/3">{TextPrice(data.price)}</span>
              </div>
              <div className="w-full flex">
                <span className="text-sm text-blur w-1/3">Số toilet</span>
                <span className="w-2/3">{data.numberOfBathrooms}</span>
              </div>
              <div className="w-full flex">
                <span className="text-sm text-blur w-1/3">
                  Diện tích căn hộ
                </span>
                <span className="w-2/3">{data.area}</span>
              </div>
              <div className="w-full flex">
                <span className="text-sm text-blur w-1/3">Hướng nhà</span>
                <span className="w-2/3">{formatDirection(data.direction)}</span>
              </div>
              <div className="w-full flex">
                <span className="text-sm text-blur w-1/3">Địa chỉ</span>
                <span className="w-2/3">{data.address}</span>
              </div>
              <div className="w-full flex">
                <span className="text-sm text-blur w-1/3">Hướng ban công</span>
                <span className="w-2/3">{formatDirection(data.balconyDirection)}</span>
              </div>
            </div>
            <h1 className="font-semibold mt-4">Mô tả căn hộ</h1>
            <div>{data.description}</div>
          </div>
        </TabsContent>
        <TabsContent value="media">
          <div>
            <h1 className="font-semibold">Hình ảnh ({data.images.length})</h1>

            {/* <div className="grid grid-cols-4 gap-4">
              {data.images.map((image) => (
                <Image
                  key={image.apartmentImageID}
                  src={image.imageUrl}
                  alt={data.apartmentName}
                  className="w-32 h-32 object-cover"
                  width={200}
                  height={200}
                />
              ))}
            </div> */}
            <ImageGallery images={data?.images.map(image => ({ imageID: image.apartmentImageID, url: image.imageUrl, description: image.description }))} />

            <h1 className="font-semibold">Hình ảnh 360 ({data.vrVideoUrls?.length || "0"})</h1>
            <ImageVR images={data.vrVideoUrls} />
          </div>
        </TabsContent>
        <TabsContent value="contract" >
          <div>
            <h1 className="font-semibold">Hợp đồng ký gửi</h1>
            <div>
              {/* {data.contracts.map((contract) => (
                    <div key={contract.contractID}>
                    <div>
                        <span className="text-sm text-blur">Ngày ký</span>
                        <span>{contract.contractDate}</span>
                    </div>
                    <div>
                        <span className="text-sm text-blur">Ngày hết hạn</span>
                        <span>{contract.expiryDate}</span>
                    </div>
                    <div>
                        <span className="text-sm text-blur">Mô tả</span>
                        <span>{contract.description}</span>
                    </div>
                    </div>
                ))} */}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ApartmentDetail;
