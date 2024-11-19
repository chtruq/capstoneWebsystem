import React, { FC } from "react";

interface Props {
  data: any;
}

const TeamMemberTable: FC<Props> = ({ data }) => {
  console.log("Data", data);
  return (
    <div>
      <></>
    </div>
  );
};

export default TeamMemberTable;
