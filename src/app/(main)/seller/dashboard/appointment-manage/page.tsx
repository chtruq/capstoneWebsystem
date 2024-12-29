import React from 'react'
import { getUserInforFromCookie } from "@/app/actions/auth";
import PaginationComponent from "@/components/pagination/PaginationComponent";
import SearchInput from "@/components/search/SearchInput";
import { getTeamByAccountId } from '@/app/actions/team';
import { getAppointmentByAssignAccountId, getAppointmentByTeamId } from '@/app/actions/apointment';
import AppointmentTable from '@/components/appointment/AppointmentTable';
import { checkOwnerExist } from '@/app/actions/apartmentOwer';


async function AppointmentManage(props: {
  searchParams?: Promise<{
    keyword?: string;
    page?: string;
    tab?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.keyword || "";
  const currentPage = Number(searchParams?.page) || 1;
  const userToken = await getUserInforFromCookie();
  // console.log("User Tolken in page", userToken);
  // console.log("User Tolkenaaaaaaa", userToken?.id);

  const teamData = await getTeamByAccountId(userToken?.id);
  console.log("Team Data", teamData?.teamID);


  const dataAppointment = await getAppointmentByAssignAccountId({ query, currentPage, accountId: userToken?.id });
  console.log("Data in appointment", dataAppointment);
  const totalPages = dataAppointment?.totalPages;
  // console.log("TotalPages", totalPages);
  // const check =  await checkOwnerExist(userToken?.id);
  // console.log("Check Owner Exist", check);
  
  return (
    <div>
      <h1 className="text-2xl font-semibold">Lịch hẹn</h1>
      <div className='my-2 w-[30%]'>
        <SearchInput placeholder="Tìm kiếm mã lịch hẹn, tên khách hàng" query="keyword" />
      </div>
      <div>
        <AppointmentTable data={dataAppointment?.appointments} />
      </div>
      <div>
        {totalPages > 1 && (
          <PaginationComponent totalPages={totalPages} />
        )}
      </div>
    </div>
  )
}

export default AppointmentManage