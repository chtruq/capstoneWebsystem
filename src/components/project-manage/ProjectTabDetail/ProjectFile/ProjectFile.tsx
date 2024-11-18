import React, { FC } from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

interface Props {
  data: Project;
}

const ProjectFile: FC<Props> = ({ data }) => {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Ngày bàn giao</TableHead>
            <TableHead>Mô tả file</TableHead>
            <TableHead>Tải xuống</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.projectFiles?.map((file) => (
            <TableRow key={file.projectFileID}>
              <TableHead>{file.projectFileDate}</TableHead>
              <TableHead>{file.projectFileDescription}</TableHead>
              <TableHead>
                <Button variant="outline">Tải xuống</Button>
              </TableHead>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProjectFile;
