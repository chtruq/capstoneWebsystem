import React, { FC } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { tableText } from "@/lib/utils/project";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getProjectProviderCart } from "@/app/actions/apartment";
import Image from "next/image";
import ProjectTable from "@/components/project-manage/ProjectTable";
import { getProjectApartmentByProviderCart } from "@/app/actions/project";

interface Props {
  data: Provider;
}

const ProviderTabsDetails: FC<Props> = async ({ data }) => {
  console.log("data provieaaee", data);

  const projectCart = await getProjectApartmentByProviderCart({
    providerId: data?.apartmentProjectProviderID
  });

  console.log("projectCart", projectCart);

  return (
    <div className="w-full my-4">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-fit grid-cols-2">
          <TabsTrigger value="overview">Tổng quan</TabsTrigger>
          <TabsTrigger value="projects">Dự án</TabsTrigger>
        </TabsList>
        <TabsContent className="w-full" value="overview">
          <div className="grid grid-cols-6">
            <div className="grid col-span-3 grid-cols-3 gap-4 gap-x-4">
              <p className="text-blur font-semibold">Người đại diện:</p>
              <p className="font-medium col-span-2">{data.name || "Chưa cập nhật"}</p>

              <p className="text-blur font-semibold">Địa chỉ email:</p>
              <p className="font-medium col-span-2">{data.email || "Chưa cập nhật"}</p>

              <p className="text-blur font-semibold">Nhà cung cấp:</p>
              <p className="font-medium col-span-2">{data.apartmentProjectProviderName}</p>

              <p className="text-blur font-semibold">Vị trí trụ sở:</p>
              <p className="font-medium col-span-2">{data.location}</p>
            </div>
            <div className="col-end-7 col-span-2">
              <Image
                src={data?.diagramUrl}
                width={50}
                height={50}
                alt={data.apartmentProjectProviderName}
                className="rounded-full w-32 h-32 border border-gray-300 p-1"
              />
            </div>

          </div>
          <div className="w-[70%]">
            <p className="text-blur font-semibold">Thông tin mô tả:</p>
            <p className="font-medium">{data.apartmentProjectDescription}</p>
          </div>
        </TabsContent>
        <TabsContent className="w-full" value="projects">
          <ProjectTable data={projectCart} />

        </TabsContent>

      </Tabs>
    </div>
  );
};
export default ProviderTabsDetails;