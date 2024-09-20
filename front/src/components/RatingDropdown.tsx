import React, { useState } from 'react';
import StarRating from './StarRating';

interface RatingDropdownProps {
  label: string;
  selectedRating: number | null;
  onRatingSelect: (rating: number) => void;
}

const RatingDropdown: React.FC<RatingDropdownProps> = ({ label, selectedRating, onRatingSelect }) => {
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleRatingSelect = (rating: number) => {
    onRatingSelect(rating);
    setDropdownOpen(false); // Close the dropdown after selection
  };

  return (
    <div className="relative flex items-center">
      <div className="w-full">
        <button
          type="button"
          className="border p-2 rounded w-full bg-white flex justify-between items-center"
          onClick={toggleDropdown}
        >
          {selectedRating ? (
            <div className="flex items-center">
              <StarRating rating={selectedRating} /> {/* Show selected rating with stars */}
            </div>
          ) : (
            label
          )}
          <span>{dropdownOpen ? '▲' : '▼'}</span>
        </button>

        {/* Dropdown list of ratings */}
        {dropdownOpen && (
          <ul className="w-44 absolute bg-white border mt-1 rounded  z-10 overflow-hidden">
            {[1, 2, 3, 4, 5].map((value) => (
              <li
                key={value}
                className="p-2 hover:bg-gray-100 cursor-pointer flex items-center justify-between"
                onClick={() => handleRatingSelect(value)}
              >
                <StarRating rating={value} /> {/* Show stars */}
                <span className="text-xs">{value} Star{value > 1 ? 's' : ''}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default RatingDropdown;