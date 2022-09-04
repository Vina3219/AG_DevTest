import React, { useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectPageNum, setPageNum, selectTotalPage } from "../../slice";
import "./Pagination.css";

const Pagination = () => {
  const pageNum = useSelector(selectPageNum);
  const dispatch = useDispatch();
  const handlePageNumChange = useCallback(
    (page) => (event) => {
      event.preventDefault();
      dispatch(
        setPageNum({
          pageNum: page,
        })
      );
    },
    [dispatch]
  );
  const totalPage = useSelector(selectTotalPage);

  const displayedPageNums = useMemo(() => {
    if (pageNum === 1) {
      if (totalPage <= 1) {
        return [1];
      }
      if (totalPage <= 2) {
        return [1, 2];
      }
      return [1, 2, 3];
    }
    if (pageNum === totalPage) {
      if (totalPage === 2) {
        return [1, 2];
      }
      return [pageNum - 2, pageNum - 1, pageNum];
    }
    return [pageNum - 1, pageNum, pageNum + 1];
  }, [pageNum, totalPage]);

  return (
    <>
      <button
        className="pagination--button"
        onClick={handlePageNumChange(pageNum - 1)}
        disabled={pageNum === 1}
      >
        &lt; Previous page
      </button>
      {displayedPageNums.map((page) => (
        <button
          className="pageNum--button"
          disabled={page === pageNum}
          key={page}
          onClick={handlePageNumChange(page)}
        >
          {page}
        </button>
      ))}
      <button
        className="pagination--button"
        onClick={handlePageNumChange(pageNum + 1)}
        disabled={pageNum === totalPage}
      >
        Next page &gt;
      </button>
    </>
  );
};

export default Pagination;
