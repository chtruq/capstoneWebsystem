import { getUsers } from "@/app/actions/user";
import AccountManage from "@/components/user/AccountManage";
import React from "react";

async function UserManagePage({ searchParams }: { searchParams: any }) {
  const page = searchParams.page || 1;
  const pageSize = searchParams.pageSize || 10;
  const data: User[] = await getUsers(page, pageSize);

  return (
    <div>
      <AccountManage data={data} />
    </div>
  );
}

export default UserManagePage;
