import React, { useState, useEffect } from "react";

interface SearchRootBeerProps {
  onSearch: (query: string) => void; // Callback to pass search input back to Dashboard
  searchTerm: string; // Prop to track and reset the search term
}

const SearchRootBeer: React.FC<SearchRootBeerProps> = ({
  onSearch,
  searchTerm,
}) => {
  const [localSearchTerm, setLocalSearchTerm] = useState<string>(searchTerm);

  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(localSearchTerm);
    }, 300);

    // Cleanup the timeout if the user keeps typing
    return () => {
      clearTimeout(handler);
    };
  }, [localSearchTerm, onSearch]);

  // Sync with searchTerm prop from parent when it changes
  useEffect(() => {
    setLocalSearchTerm(searchTerm);
  }, [searchTerm]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearchTerm(e.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Search root beers..."
      value={localSearchTerm}
      onChange={handleSearchChange}
      className="border p-2 rounded w-full"
    />
  );
};

export default SearchRootBeer;
