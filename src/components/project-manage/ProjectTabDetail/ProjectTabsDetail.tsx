import React, { FC } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { tableText } from "@/lib/utils/project";
import Image from "next/image";
import ProjectCartTable from "./ProjectCart/ProjectCartTable";
import ProjectContract from "./ProjectFinancialContract/ProjectContract";
import ProjectFile from "./ProjectFile/ProjectFile";
import { getProjectApartmentCart } from "@/app/actions/apartment";
import PaginationComponent from "@/components/pagination/PaginationComponent";
import ImageGallery from "@/components/ui/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getUserInforFromCookie } from "@/app/actions/auth";
import DepositTable from "./Deposit/DepositTable";
import { formatDate } from "@/lib/utils/dataFormat";
import AddProjectBulkFile from "./ProjectFinancialContract/AddProjectBulkFile";
import FacilityDialog from "@/components/facilityDialog/FacilityDialog";
import { getFacilities } from "@/app/actions/facility";
import ImagePickerProject from "@/components/ImgpickerProject/ImagePickerProject";
interface Props {
  data: Project;
  searchParam?: Promise<{
    page?: string;
  }>;
}

const tableType = (type: string) => {
  switch (type) {
    case "OnSale":
      return (
        <div className="bg-primary-foreground rounded-md p-1 flex items-center justify-center w-28">
          <p className="text-money text-center">Đã bàn giao</p>
        </div>
      );
    case "UpcomingforSale":
      return (
        <div className="bg-primary-foreground rounded-md p-1 flex items-center justify-center w-28">
          <p className="text-money text-center">Đã bàn giao</p>
        </div>
      );
    case "HandedOver":
      return (
        <div className="bg-success-foreground rounded-md p-1 flex items-center justify-center w-28">
          <span className="text-success">Đang mở bán</span>
        </div>
      );
    // case "HandedOver":
    //   return (
    //     <div className="bg-success-foreground rounded-md p-1 flex items-center justify-center">
    //       <span className="text-success">HandedOver</span>
    //     </div>
    //   );

    default:
      return type;
  }
};

const ProjectTabsDetail: FC<Props> = async (props) => {
  const { data, searchParam } = props;
  const searchParams = await searchParam;
  const currentPage = Number(searchParams?.page) || 1;
  const projectCart = await getProjectApartmentCart({
    projectId: data?.projectApartmentID,
    currentPage,
  });

  const userInfor = await getUserInforFromCookie();

  const totalPages = projectCart.totalPage;
  const totalItem = projectCart.totalItem;
  const count = projectCart.apartments.length;
  const facilitiesRes = await getFacilities();
  const facilities: Facility[] = facilitiesRes.data;
  console.log("imageeeeeeee", data?.projectImages);

  return (
    <div className="w-full">
      {/* <h1>data {data?.projectApartmentID}</h1> */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid max-w-screen-sm grid-cols-5">
          <TabsTrigger value="overview">Tổng quan</TabsTrigger>
          <TabsTrigger value="media">Phương tiện</TabsTrigger>
          <TabsTrigger value="facility">Tiện ích</TabsTrigger>
          <TabsTrigger value="cart">Giỏ hàng</TabsTrigger>
          <TabsTrigger value="contract">Hợp đồng</TabsTrigger>
          {/* <TabsTrigger value="request-deposit">Yêu cầu đặt cọc</TabsTrigger> */}
        </TabsList>
        <TabsContent className="w-full" value="overview">
          <div>
            <h1 className="font-semibold mb-2">Thông tin dự án:</h1>
            <div className="flex w-full gap-3">
              <div className="w-1/2">
                <div className="flex justify-between w-full">
                  <div className="grid grid-cols-2 gap-y-2 w-full">
                    <div className="text-base text-blur font-semibold">Tên dự án</div>
                    <div>{data?.projectApartmentName}</div>

                    <div className="text-base text-blur font-semibold">Mã dự án:</div>
                    <div>{data?.projectCode}</div>

                    <div className="text-base text-blur font-semibold ">Trạng thái:</div>
                    <div>{data?.projectType}</div>

                    <div className="text-base text-blur font-semibold ">Nhà cung cấp:</div>
                    <div>{tableText(data?.apartmentProjectProviderName)}</div>

                    <div className="text-base text-blur font-semibold ">Nhóm quản lý:</div>
                    <div>{tableText(data?.teamName)}</div>

                    <div className="text-base text-blur font-semibold ">Diện tích dự án:</div>
                    <div>{tableText(data?.projectArea)} ha</div>

                    <div className="text-base text-blur font-semibold ">Địa chỉ:</div>
                    <div>{tableText(data?.address)}</div>
                  </div>
                </div>
              </div>
              <div className="w-1/2">
                <div className="flex justify-between w-full">
                  <div className="grid grid-cols-2 gap-y-2 w-full">
                    <div className="text-base text-blur font-semibold">Quy mô dự án:</div>
                    <div>{tableText(data?.projectSize)}</div>

                    <div className="text-base text-blur font-semibold">Số căn hộ:</div>
                    <div>{tableText(data?.totalApartment)}</div>

                    <div className="text-base text-blur font-semibold ">Diện tích căn hộ:</div>
                    <div>{tableText(data?.apartmentArea)}</div>

                    <div className="text-base text-blur font-semibold ">Năm khởi công:</div>
                    <div>
                      {tableText(formatDate(data?.constructionStartYear ?? ""))}
                    </div>

                    <div className="text-base text-blur font-semibold ">Năm bàn giao:</div>
                    <div>
                      {tableText(formatDate(data?.constructionEndYear ?? ""))}
                    </div>

                    <div className="text-base text-blur font-semibold ">Năm cấp phép:</div>
                    <div>
                      {tableText(formatDate(data?.licensingDate?.toString() ?? ""))}
                    </div>

                    <div className="text-base text-blur font-semibold ">Cơ quan cấp phép:</div>
                    <div>
                      {data.licensingAuthority}
                    </div>

                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <h1 className="font-semibold">Giỏ hàng:</h1>
              <div className="grid grid-cols-2 gap-y-1 w-[50%]">
                <div className="text-base  text-blur">Tổng số căn:</div>
                <div>{data?.totalApartments}</div>

                <div className="text-base  text-blur">Căn hộ hiện hữu:</div>
                <div>{data?.totalApartments}</div>
              </div>
            </div>
            <div className="flex space-x-12 mt-4">
              <div className="w-2/3">
                <h1 className="font-semibold">Thông tin mô tả:</h1>
                <div>{data?.projectApartmentDescription}</div>
              </div>
              <div className="w-1/3">
                <h1 className="font-semibold">Tiện ích nội khu:</h1>
                <div>
                  <ul>
                    {data?.facilities.map(
                      (facility: {
                        facilitiesID: string;
                        facilitiesName: string;
                      }) => (
                        <li key={facility?.facilitiesID}>
                          {facility?.facilitiesName}
                        </li>
                      )
                    )}
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
              <ImageGallery
                images={data?.projectImages.map((img) => ({
                  imageID: img.projectImageID,
                  url: img.url,
                  description: img.description,
                }))}
              />
            </div>

            <div>
              <ImagePickerProject projectId={data?.projectApartmentID} />
            </div>
          </div>
        </TabsContent>
        <TabsContent value="facility">
          <div>
            <h1 className="font-semibold">Các tiện ích của dự án</h1>
            <FacilityDialog data={data} facility={facilities} />
            <div>
              <ul>
                {data?.facilities.map(
                  (facility: {
                    facilitiesID: string;
                    facilitiesName: string;
                  }) => (
                    <li key={facility?.facilitiesID}>
                      {facility?.facilitiesName}
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="cart">
          <div>
            {/* <div className="flex justify-between">
              {userInfor?.role === "Staff" ? (
                <div className="w-3/4 flex justify-end mr-20">
                  <Button variant="default">
                    <Link
                      href={`/staff/dashboard/project-manage/${data?.projectApartmentID}/apartment-create`}
                    >
                      Tạo căn hộ
                    </Link>
                  </Button>
                </div>
              ) : (
                <></>
              )}
            </div> */}
            <div>
              <ProjectCartTable
                data={projectCart.apartments}
                role={userInfor?.role}
              />
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
                <div className="text-sm text-blur">Nhà cung cấp</div>
                <div>{tableText(data?.projectApartmentName)}</div>

                {/* <div className="text-sm text-blur">Số liên hệ</div>
                <div>{tableText(data?.projectApartmentID)}</div>

                <div className="text-sm text-blur">Email</div>
                <div>{tableText(data?.projectSize)}</div> */}

                <div className="text-sm text-blur">Người đại diện</div>
                <div>{tableText(data?.apartmentProjectProviderName)}</div>
              </div>
              {/* <div className="w-32 h-32">
                <Image src={data?.projectImages[0]?.imageUrl} alt="logo" />
              </div> */}
            </div>

            {/* Tiền môi giới và hợp đồng liên quan */}
            <div className="w-full">
              <ProjectContract data={data} role={userInfor?.role} />
            </div>

            {/* Hợp đồng */}
            <div className="mt-4">
              <h1 className="font-semibold">Danh sách bàn giao</h1>
              <AddProjectBulkFile ProjectApartmentID={data.projectApartmentID} />
              <div>
                <ProjectFile data={data} />
              </div>
            </div>
          </div>
        </TabsContent>

        {/* <TabsContent value="request-deposit">
          <div>
            <DepositTable projectId={data?.projectApartmentID} />
          </div>
        </TabsContent> */}
      </Tabs>
    </div>
  );
};

export default ProjectTabsDetail;
