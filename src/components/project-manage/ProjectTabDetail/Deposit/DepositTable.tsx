import React, { FC } from "react";
import { getDepositByProjectId } from "@/app/actions/deposit";
import DepositMangeTable from "./DepositMangeTable";

interface Props {
  projectId: string;
}

const DepositTable: FC<Props> = async ({ projectId }) => {
  let data;
  data = await getDepositByProjectId(projectId);
  console.log("Data edpossit", data?.deposits);

  return (
    <div>
      <h1> {projectId}</h1>
      {/* <DepositMangeTable data={data?.data?.data?.data} /> */}
    </div>
  );
}

export default DepositTable;