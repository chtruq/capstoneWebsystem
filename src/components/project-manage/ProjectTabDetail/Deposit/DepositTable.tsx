import React, { FC } from "react";
import { getDepositByProjectId } from "@/app/actions/deposit";
import DepositMangeTable from "./DepositMangeTable";
import { getUserInfoFromCookies } from "@/app/actions/auth";

interface Props {
  projectId: string;
}

const DepositTable: FC<Props> = async ({ projectId }) => {
  const userToken = await getUserInfoFromCookies();

  const data = await getDepositByProjectId(projectId);
  console.log("Data edpossit", data?.deposits);

  return (
    <div>
      <h1> {projectId}</h1>
      <DepositMangeTable data={data?.deposits} accountId={userToken?.id} />
    </div>
  );
};

export default DepositTable;
