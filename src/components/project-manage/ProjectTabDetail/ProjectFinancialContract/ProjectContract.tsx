import React, { FC } from "react";
import AddFinancialContract from "./AddFinancialContract";
import ProjectContractTable from "./ProjectConTractTable/ProjectContractTable";

interface Props {
  data: Project;
}

const ProjectContract: FC<Props> = ({ data }) => {
  return (
    <div className="w-full">
      <div className="flex w-full justify-between">
        <h1 className="font-semibold">Tiền môi giới</h1>
        <div className="justify-start">
          <AddFinancialContract
            projectApartmentId={data?.projectApartmentID}
            title="Loại căn hộ"
            dialogTitle="Thêm thông tin môi giới"
          />
        </div>
      </div>
      <ProjectContractTable data={data} />
    </div>
  );
};

export default ProjectContract;
