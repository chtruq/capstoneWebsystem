import React, { FC } from "react";

import { getUsers } from "@/app/actions/user";
import UserManageTable from "./UserManageTable";

interface Props {
  query: string;
  currentPage: number;
}
const UserTable: FC<Props> = async ({ query, currentPage }: Props) => {
  let data;
  try {
    data = await getUsers({ query, currentPage });
    console.log(data?.data?.data);
  } catch (error) {
    console.log(error);
  }

  return (
    <div>
      {!data ? (
        <>
          <div className="flex justify-center items-center">
            Không có kết quả
          </div>
        </>
      ) : (
        <UserManageTable data={data?.accounts} />
      )}
    </div>
  );
};

export default UserTable;
