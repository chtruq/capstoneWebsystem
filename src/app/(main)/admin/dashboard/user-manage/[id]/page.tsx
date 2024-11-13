import { getUser } from "@/app/actions/user";
import UserEdit from "@/components/user/table/edit/UserEdit";
import React from "react";

const UserUpdate = async ({ params }: { params: { id: string } }) => {
  const data: User = await getUser(params.id);
  console.log(data);
  return (
    <div>
      <h1 className="text-2xl font-semibold">Chỉnh sửa tài khoản</h1>
      <div>
        <UserEdit data={data} />
      </div>
      {/* <div>My Post: {params.id}</div> */}
    </div>
  );
};

export default UserUpdate;
