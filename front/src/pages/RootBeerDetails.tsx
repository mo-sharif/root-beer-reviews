import React, { Suspense, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useRootBeerDetails } from 'hooks/useRootBeerDetails';
import { useReviews } from 'hooks/useReviews';
import Pagination from 'components/Pagination';
import PicturesGrid from 'components/PicturesGrid';
import ReviewList from 'components/ReviewList';
import Modal from 'components/Modal';

const AddReview = React.lazy(() => import('components/AddReview'));
const ImageUploader = React.lazy(() => import('components/ImageUploader'));

const RootBeerDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [offset, setOffset] = useState<number>(0);
  const [length] = useState<number>(5);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Define states to control modals for image uploader and review form
  const [isImageModalOpen, setIsImageModalOpen] = useState<boolean>(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState<boolean>(false);

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
      <div className="bg-white shadow-md rounded-lg p-6 mt-8">

        <h1 className="text-3xl font-bold mb-4">{rootBeer.name}</h1>
        <p className="text-gray-600 mb-4">{rootBeer.description}</p>

        {/* Pictures Section */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold mb-4">Pictures</h2>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={() => setIsImageModalOpen(true)}
          >
            Add Picture
          </button>
        </div>
        <PicturesGrid pictures={rootBeer.Pictures} />

        {/* Reviews Section */}
        <div className="flex justify-between items-center mt-8">
          <h2 className="text-2xl font-bold mb-4">Reviews</h2>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={() => setIsReviewModalOpen(true)}
          >
            Add Review
          </button>
        </div>
        <ReviewList reviews={reviews} totalReviews={totalReviews} />

        {/* Conditionally show pagination only if there are reviews */}
        {totalReviews > length && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPrevious={handlePreviousPage}
            onNext={handleNextPage}
            isNextDisabled={currentPage >= totalPages}
            isPreviousDisabled={currentPage <= 1}
          />
        )}

        {/* Image Uploader Modal */}
        <Modal
          isOpen={isImageModalOpen}
          onClose={() => setIsImageModalOpen(false)}
          title="Upload Picture"
        >
          <Suspense fallback={<div>Loading Image Uploader...</div>}>
            <ImageUploader uploadUrl={`http://localhost:4000/api/drinks/${id}/pictures`} onImageUploaded={handleRefresh} />
          </Suspense>
        </Modal>

        {/* Add Review Modal */}
        <Modal
          isOpen={isReviewModalOpen}
          onClose={() => setIsReviewModalOpen(false)}
          title="Add Review"
        >
          <Suspense fallback={<div>Loading review form...</div>}>
            <AddReview rootBeerId={id!} onReviewAdded={handleRefresh} />
          </Suspense>
        </Modal>
      </div>
    </div>
  );
};

export default RootBeerDetails;