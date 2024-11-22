import React from "react";
import { getProject } from "@/app/actions/project";
import ProjectTabsDetail from "@/components/project-manage/ProjectTabDetail/ProjectTabsDetail";
import Project from "../../../../../../../../model/project";

const ProjectUpdate = async ({ params }: { params: { id: string } }) => {
  // const data: User = await getUser(params.id);
  const data: Project = await getProject(params.id);

  console.log("data", data);

  return (
    <div>
      <div>
        <h1 className="text-2xl font-semibold">Chi tiết dự án</h1>
      </div>
      <div className="w-full">
        <ProjectTabsDetail data={data} />
      </div>
    </div>
  );
};

export default ProjectUpdate;
