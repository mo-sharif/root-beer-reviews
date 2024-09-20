import React, { useEffect, useState, Suspense, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// Lazy load the SearchRootBeer component
const SearchRootBeer = React.lazy(() => import('./SearchRootBeer'));
const AddRootBeer = React.lazy(() => import('./AddRootBeer'));

// Define the type for the picture
interface Picture {
    id: number;
    name: string;
    mimetype: string;
    path: string;
    createdAt: string;
    updatedAt: string;
}

// Define the type for the root beer
interface RootBeer {
    id: number;
    name: string;
    description: string;
    Pictures: Picture[];
}

// Define the paginated response type
interface PaginatedResponse {
    items: RootBeer[];
    total: number; // Total number of root beers in the API
}

const Dashboard: React.FC = () => {
    // State for root beers and pagination
    const [rootBeers, setRootBeers] = useState<RootBeer[]>([]);
    const [filteredRootBeers, setFilteredRootBeers] = useState<RootBeer[]>([]);
    const [offset, setOffset] = useState<number>(0); // Current offset (start from 0)
    const [length] = useState<number>(10); // Number of drinks per page
    const [total, setTotal] = useState<number>(0); // Total number of drinks
    const [totalPages, setTotalPages] = useState<number>(1); // Total number of pages
    const [searchTerm, setSearchTerm] = useState<string>(''); // Track search term

    const BASE_URL = 'http://localhost:4000'; // Base URL of the server

    // Fetch root beers with pagination using axios
    const fetchRootBeers = useCallback(async (currentOffset: number) => {
        try {
            const response = await axios.get<PaginatedResponse>(`${BASE_URL}/api/drinks`, {
                params: { offset: currentOffset, length },
            });
            setRootBeers(response.data.items);
            setFilteredRootBeers(response.data.items); // Initialize filtered beers to show all
            setTotal(response.data.total); // Set the total number of drinks
        } catch (error) {
            console.error('Error fetching root beers:', error);
        }
    }, [length])

    // Fetch all root beers from the API
    const fetchAllRootBeers = async (query: string) => {
        try {
            const response = await axios.get<PaginatedResponse>(`${BASE_URL}/api/drinks`, {
                params: { offset: 0, length: total, name: query }, // Fetch all root beers (for search)
            });
            setFilteredRootBeers(response.data.items);
        } catch (error) {
            console.error('Error searching root beers:', error);
        }
    };

    // Fetch data when the component mounts and when the offset changes
    useEffect(() => {
        fetchRootBeers(offset);
    }, [fetchRootBeers, offset]);

    // Update totalPages whenever total or length changes
    useEffect(() => {
        const pages = Math.ceil(total / length);
        setTotalPages(pages);
    }, [total, length]);

    // Handle search query across all pages
    const handleSearch = (query: string) => {
        setSearchTerm(query); // Store the search term in state
        if (query === '') {
            fetchRootBeers(offset); // Reset to paginated list if query is empty
        } else {
            fetchAllRootBeers(query); // Fetch and filter the whole dataset
        }
    };

    // Function to reload root beers after adding a new one
    const handleRootBeerAdded = () => {
        fetchRootBeers(offset); // Reload the list of root beers after adding a new one
    };

    // Handle going to the next page and clear search term
    const handleNextPage = () => {
        if (offset + length < total) {
            setOffset(offset + length);
            setSearchTerm(''); // Clear search term when paginating
        }
    };

    // Handle going to the previous page and clear search term
    const handlePreviousPage = () => {
        if (offset > 0) {
            setOffset(offset - length);
            setSearchTerm(''); // Clear search term when paginating
        }
    };

    // Construct the image URL using the backend path
    const getImageUrl = (path: string) => {
        return `${BASE_URL}/${path}`;
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-8">Root Beer Dashboard</h1>

            {/* Search and Add Root Beer Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Add Root Beer Card */}
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-2xl font-bold mb-4">Add New Root Beer</h2>
                    <Suspense fallback={<div>Loading Add Root Beer Form...</div>}>
                        <AddRootBeer onRootBeerAdded={handleRootBeerAdded} />
                    </Suspense>
                </div>

                {/* Search Root Beer Card */}
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-2xl font-bold mb-4">Search Root Beers</h2>
                    <Suspense fallback={<div>Loading Search...</div>}>
                        <SearchRootBeer onSearch={handleSearch} searchTerm={searchTerm} />
                    </Suspense>
                </div>
            </div>

            {/* List of Root Beers Card */}
            <div className="bg-white shadow-md rounded-lg p-6 mt-8">
                <h2 className="text-2xl font-bold mb-4">Root Beers List</h2>
                <ul className="flex flex-col space-y-4">
                    {filteredRootBeers.map(drink => (
                        <li key={drink.id} className="bg-gray-100 p-4 rounded-lg flex items-center space-x-4">
                            <div className="flex-1">
                                <Link to={`/rootbeer/${drink.id}`} className="text-xl font-semibold text-blue-600 hover:underline">
                                    {drink.name}
                                </Link>
                                <p className="text-gray-600">{drink.description}</p>

                                {/* Display the first picture of the root beer if it exists */}
                                {drink.Pictures.length > 0 && (
                                    <img
                                        src={getImageUrl(drink.Pictures[0].path)}
                                        alt={drink.Pictures[0].name}
                                        className="w-24 h-24 object-cover rounded mt-4"
                                    />
                                )}
                            </div>
                        </li>
                    ))}
                </ul>

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