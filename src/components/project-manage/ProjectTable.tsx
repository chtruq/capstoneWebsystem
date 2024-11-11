import React, { FC } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Project from "../../../model/project";
import { getProjectApartment } from "@/app/actions/project";

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
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Code</TableHead>
              <TableHead>Tên dự án</TableHead>
              <TableHead>Khoảng giá</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead>Nhà cung cấp</TableHead>
              <TableHead>Loại dự án</TableHead>
              <TableHead>Team được gán</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.projects?.map((project: Project) => (
              <TableRow key={project.projectApartmentID}>
                <TableCell>{project.projectApartmentID}</TableCell>
                <TableCell>{project.projectApartmentName}</TableCell>
                <TableCell>{project.price_range}</TableCell>
                <TableCell>{project.projectApartmentStatus}</TableCell>
                <TableCell>{project.apartmentProjectProviderName}</TableCell>
                <TableCell>{project.projectType}</TableCell>
                <TableCell>{project.teamID}</TableCell>
                <TableCell className="gap-1 flex">
                  <Button variant="outline">Sửa</Button>
                  <Button variant="outline">Xóa</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default ProjectTable;
