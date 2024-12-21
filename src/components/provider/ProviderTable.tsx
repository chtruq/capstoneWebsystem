import React, { FC } from "react";

import ProviderManageTable from "./ProviderManageTable";

interface Props {
  data: any;
}

const ProviderTable: FC<Props> = async ({ data }: Props) => {
  console.log("Data in prota", data);

  return (
    <div>
      {!data ? (
        <div className="flex justify-center items-center">
          Không có kết quả!!
        </div>
      ) : (
        <ProviderManageTable data={data} />
      )}
    </div>
  );
};

export default ProviderTable;
