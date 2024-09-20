import React, { useState, Suspense } from 'react';
import { useRootBeerFetch } from '../hooks/useRootBeerFetch';
import Toolbar from '../components/Toolbar';
import RootBeerCard from '../components/RootBeerCard';
import Pagination from '../components/Pagination';
import Loader from '../components/Loader';
import Modal from '../components/Modal'; // Import the reusable modal component

const AddRootBeer = React.lazy(() => import('../components/AddRootBeer'));

const Dashboard: React.FC = () => {
    const [offset, setOffset] = useState<number>(0);
    const [sort, setSort] = useState<string>('createdAt');
    const [desc, setDesc] = useState<boolean>(true);
    const [minRating, setMinRating] = useState<number | null>(null);
    const [maxRating, setMaxRating] = useState<number | null>(null);
    const [name, setName] = useState<string>('');               // New state for name filtering
    const [description, setDescription] = useState<string>(''); // New state for description filtering
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // Modal state

    const length = 10; // Define length for pagination

    const { rootBeers, total, loading, fetchRootBeers } = useRootBeerFetch(
      offset, 
      desc, 
      minRating, 
      maxRating, 
      sort, 
      name,              // Pass the name to the hook
      description,       // Pass the description to the hook
      length
    );
    const totalPages = Math.ceil(total / length);

    const handleSearch = (query: string) => {
      setName(query);          // Use query to filter by name
      setDescription(query);   // Use query to filter by description
    };

    const handleNextPage = () => {
        if (offset + length < total) {
            setOffset(offset + length);
            setName(''); // Clear search term when paginating
            setDescription('');
        }
    };

    const handlePreviousPage = () => {
        if (offset > 0) {
            setOffset(offset - length);
            setName(''); // Clear search term when paginating
            setDescription('');
        }
    };

    // Function to refetch the beers and close the modal after adding a new beer
    const handleRootBeerAdded = () => {
        fetchRootBeers(offset); // Refetch the data to show the newly added root beer
        setIsModalOpen(false); // Close the modal after submitting
    };

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Root Beer Dashboard</h1>
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    onClick={() => setIsModalOpen(true)}
                >
                    Add New
                </button>
            </div>

            {/* Toolbar for Sort, Order, and Rating Filters */}
            <Toolbar
                sort={sort}
                desc={desc}
                minRating={minRating}
                maxRating={maxRating}
                searchTerm={name}   // Use name for filtering in the Toolbar
                onSortChange={setSort}
                onOrderChange={setDesc}
                onMinRatingSelect={setMinRating}
                onMaxRatingSelect={setMaxRating}
                onSearch={handleSearch}  // Use handleSearch to filter by name and description
            />

            {/* List of Root Beers */}
            <div className="bg-white shadow-md rounded-lg p-6 mt-8">
                <h2 className="text-2xl font-bold mb-4">Root Beers List</h2>
                {loading ? (
                    <Loader />
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {rootBeers.map((drink) => (
                            <RootBeerCard
                                key={drink.id}
                                id={drink.id}
                                name={drink.name}
                                description={drink.description}
                                pictures={drink.Pictures}
                                reviewAverageRating={drink.reviewAverageRating}
                            />
                        ))}
                    </div>
                )}

                {/* Pagination Controls */}
                <Pagination
                    currentPage={Math.floor(offset / length) + 1}
                    totalPages={totalPages}
                    onNext={handleNextPage}
                    onPrevious={handlePreviousPage}
                    isNextDisabled={offset + length >= total}
                    isPreviousDisabled={offset === 0}
                />
            </div>

            {/* Add New Root Beer Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Add New Root Beer"
            >
                <Suspense fallback={<Loader />}>
                    <AddRootBeer onRootBeerAdded={handleRootBeerAdded} />
                </Suspense>
            </Modal>
        </div>
    );
};

export default Dashboard;