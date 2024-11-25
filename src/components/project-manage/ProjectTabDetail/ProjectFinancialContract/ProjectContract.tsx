import React, { FC } from "react";
import AddFinancialContract from "./AddFinancialContract";
import ProjectContractTable from "./ProjectConTractTable/ProjectContractTable";

interface Props {
  data: Project;
  role: string;
}

const ProjectContract: FC<Props> = ({ data, role }) => {
  return (
    <div className="w-full">
      <div className="flex w-full justify-between">
        <h1 className="font-semibold">Tiền môi giới</h1>
        {role === "Management" && (
          <div className="justify-start">
            <AddFinancialContract
              projectApartmentId={data?.projectApartmentID}
              title="Loại căn hộ"
              dialogTitle="Thêm thông tin môi giới"
            />
          </div>
        )}


      </div>
      <ProjectContractTable data={data} role={role} />
    </div>
  );
};

export default ProjectContract;
