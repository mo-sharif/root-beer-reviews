import React, { useState, Suspense } from 'react';
import { useRootBeerFetch } from '../hooks/useRootBeerFetch';
import Toolbar from '../components/Toolbar';
import RootBeerCard from '../components/RootBeerCard';
import Pagination from '../components/Pagination';
import Loader from '../components/Loader';

const AddRootBeer = React.lazy(() => import('../components/AddRootBeer'));

const Dashboard: React.FC = () => {
  const [offset, setOffset] = useState<number>(0);
  const [sort, setSort] = useState<string>('createdAt');
  const [desc, setDesc] = useState<boolean>(true);
  const [minRating, setMinRating] = useState<number | null>(null);
  const [maxRating, setMaxRating] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const { rootBeers, total, loading } = useRootBeerFetch(offset, desc, minRating, maxRating, sort, searchTerm);
  const totalPages = Math.ceil(total / 10);

  const handleSearch = (query: string) => setSearchTerm(query);

  const handleNextPage = () => {
    if (offset + 10 < total) {
      setOffset(offset + 10);
      setSearchTerm(''); // Clear search term when paginating
    }
  };

  const handlePreviousPage = () => {
    if (offset > 0) {
      setOffset(offset - 10);
      setSearchTerm(''); // Clear search term when paginating
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Root Beer Dashboard</h1>

      {/* Add New Root Beer */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Add New Root Beer</h2>
        <Suspense fallback={<Loader />}>
          <AddRootBeer onRootBeerAdded={() => setOffset(0)} />
        </Suspense>
      </div>

      {/* Toolbar for Sort, Order, and Rating Filters */}
      <Toolbar
        sort={sort}
        desc={desc}
        minRating={minRating}
        maxRating={maxRating}
        searchTerm={searchTerm}
        onSortChange={setSort}
        onOrderChange={setDesc}
        onMinRatingSelect={setMinRating}
        onMaxRatingSelect={setMaxRating}
        onSearch={handleSearch}
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
          currentPage={Math.floor(offset / 10) + 1}
          totalPages={totalPages}
          onNext={handleNextPage}
          onPrevious={handlePreviousPage}
          isNextDisabled={offset + 10 >= total}
          isPreviousDisabled={offset === 0}
        />
      </div>
    </div>
  );
};

export default Dashboard;