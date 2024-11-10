import getProjectApartment from "@/app/actions/project";
import ProjectManageComponent from "@/components/project-manage/ProjectManageComponent";
import React from "react";

const ProjectManage = async () => {
  const page = 1;
  const pageSize = 10;
  const data = await getProjectApartment({
    params: { pageIndex: page, pageSize },
  });
  console.log(data);

  return (
    <div className="h-full">
      <ProjectManageComponent data={data} />
    </div>
  );
};

export default ProjectManage;
