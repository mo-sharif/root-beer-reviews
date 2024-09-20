import React from 'react';
import RatingDropdown from './RatingDropdown';

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
    onSearch
}) => {
    const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onSearch(event.target.value);
    };

    return (
        <div className="mt-8 flex flex-wrap justify-between items-center gap-4">
            {/* Search bar */}
            <div className="flex items-center w-full lg:w-auto">
                <label className="mr-4">Search:</label>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchInputChange}
                    placeholder="Search root beers..."
                    className="border rounded p-2 w-full lg:w-auto"
                />
            </div>

            {/* Sort by */}
            <div className="flex items-center">
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
            <div className="flex items-center">
                <label className="mr-4">Order:</label>
                <select
                    value={desc ? 'desc' : 'asc'}
                    onChange={(e) => onOrderChange(e.target.value === 'desc')}
                    className="border rounded p-2 w-full lg:w-auto"
                >
                    <option value="desc">Descending</option>
                    <option value="asc">Ascending</option>
                </select>
            </div>

            {/* Rating Filters */}
            <div className="flex items-center">
                <div>
                    <RatingDropdown label="Min Rating" selectedRating={minRating} onRatingSelect={onMinRatingSelect} />
                </div>
                <div className="ml-2">
                    <RatingDropdown label="Max Rating" selectedRating={maxRating} onRatingSelect={onMaxRatingSelect} />
                </div>
            </div>
        </div>
    );
};

export default Toolbar;