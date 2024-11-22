import React, { FC } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { tableText } from "@/lib/utils/project";
import Image from "next/image";

import ProjectCartTable from "./ProjectCart/ProjectCartTable";

import ProjectContract from "./ProjectFinancialContract/ProjectContract";
import ProjectFile from "./ProjectFile/ProjectFile";
import { getProjectApartmentCart } from "@/app/actions/apartment";
import PaginationComponent from "@/components/pagination/PaginationComponent";
interface Props {
  data: Project;
  searchParam?: Promise<{
    page?: string;
  }>;
}

const formatDate = (isoDateString: string): string => {
  if (!isoDateString) return "N/A"; // Xử lý trường hợp dữ liệu không hợp lệ
  const date = new Date(isoDateString);
  const day = date.getUTCDate().toString().padStart(2, "0"); // Lấy ngày và thêm 0 nếu cần
  const month = (date.getUTCMonth() + 1).toString().padStart(2, "0"); // Lấy tháng và thêm 0
  const year = date.getUTCFullYear().toString(); // Lấy năm
  return `${day}/${month}/${year}`;
};

const ProjectTabsDetail: FC<Props> = async (props) => {
  const { data, searchParam } = props;
  const searchParams = await searchParam;
  const currentPage = Number(searchParams?.page) || 1;
  const projectCart = await getProjectApartmentCart({
    projectId: data?.projectApartmentID,
    currentPage,
  });

  const totalPages = projectCart.totalPage;
  const totalItem = projectCart.totalItem;
  const count = projectCart.apartments.length;

  return (
    <div className="w-full">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-[400px] grid-cols-4">
          <TabsTrigger value="overview">Tổng quan</TabsTrigger>
          <TabsTrigger value="media">Phương tiện</TabsTrigger>
          <TabsTrigger value="cart">Giỏ hàng</TabsTrigger>
          <TabsTrigger value="contract">Hợp đồng</TabsTrigger>
        </TabsList>
        <TabsContent className="w-full" value="overview">
          <div>
            <h1 className="font-semibold">Thông tin dự án</h1>
            <div className="flex w-full gap-3">
              <div className="w-1/2">
                <div className="flex justify-between w-full">
                  <div className="grid grid-cols-2 gap-y-2 w-full">
                    <div className="text-sm text-blur">Tên dự án</div>
                    <div>{data?.projectApartmentName}</div>

                    <div className="text-sm text-blur">Mã dự án</div>
                    <div>{data?.projectCode}</div>

                    <div className="text-sm text-blur ">Trạng thái</div>
                    <div>{data?.projectType}</div>

                    <div className="text-sm text-blur ">Chủ đầu tư</div>
                    <div>{tableText(data?.apartmentProjectProviderName)}</div>

                    <div className="text-sm text-blur ">Nhóm quản lý</div>
                    <div>{tableText(data?.teamName)}</div>

                    <div className="text-sm text-blur ">Diện tích dự án</div>
                    <div>{tableText(data?.apartmentArea)}</div>

                    <div className="text-sm text-blur ">Địa chỉ</div>
                    <div>{tableText(data?.address)}</div>
                  </div>
                </div>
              </div>
              <div className="w-1/2">
                <div className="flex justify-between w-full">
                  <div className="grid grid-cols-2 gap-y-2 w-full">
                    <div className="text-sm text-blur">Quy mô dự án</div>
                    <div>{tableText(data?.projectSize)}</div>

                    <div className="text-sm text-blur">Số căn hộ</div>
                    <div>{tableText(data?.totalApartment)}</div>

                    <div className="text-sm text-blur ">Diện tích căn hộ</div>
                    <div>{tableText(data?.apartmentArea)}</div>

                    <div className="text-sm text-blur ">Năm khởi công</div>
                    <div>{tableText(formatDate(data?.constructionStartYear))}</div>

                    <div className="text-sm text-blur ">Năm bàn giao</div>
                    <div>{tableText(formatDate(data?.constructionStartYear))}</div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h1 className="font-semibold">Giỏ hàng</h1>
              <div className="grid grid-cols-2 gap-y-1 w-[50%]">
                <div className="text-sm text-blur">Tổng số căn</div>
                <div>{data?.totalApartments}</div>

                <div className="text-sm text-blur">Căn hộ hiện hữu</div>
                <div>{data?.totalApartments}</div>
              </div>
            </div>
            <div className="flex">
              <div className="w-1/2">
                <h1 className="font-semibold">Thông tin mô tả</h1>
                <div>{data?.projectApartmentDescription}</div>
              </div>
              <div className="w-1/2">
                <h1 className="font-semibold">Tiện ích nội khu</h1>
                <div>
                  <ul>
                    {data?.facilities.map((facility) => (
                      <li key={facility?.facilityID}>
                        {facility?.facilityName}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="media">
          <div>
            <h1 className="font-semibold">
              Hình ảnh({data.projectImages?.length})
            </h1>
            <div>
              {data?.projectImages.map((image) => (
                <div
                  key={image?.imageID}
                  className="flex justify-center items-center"
                >
                  <Image src={image?.imageUrl} className="w-1/4" alt="image" />
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
        <TabsContent value="cart">
          <div>
            <div>
              <p className="text-blur text-sm">
                Hiển thị {count} trên {totalItem} căn hộ
              </p>
            </div>
            <div>
              <ProjectCartTable data={projectCart.apartments} />
            </div>
            <div>
              {totalPages ? (
                <PaginationComponent totalPages={totalPages} />
              ) : (
                <></>
              )}
            </div>
          </div>
        </TabsContent>
        <TabsContent value="contract">
          <div>
            <h1 className="font-semibold">Thông tin khách hàng</h1>
            <div className="flex">
              <div className="grid grid-cols-2 gap-y-2 w-1/2">
                <div className="text-sm text-blur">Chủ đầu tư</div>
                <div>{tableText(data?.projectApartmentName)}</div>

                <div className="text-sm text-blur">Số liên hệ</div>
                <div>{tableText(data?.projectApartmentID)}</div>

                <div className="text-sm text-blur">Email</div>
                <div>{tableText(data?.projectSize)}</div>

                <div className="text-sm text-blur">Người đại diện</div>
                <div>{tableText(data?.apartmentProjectProviderName)}</div>
              </div>
              <div className="w-32 h-32">
                <Image src={data?.projectImages[0]?.imageUrl} alt="logo" />
              </div>
            </div>

            <div className="w-full">
              <ProjectContract data={data} />
            </div>
            <div>
              <h1 className="font-semibold">Hợp đồng</h1>
              <div>Danh sách bàn giao</div>
              <div>
                <ProjectFile data={data} />
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProjectTabsDetail;
