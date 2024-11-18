import React, { FC } from "react";

import { getProjectApartment } from "@/app/actions/project";
import ProjectManageTable from "./ProjectManageTable";
import { Button } from "../ui/button";

interface Props {
  query: string;
  currentPage: number;
}

const ProjectTable: FC<Props> = async ({ query, currentPage }: Props) => {
  let data;
  try {
    data = await getProjectApartment({
      query,
      currentPage,
    });

    console.log("data", data);
  } catch (error) {
    console.log(error);
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
