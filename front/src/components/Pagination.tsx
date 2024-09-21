import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onNext: () => void;
  onPrevious: () => void;
  isNextDisabled: boolean;
  isPreviousDisabled: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onNext,
  onPrevious,
  isNextDisabled,
  isPreviousDisabled,
}) => {
  return (
    <div className="flex justify-between mt-6">
      <button
        onClick={onPrevious}
        disabled={isPreviousDisabled}
        className="bg-gray-300 text-gray-700 text-sm px-4 py-2 rounded disabled:bg-gray-200"
      >
        Previous
      </button>

      <div className="text-sm">
        Page {currentPage} of {totalPages}
      </div>

      <button
        onClick={onNext}
        disabled={isNextDisabled}
        className="bg-gray-300 text-gray-700 text-sm px-4 py-2 rounded disabled:bg-gray-200"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
