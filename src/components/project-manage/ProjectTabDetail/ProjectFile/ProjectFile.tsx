import React, { FC } from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { formatDateTime } from "@/lib/utils/dataFormat";

interface Props {
  data: Project;
}

const ProjectFile: FC<Props> = ({ data }) => {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-medium">Ngày bàn giao</TableHead>
            <TableHead className="font-medium">Mô tả file</TableHead>
            <TableHead className="font-medium">Tải xuống</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.projectFiles?.map((file) => (
            <TableRow key={file.projectFileID}>
              <TableHead>{formatDateTime(file.updateDate)}</TableHead>
              <TableHead>{file.description}</TableHead>
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
