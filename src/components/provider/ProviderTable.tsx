import React, { FC } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/lib/utils/dataFormat";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import ProviderManage from "@/app/(main)/admin/dashboard/provider-manage/page";
import ProviderManageTable from "./ProviderManageTable";

interface Props {
  data: any;
}

const ProviderTable: FC<Props> = async ({ data }: Props) => {
  console.log("Data in prota", data);

  return (
    <div>
      {!data ? (
        <div className="flex justify-center items-center">Không có kết quả</div>
      ) : (
        <ProviderManageTable data={data} />
      )}
    </div>
  );
};

export default ProviderTable;
