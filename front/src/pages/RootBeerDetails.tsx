import React, { Suspense, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useRootBeerDetails } from '../hooks/useRootBeerDetails';
import { useReviews } from '../hooks/useReviews';
import ImageUploader from '../components/ImageUploader';
import Pagination from '../components/Pagination';
import PicturesGrid from '../components/PicturesGrid';
import ReviewList from '../components/ReviewList';

const AddReview = React.lazy(() => import('../components/AddReview'));

const RootBeerDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [offset, setOffset] = useState<number>(0);
  const [length] = useState<number>(5);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Define a state to refresh the component
  const [refreshFlag, setRefreshFlag] = useState<boolean>(false);

  // Use custom hooks to fetch root beer details and reviews
  const rootBeer = useRootBeerDetails(id!, refreshFlag);
  const { reviews, totalReviews } = useReviews(id!, offset, length, refreshFlag);

  const totalPages = Math.ceil(totalReviews / length);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setOffset((prevOffset) => prevOffset + length);
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setOffset((prevOffset) => prevOffset - length);
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleRefresh = () => {
    setRefreshFlag((prevFlag) => !prevFlag); // Toggle the flag to refresh data
  };

  if (!rootBeer) {
    return <div>Loading root beer details...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      {/* Pagination-style header with a "Home" link */}
      <div className="text-gray-600 mb-4">
        <Link to="/" className="text-blue-600 hover:underline">Home</Link> 
        <span className="mx-2">/</span>
        <span>{rootBeer.name}</span>
      </div>

      <h1 className="text-3xl font-bold mb-4">{rootBeer.name}</h1>
      <p className="text-gray-600 mb-4">{rootBeer.description}</p>

      {/* Pictures */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Pictures</h2>
        <PicturesGrid pictures={rootBeer.Pictures} />
      </div>

      {/* Reviews */}
      <ReviewList reviews={reviews} totalReviews={totalReviews} />

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPrevious={handlePreviousPage}
        onNext={handleNextPage}
        isNextDisabled={currentPage >= totalPages}
        isPreviousDisabled={currentPage <= 1}
      />

      {/* Image Uploader */}
      <ImageUploader uploadUrl={`http://localhost:4000/api/drinks/${id}/pictures`} onImageUploaded={handleRefresh} />

      {/* Add Review */}
      <Suspense fallback={<div>Loading review form...</div>}>
        <AddReview rootBeerId={id!} onReviewAdded={handleRefresh} />
      </Suspense>
    </div>
  );
};

export default RootBeerDetails;