import React, { FC } from "react";

import { getProjectApartment, getProjectApartmentByStaff } from "@/app/actions/project";
import ProjectManageTable from "./ProjectManageTable";
import { Button } from "../ui/button";
import { getUserInfoFromCookies } from "@/app/actions/auth";

interface Props {
  query: string;
  currentPage: number;
}



const ProjectTable: FC<Props> = async ({ query, currentPage }: Props) => {
  let data;
  const userToken = await getUserInfoFromCookies();
  console.log("User Tolken", userToken);
  console.log("User role", userToken.role);
  console.log("User id", userToken.id);
  
  try {
    // Kiểm tra role để quyết định gọi hàm nào
    if (userToken.role === "Staff") {
      console.log("Fetching data for staff...");
      data = await getProjectApartmentByStaff({
        userId: userToken.id, 
        query,
        currentPage,
      });
    } else {
      console.log("Fetching data for other roles...");
      data = await getProjectApartment({
        query,
        currentPage,
      });
    }
  } catch (error) {
    console.log("Error fetching data:", error);
  }

  return (
    <div>
      {!data ? (
        <div className="flex justify-center items-center">Không có kết quả</div>
      ) : (
        <>
          <ProjectManageTable data={data?.projects} />
        </>
      )}
    </div>
  );
};

export default ProjectTable;
