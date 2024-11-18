import React, { FC } from "react";
import { IconProps } from "../../model/icon";

const CombineCirlePlus: FC<IconProps> = ({ width, height }) => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width || 14}
        height={height || 14}
        viewBox="0 0 14 14"
        fill="none"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M7.00016 0.333313C10.6821 0.333313 13.6668 3.31808 13.6668 6.99998C13.6668 10.6819 10.6821 13.6666 7.00016 13.6666C3.31826 13.6666 0.333496 10.6819 0.333496 6.99998C0.333496 3.31808 3.31826 0.333313 7.00016 0.333313ZM7.00016 1.99998C4.23874 1.99998 2.00016 4.23856 2.00016 6.99998C2.00016 9.7614 4.23874 12 7.00016 12C9.76159 12 12.0002 9.7614 12.0002 6.99998C12.0002 4.23856 9.76159 1.99998 7.00016 1.99998ZM7.8335 3.66665L7.83347 6.16665H10.3335V7.83331L7.83347 7.83329L7.8335 10.3333H6.16683V7.83329L3.66683 7.83331V6.16665H6.16683V3.66665H7.8335Z"
          fill="black"
          fill-opacity="0.7"
        />
      </svg>
    </>
  );
};

export default CombineCirlePlus;
