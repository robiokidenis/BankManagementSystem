import React from "react";

interface Props {
  totalCount: number;
  pageLimit: number;
  page: number;
  handlePrevPage: () => void;
  handleNextPage: () => void;
}

const Pagination: React.FC<Props> = ({
  totalCount,
  pageLimit,
  page,
  handlePrevPage,
  handleNextPage,
}) => {
  const prevPage = page > 1;
  const nextPage = page * pageLimit < totalCount;

  const totalPages = Math.ceil(totalCount / pageLimit);

  const renderPagination = () => {
    const items = Array.from({ length: totalPages }, (_, index) => {
      const number = index + 1;
      return (
        <button
          key={number}
          disabled={!number}
          onClick={(e) => {
            // handlePageChange(number);
            e.preventDefault();
          }}
          className={`inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white ${
            number === page ? " bg-gray-100" : ""
          }`}
        >
          {number}
        </button>
      );
    });
    return <div>{items}</div>;
  };

  return (
    <div className="sticky bottom-0 z-10 right-0 items-center w-full p-4 bg-white border-t border-gray-200 sm:flex sm:justify-between dark:bg-gray-800 dark:border-gray-700">
      <div className="flex items-center mb-4 sm:mb-0">
        <button
          disabled={!prevPage}
          onClick={(e) => {
            handlePrevPage();
            e.preventDefault();
          }}
          className="inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          <svg
            className={`w-7 h-7 ${
              !prevPage ? "opacity-50 cursor-not-allowed" : ""
            } `}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        {/* {renderPagination()} */}
        <button
          onClick={(e) => {
            handleNextPage();
            e.preventDefault();
          }}
          disabled={!nextPage}
          className="inline-flex justify-center p-1 mr-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          <svg
            className={`w-7 h-7 ${
              !nextPage ? "opacity-50 cursor-not-allowed" : ""
            } `}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
          <span className="font-semibold p-1 text-gray-900 dark:text-white">
            Showing{" "}
            {totalCount == 0
              ? 0
              : `${(page - 1) * pageLimit + 1} - ${
                  page * pageLimit > totalCount ? totalCount : page * pageLimit
                }`}
          </span>
          of
          <span className="font-semibold p-1 text-gray-900 dark:text-white">
            {totalCount}
          </span>
        </span>
      </div>
      <div className="flex items-center space-x-3">
        <button
          disabled={!prevPage}
          onClick={(e) => {
            handlePrevPage();
            e.preventDefault();
          }}
          className={`inline-flex items-center justify-center flex-1 px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 ${
            !prevPage ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <svg
            className="w-5 h-5 mr-1 -ml-1"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          Previous
        </button>
        <button
          onClick={(e) => {
            handleNextPage();
            e.preventDefault();
          }}
          disabled={!nextPage}
          className={`inline-flex items-center justify-center flex-1 px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 ${
            !nextPage ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Next
          <svg
            className="w-5 h-5 ml-1 -mr-1"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Pagination;
