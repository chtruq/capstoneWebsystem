"use client";

import React, { FC } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePathname, useSearchParams } from "next/navigation";
interface Props {
  totalPages: number;
}

const PaginationComponent: FC<Props> = ({ totalPages }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            {currentPage === 1 ? (
              <></>
            ) : (
              <>
                <PaginationPrevious href={createPageURL(currentPage - 1)} />
              </>
            )}
          </PaginationItem>
          {currentPage === totalPages ? (
            <PaginationItem>
              <PaginationLink href={createPageURL(1)}>1</PaginationLink>
            </PaginationItem>
          ) : (
            <>
              <PaginationItem>
                <PaginationLink href={createPageURL(currentPage)}>
                  {currentPage}
                </PaginationLink>
              </PaginationItem>
            </>
          )}

          {totalPages === 1 ? (
            <></>
          ) : (
            <>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href={createPageURL(totalPages)}>
                  {totalPages}
                </PaginationLink>
              </PaginationItem>
            </>
          )}

          <PaginationItem>
            {currentPage === totalPages ? (
              <></>
            ) : (
              <>
                <PaginationNext href={createPageURL(currentPage + 1)} />
              </>
            )}
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default PaginationComponent;
