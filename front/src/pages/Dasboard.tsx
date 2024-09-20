import React, { useEffect, useState, Suspense, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import StarRating from '../components/StarRating'; // Import the StarRating component

// Lazy load the SearchRootBeer component
const SearchRootBeer = React.lazy(() => import('../components/SearchRootBeer'));
const AddRootBeer = React.lazy(() => import('../components/AddRootBeer'));

interface Picture {
  id: number;
  name: string;
  mimetype: string;
  path: string;
  createdAt: string;
  updatedAt: string;
}

interface RootBeer {
  id: number;
  name: string;
  description: string;
  Pictures: Picture[];
  reviewAverageRating: number;
}

interface PaginatedResponse {
  items: RootBeer[];
  total: number;
}

const Dashboard: React.FC = () => {
  const [rootBeers, setRootBeers] = useState<RootBeer[]>([]);
  const [filteredRootBeers, setFilteredRootBeers] = useState<RootBeer[]>([]);
  const [offset, setOffset] = useState<number>(0);
  const [length] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sort, setSort] = useState<string>('createdAt'); // Default sort by createdAt
  const [desc, setDesc] = useState<boolean>(true); // Default descending order

  const BASE_URL = 'http://localhost:4000';

  const fetchRootBeers = useCallback(async (currentOffset: number, sort: string, desc: boolean) => {
    try {
      const response = await axios.get<PaginatedResponse>(`${BASE_URL}/api/drinks`, {
        params: { offset: currentOffset, length, sort, desc },
      });
      setRootBeers(response.data.items);
      setFilteredRootBeers(response.data.items);
      setTotal(response.data.total);
    } catch (error) {
      console.error('Error fetching root beers:', error);
    }
  }, [length]);

  useEffect(() => {
    fetchRootBeers(offset, sort, desc);
  }, [fetchRootBeers, offset, sort, desc]);

  useEffect(() => {
    const pages = Math.ceil(total / length);
    setTotalPages(pages);
  }, [total, length]);

  const handleSearch = (query: string) => {
    setSearchTerm(query);
    if (query === '') {
      fetchRootBeers(offset, sort, desc);
    } else {
      fetchAllRootBeers(query);
    }
  };

  const fetchAllRootBeers = async (query: string) => {
    try {
      const response = await axios.get<PaginatedResponse>(`${BASE_URL}/api/drinks`, {
        params: { offset: 0, length: total, name: query, sort, desc },
      });
      setFilteredRootBeers(response.data.items);
    } catch (error) {
      console.error('Error searching root beers:', error);
    }
  };

  const handleNextPage = () => {
    if (offset + length < total) {
      setOffset(offset + length);
      setSearchTerm('');
    }
  };

  const handlePreviousPage = () => {
    if (offset > 0) {
      setOffset(offset - length);
      setSearchTerm('');
    }
  };

  const getImageUrl = (path: string) => {
    return `${BASE_URL}/${path}`;
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(event.target.value);
  };

  const handleOrderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDesc(event.target.value === 'desc');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Root Beer Dashboard</h1>

      {/* Add New Root Beer and Search Root Beers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Add New Root Beer</h2>
          <Suspense fallback={<div>Loading Add Root Beer Form...</div>}>
            <AddRootBeer onRootBeerAdded={() => fetchRootBeers(offset, sort, desc)} />
          </Suspense>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Search Root Beers</h2>
          <Suspense fallback={<div>Loading Search...</div>}>
            <SearchRootBeer onSearch={handleSearch} searchTerm={searchTerm} />
          </Suspense>
        </div>
      </div>

      {/* Sort and Desc Filters */}
      <div className="mt-8 flex justify-between">
        <div>
          <label className="mr-4">Sort by:</label>
          <select value={sort} onChange={handleSortChange} className="border rounded p-2">
            <option value="createdAt">Date Created</option>
            <option value="name">Name</option>
          </select>
        </div>
        <div>
          <label className="mr-4">Order:</label>
          <select value={desc ? 'desc' : 'asc'} onChange={handleOrderChange} className="border rounded p-2">
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </div>
      </div>

      {/* List of Root Beers */}
      <div className="bg-white shadow-md rounded-lg p-6 mt-8">
        <h2 className="text-2xl font-bold mb-4">Root Beers List</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredRootBeers.map(drink => (
            <Link
              to={`/rootbeer/${drink.id}`}
              key={drink.id}
              className="bg-gray-100 p-4 rounded-lg hover:shadow-xl hover:bg-blue-50 transition duration-200 ease-in-out transform hover:scale-105"
            >
              {drink.Pictures.length > 0 && (
                <img
                  src={getImageUrl(drink.Pictures[0].path)}
                  alt={drink.Pictures[0].name}
                  className="w-full h-40 object-cover rounded"
                />
              )}

              <div className="mt-4">
                <p className="text-xl font-semibold text-blue-600">{drink.name}</p>
                <p className="text-gray-600 mt-2">{drink.description}</p>

                <div className="mt-4">
                  <StarRating rating={Math.round(drink.reviewAverageRating)} />
                  <p className="text-gray-600 text-sm">Average Rating: {drink.reviewAverageRating?.toFixed(1)} / 5</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-between mt-6">
          <button
            onClick={handlePreviousPage}
            disabled={offset === 0}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded disabled:bg-gray-200"
          >
            Previous
          </button>

          <div>
            Page {Math.floor(offset / length) + 1} of {totalPages}
          </div>

          <button
            onClick={handleNextPage}
            disabled={offset + length >= total}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded disabled:bg-gray-200"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;