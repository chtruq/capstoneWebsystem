import { getFacilities } from "@/app/actions/facility";
import { getProject } from "@/app/actions/project";
import { getAllProviders } from "@/app/actions/provider";
import { getTeams } from "@/app/actions/team";
import ProjectCreate from "@/components/project-manage/projectCreate/ProjectCreate";
import React from "react";

const ProjectEdit = async ({ params }: { params: { id: string } }) => {
  const facilities = await getFacilities();
  const teams = await getTeams();
  const providers = await getAllProviders();
  const data = await getProject(params.id);

  console.log(data);

  return (
    <div>
      <h1 className="font-semibold text-2xl">Tạo mới dự án</h1>

      <div>
        <ProjectCreate
          data={data}
          providers={providers.data.data}
          teams={teams.data}
          facilities={facilities.data}
        />
      </div>
    </div>
  );
};

export default ProjectEdit;
