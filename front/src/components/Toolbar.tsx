import React from "react";
import RatingDropdown from "components/RatingDropdown";
import SearchRootBeer from "./SearchRootBeer";

interface ToolbarProps {
  sort: string;
  desc: boolean;
  minRating: number | null;
  maxRating: number | null;
  searchTerm: string;
  onSortChange: (value: string) => void;
  onOrderChange: (value: boolean) => void;
  onMinRatingSelect: (rating: number) => void;
  onMaxRatingSelect: (rating: number) => void;
  onSearch: (query: string) => void;
}

const Toolbar: React.FC<ToolbarProps> = ({
  sort,
  desc,
  minRating,
  maxRating,
  searchTerm,
  onSortChange,
  onOrderChange,
  onMinRatingSelect,
  onMaxRatingSelect,
  onSearch,
}) => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg mt-8 flex flex-wrap justify-between items-center gap-2">
      {/* Search bar using SearchRootBeer */}
      <div className="flex items-center w-full lg:w-auto text-sm">
        <label className="mr-4">Search:</label>
        <SearchRootBeer searchTerm={searchTerm} onSearch={onSearch} />
      </div>

      {/* Sort by */}
      <div className="flex items-center text-sm">
        <label className="mr-4">Sort by:</label>
        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value)}
          className="border rounded p-2 w-full lg:w-auto"
        >
          <option value="createdAt">Created Date</option>
          <option value="name">Name</option>
        </select>
      </div>

      {/* Order */}
      <div className="flex items-center text-sm">
        <label className="mr-4">Order:</label>
        <select
          value={desc ? "desc" : "asc"}
          onChange={(e) => onOrderChange(e.target.value === "desc")}
          className="border rounded p-2 w-full lg:w-auto"
        >
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </div>

      {/* Rating Filters */}
      <div className="flex items-center text-sm">
        <div>
          <RatingDropdown
            label="Min Rating"
            selectedRating={minRating}
            onRatingSelect={onMinRatingSelect}
          />
        </div>
        <div className="ml-2">
          <RatingDropdown
            label="Max Rating"
            selectedRating={maxRating}
            onRatingSelect={onMaxRatingSelect}
          />
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
