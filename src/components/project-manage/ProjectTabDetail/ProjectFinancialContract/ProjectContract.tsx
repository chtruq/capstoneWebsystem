"use client";

import React, { FC } from "react";
import AddFinancialContract from "./AddFinancialContract";
import ProjectContractTable from "./ProjectConTractTable/ProjectContractTable";
import AddProjectFileContract from "./AddProjectFileContract";
import { FileDown, X } from "lucide-react";
import { deleteProjectFileContract } from "@/app/actions/project";
import { revalidateProjectPath } from "@/app/actions/revalidate";
import { usePathname } from "next/navigation";
import DialogConfirm from "@/components/dialog/DialogConfirm";
interface Props {
  data: Project;
  role: string;
}

const ProjectContract: FC<Props> = ({ data, role }) => {
  const pathName = usePathname();
  console.log("đaaaaa", data);

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

      <div className="flex w-full justify-between">
        <h1 className="font-semibold">Hợp đồng liên quan</h1>
        <AddProjectFileContract ProjectApartmentID={data?.projectApartmentID} />
      </div>
      {/* File tài liêu */}
      {data?.projectFiles?.filter((document: ProjectFile) => document.projectFileTypes !== "File").length > 0 ? (
        <div className="grid grid-cols-1 divide-y divide-slate-600 w-[60%]">
          {data.projectFiles
            .filter((document: ProjectFile) => document.projectFileTypes !== "File")
            .map((document: ProjectFile, index: number) => (
              <div key={index} className="flex justify-between items-center">
                <p className="py-1">{document.description}</p>
                <div className="flex space-x-1 items-center">
                  <FileDown
                    className="h-5 w-5 cursor-pointer text-blur"
                    onClick={() => {
                      window.open(document.projectFileUrl);
                    }}
                  />
                  <DialogConfirm
                    id={document.projectFileID}
                    type="project-file"
                    title="Bạn có muốn xóa file này không"
                    fileName={document.description}
                  />
                </div>
              </div>
            ))}
        </div>
      ) : (
        <p>Không có tài liệu liên quan</p>
      )}


    </div>
  );
};

export default ProjectContract;
