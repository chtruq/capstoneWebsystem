"use client";

import React, { FC } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AddFinancialContract from "../AddFinancialContract";
import DialogAction from "@/components/dialog/DialogAction";
import { deleteFinancialContract } from "@/app/actions/project";
import { revalidateProjectPath } from "@/app/actions/revalidate";
import { usePathname } from "next/navigation";
interface Props {
  data: Project;
  role: string;
}
const ProjectContractTable: FC<Props> = ({ data, role }) => {
  const pathName = usePathname();
  // console.log("role", role)

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Loại căn hộ</TableHead>
          <TableHead>Giá trị đặt cọc </TableHead>
          <TableHead>Tiền môi giới</TableHead>
          <TableHead>Hoa hồng</TableHead>

          {
            role === "Management" && (
              <TableHead>Hành động</TableHead>

            )
          }
        </TableRow>
      </TableHeader>
      <TableBody>
        {data && data?.financialContracts?.length > 0 ? (
          data?.financialContracts?.map((contract: FinancialContract) => (
            <TableRow key={contract.financialContractID}>
              <TableCell>
                {contract.lowestPrice} - {contract.highestPrice}
              </TableCell>
              <TableCell>{contract.depositAmount}</TableCell>
              <TableCell>{contract.brokerageFee}</TableCell>
              <TableCell>{contract.commissionFee}</TableCell>
              <TableCell>
                {role === "Management" && (
                  <div className="flex gap-1">
                    <AddFinancialContract
                      projectApartmentId={data?.projectApartmentID}
                      title="Sửa"
                      dialogTitle="Sửa thông tin môi giới"
                      data={contract}
                    />
                    <DialogAction
                      title="Xóa thông tin"
                      description="Bạn có chắc chắn muốn xóa thông tin này không?"
                      action={async () => {
                        await deleteFinancialContract(contract.financialContractID);
                        revalidateProjectPath(pathName);
                      }}
                      btnTitle="Xóa"
                      btnActionTitle="Xoá"
                    />
                  </div>
                )
                }
                {/* <div className="flex gap-1">
                <AddFinancialContract
                  projectApartmentId={data?.projectApartmentID}
                  title="Sửa"
                  dialogTitle="Sửa thông tin môi giới"
                  data={contract}
                />
                <DialogAction
                  title="Xóa thông tin"
                  description="Bạn có chắc chắn muốn xóa thông tin này không?"
                  action={async () => {
                    await deleteFinancialContract(contract.financialContractID);
                    revalidateProjectPath(pathName);
                  }}
                  btnTitle="Xóa"
                  btnActionTitle="Xoá"
                />
              </div> */}
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={5} className="text-center">
              Không có dữ liệu
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default ProjectContractTable;
