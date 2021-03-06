import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  PaginationContainer,
  PaginationUl,
  PaginationLi,
  PaginationLiWithoutHover,
  StyledLeftChevron,
  StyledRightChevron,
  PaginationDiv,
} from "./Pagination.elements.js";

const Pagination = ({
  postsPerPage,
  totalPosts,
  paginate,
  currentPage,
  setCurrentPage,
  loading,
  keywordSearch,
  tagSearch,
  tag,
  username,
}) => {
  const location = useLocation();
  const [timesRight, setTimesRight] = useState(0);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const replacePageUrl = (page) => {
    if (keywordSearch || tagSearch) {
      window.history.replaceState(
        null,
        "Audsio",
        `/search?q=${keywordSearch}&tags=${tagSearch
          .trim()
          .split(" ")
          .join(",")}&pg=${page}`
      );
    } else if (
      window.location.href.startsWith(
        process.env.NODE_ENV === "development"
          ? "http://localhost:3000/liked"
          : "https://www.audsio.com/liked"
      )
    ) {
      window.history.replaceState(null, "Audsio", `/liked?pg=${page}`);
    } else if (
      window.location.href.startsWith(
        process.env.NODE_ENV === "development"
          ? "http://localhost:3000/t"
          : "https://www.audsio.com/t"
      )
    ) {
      window.history.replaceState(null, "Audsio", `/t?tag=${tag}&pg=${page}`);
    } else if (
      window.location.href.startsWith(
        process.env.NODE_ENV === "development"
          ? "http://localhost:3000/u"
          : "https://www.audsio.com/u"
      )
    ) {
      window.history.replaceState(
        null,
        "Audsio",
        `/u?name=${username}&pg=${page}`
      );
    } else {
      window.history.replaceState(null, "Audsio", `/home?pg=${page}`);
    }
  };

  useEffect(() => {
    if (currentPage > 0 && currentPage <= pageNumbers.length) {
      setTimesRight(Math.floor((currentPage - 1) / 5));
      paginate(currentPage);
    } else if (!loading) {
      paginate(1);
      setCurrentPage(1);
      if (!tag) {
        replacePageUrl(1);
      }
    }
    if (!window.location.href.includes("pg")) {
      paginate(1);
      setTimesRight(0);
      setCurrentPage(1);
    }
  }, [pageNumbers, window.location.href]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    totalPosts !== 0 && (
      <>
        <PaginationContainer>
          <PaginationUl>
            <PaginationLi
              onClick={() => {
                if (currentPage !== 1) {
                  setTimesRight(Math.floor((currentPage - 2) / 5));
                  paginate(currentPage - 1);
                  replacePageUrl(currentPage - 1);
                  setCurrentPage(currentPage - 1);
                }
              }}
            >
              <StyledLeftChevron />
            </PaginationLi>
            {timesRight > 0 && (
              <PaginationLiWithoutHover>...</PaginationLiWithoutHover>
            )}
            {pageNumbers.map(
              (number, index) =>
                index < 5 &&
                number + 5 * timesRight < pageNumbers.length + 1 && (
                  <PaginationLi
                    key={number + 5 * timesRight}
                    onClick={() => {
                      setTimesRight(Math.floor(currentPage / 5));
                      paginate(number + 5 * timesRight);
                      replacePageUrl(number + 5 * timesRight);
                      setCurrentPage(number + 5 * timesRight);
                    }}
                    active={
                      currentPage === number + 5 * timesRight ? "true" : "false"
                    }
                  >
                    {number + 5 * timesRight}
                  </PaginationLi>
                )
            )}
            {5 * (timesRight + 1) < pageNumbers[pageNumbers.length - 1] && (
              <PaginationLiWithoutHover>...</PaginationLiWithoutHover>
            )}
            <PaginationLi
              onClick={() => {
                if (currentPage !== pageNumbers[pageNumbers.length - 1]) {
                  setTimesRight(Math.floor(currentPage / 5));
                  paginate(currentPage + 1);
                  setCurrentPage(currentPage + 1);
                  replacePageUrl(currentPage + 1);
                }
              }}
            >
              <StyledRightChevron />
            </PaginationLi>
          </PaginationUl>
        </PaginationContainer>
        <PaginationDiv>
          {totalPosts} {totalPosts == 1 ? "post" : "posts"} found
        </PaginationDiv>
      </>
    )
  );
};

export default Pagination;
