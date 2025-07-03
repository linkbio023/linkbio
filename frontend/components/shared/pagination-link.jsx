"use client";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function PaginationComponent({ totalContent = 1 }) {
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const paginationNumbers = [];
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const totalPage = Math.ceil(totalContent / 10);

  useEffect(() => {
    const page = searchParams.get("page");
    if (page) {
      setCurrentPageNumber(parseInt(page) || 1);
    }
  }, [pathName, searchParams]);

  function createpageUrl(pageNumber) {
    // If the page number is less than or equal to 1, we dont need to add it to the query params
    if (pageNumber <= 1) {
      return pathName;
    }
    const search = new URLSearchParams(searchParams);
    search.set("page", pageNumber);
    return `${pathName}?${search.toString()}`;
  }

  // Dont show the pagination if there is only one page or no page
  if (totalPage <= 1) {
    return null;
  }

  const pagesToShow = 1;
  const pagesLeftOfCurrent = Math.floor(pagesToShow / 2);
  const pagesRightOfCurrent = Math.ceil(pagesToShow / 2);
  let firstPage = currentPageNumber - pagesLeftOfCurrent;
  let lastPage = currentPageNumber + pagesRightOfCurrent;

  // If the first page is less than 1, we need to adjust the last page
  if (firstPage < 1) {
    firstPage = 1;
    lastPage = pagesToShow;
  }

  // If the last page is greater than the total page, we need to adjust the first page
  if (lastPage > totalPage) {
    lastPage = totalPage;
    firstPage = totalPage - pagesToShow + 1;
  }

  // If the first page is less than 1, we need to adjust it to 1
  if (firstPage < 1) {
    firstPage = 1;
  }

  // If the last page is greater than the total page, we need to adjust it to the total page
  for (let i = firstPage; i <= lastPage; i++) {
    paginationNumbers.push(i);
  }

  function handlePageChange(pageNumber) {
    setCurrentPageNumber(pageNumber);
  }

  function handlePreviousClick() {
    if (currentPageNumber > 1) {
      setCurrentPageNumber(currentPageNumber - 1);
    }
  }

  function handleNextClick() {
    if (currentPageNumber < totalPage) {
      setCurrentPageNumber(currentPageNumber + 1);
    }
  }

  // Show PaginationEllipsis if pages are more than 3

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={createpageUrl(currentPageNumber - 1)}
            onClick={handlePreviousClick}
            aria-disabled={currentPageNumber <= 1}
            className={
              currentPageNumber <= 1
                ? "pointer-events-none opacity-50"
                : undefined
            }
          />
        </PaginationItem>
        {paginationNumbers.map((pageNumber) => (
          <PaginationItem key={pageNumber}>
            <PaginationLink
              href={createpageUrl(pageNumber)}
              isActive={currentPageNumber === pageNumber}
              onClick={() => handlePageChange(pageNumber)}
            >
              {pageNumber}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            href={createpageUrl(currentPageNumber + 1)}
            onClick={handleNextClick}
            aria-disabled={currentPageNumber >= totalPage}
            className={
              currentPageNumber >= totalPage
                ? "pointer-events-none opacity-50"
                : undefined
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
