import React, { FC } from "react";
import PaginationComponent from "@/components/pagination/PaginationComponent";


interface Props {
  query: string;
  currentPage: number;
}

const ConsignmentTable: FC<Props> = ({ query, currentPage }: Props) => {
  // const dataConsignment = await getConsignmentTest({ query, currentPage });


  return (
    <div>
      <div>Consignment Table</div>
      <PaginationComponent totalPages={10} />
    </div>
  );
};

export default ConsignmentTable;