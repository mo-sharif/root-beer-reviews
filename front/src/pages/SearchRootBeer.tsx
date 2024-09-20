import React, { useState, useEffect } from 'react';

interface SearchRootBeerProps {
  onSearch: (query: string) => void; // Callback to pass search input back to Dashboard
  searchTerm: string; // Prop to track and reset the search term
}

const SearchRootBeer: React.FC<SearchRootBeerProps> = ({ onSearch, searchTerm }) => {
  const [localSearchTerm, setLocalSearchTerm] = useState<string>(searchTerm);

  // Update local search term whenever searchTerm prop changes
  useEffect(() => {
    setLocalSearchTerm(searchTerm);
  }, [searchTerm]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setLocalSearchTerm(query);
    onSearch(query); // Pass the query back to the parent (Dashboard)
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search root beers..."
        value={localSearchTerm}
        onChange={handleSearchChange}
        className="border p-2 rounded w-full"
      />
    </div>
  );
};

export default SearchRootBeer;