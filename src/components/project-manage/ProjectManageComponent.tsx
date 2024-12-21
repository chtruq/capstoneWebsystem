"use client";
import React, { FC, useEffect, useState } from "react";
import { Button } from "../ui/button";
import ProjectTable from "./ProjectTable";
import { Input } from "../ui/input";
import { getProjectApartment } from "@/app/actions/project";
// import PaginationComponent from "../pagination/paginationComponent";

interface Props {
  data: Project[];
}

const ProjectManageComponent: FC<Props> = ({ data }) => {
  const [searchData, setSearchData] = useState<Project[]>(data);

  const handleSearch = async (e: any) => {
    try {
      const res = await getProjectApartment({
        query: e.target.value,
        currentPage: 1,
      });
      setSearchData(res);
    } catch (error) {
      console.error("Error fetching project apartments:", error);
      throw error;
    }
  };

  //   const handlePagination = async (page: number) => {
  //     try {
  //       const res = await getProjectApartment({
  //         params: { pageIndex: page },
  //       });
  //       setSearchData(res);
  //     } catch (error) {
  //       console.error("Error fetching project apartments:", error);
  //       throw error;
  //     }
  //   }

  useEffect(() => {
    if (data) {
      setSearchData(data);
    }
  }, [data]);

  return (
    <div>
      <div>
        <h1>Quản lý dự án</h1>
      </div>
      <Input
        placeholder="Tìm kiếm dự án"
        onMouseLeave={(e) => {
          handleSearch(e);
        }}
        onMouseOut={(e) => {
          handleSearch(e);
        }}
      />
      <div className="flex justify-end">
        <Button variant="outline">Thêm dự án</Button>
      </div>
      <div>
        {searchData && searchData.length === 0 ? (
          <div>Không có dự án nào giống với tìm kiếm</div>
        ) : (
          <>
            <ProjectTable data={searchData ? searchData : data} />
          </>
        )}
      </div>
      <div className="absolute bottom-0 right-0">
        {/* <PaginationComponent 
            total={100}
            pageSize={10}
            onChange={handlePagination}
            
        /> */}
      </div>
    </div>
  );
};

export default ProjectManageComponent;
