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

interface Props {
  data: Project[];
}

const ProjectTable: FC<Props> = ({ data }) => {
  return (
    <div>
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
          {data?.map((project: Project) => (
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
    </div>
  );
};

export default ProjectTable;
