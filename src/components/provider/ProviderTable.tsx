import { getProviders } from "@/app/actions/provider";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Provider } from "../../../model/provider";
interface ProviderTableProps {
  query: string;
  currentPage: number;
}

const ProviderTable = async ({ query, currentPage }: ProviderTableProps) => {
  let providers;
  try {
    providers = await getProviders({ query, currentPage });
    console.log("abc", providers?.data?.data);
  } catch (error) {
    console.log(error);
  }

  return (
    <div>
      {!providers ? (
        <div className="flex justify-center items-center">Không có kết quả</div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tên nhà cung cấp</TableHead>
              <TableHead>Mô tả</TableHead>
              <TableHead>Thông tin</TableHead>
              <TableHead>Vị trí</TableHead>
              <TableHead>Ngày tạo</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {providers?.data?.data?.providers?.map((provider: Provider) => (
              <TableRow key={provider.apartmentProjectProviderID}>
                <TableCell>{provider.apartmentProjectProviderName}</TableCell>
                <TableCell>{provider.apartmentProjectDescription}</TableCell>
                <TableCell>{provider.legallInfor}</TableCell>
                <TableCell>{provider.location}</TableCell>
                <TableCell>{provider.createDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default ProviderTable;
