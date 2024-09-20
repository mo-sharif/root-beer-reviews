import React, { Suspense, useState } from 'react';
import { useParams } from 'react-router-dom';
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

  const rootBeer = useRootBeerDetails(id!);
  const { reviews, totalReviews } = useReviews(id!, offset, length);

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

  const handleRefresh = async () => {
    // Logic to refresh the root beer and reviews
  };

  if (!rootBeer) {
    return <div>Loading root beer details...</div>;
  }

  return (
    <div className="container mx-auto p-4">
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
        onNext={handleNextPage} isNextDisabled={false} isPreviousDisabled={false}      />

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