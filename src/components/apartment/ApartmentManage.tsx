import React, { FC } from "react";
import { Button } from "../ui/button";
import ApartmentTable from "./ApartmentTable";

interface Props {
  data: Apartment[];
}

const ApartmentManageComponent: FC<Props> = ({ data }) => {
  return (
    <div>
      <div>
        <h1 className="text-2xl">Quản lý căn hộ</h1>
      </div>
      <div className="flex justify-end">
        <Button variant="outline">Thêm căn hộ</Button>
      </div>
      <div>
        <ApartmentTable data={data} />
      </div>
    </div>
  );
};

export default ApartmentManageComponent;
