import React, { useEffect, useState, Suspense } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ImageUploader from '../components/ImageUploader';
import StarRating from '../components/StarRating'; // Import the StarRating component

const AddReview = React.lazy(() => import('../components/AddReview'));

interface PictureObject {
  id: number;
  name: string;
  mimetype: string;
  path: string;
  createdAt: string;
  updatedAt: string;
}

interface Review {
  id: number;
  user_name: string;
  description: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
}

interface RootBeer {
  id: number;
  name: string;
  description: string;
  Pictures: PictureObject[];
}

interface ReviewsResponse {
  items: Review[];
  total: number;
}

const RootBeerDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [rootBeer, setRootBeer] = useState<RootBeer | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [totalReviews, setTotalReviews] = useState<number>(0);
  const [offset, setOffset] = useState<number>(0);
  const [length] = useState<number>(5);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const fetchRootBeer = async () => {
      try {
        const response = await axios.get<RootBeer>(`http://localhost:4000/api/drinks/${id}`);
        setRootBeer(response.data);
      } catch (error) {
        console.error('Error fetching root beer:', error);
      }
    };

    const fetchReviews = async () => {
      try {
        const response = await axios.get<ReviewsResponse>(`http://localhost:4000/api/drinks/${id}/reviews`, {
          params: { offset, length }
        });
        setReviews(response.data.items);
        setTotalReviews(response.data.total);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchRootBeer();
    fetchReviews();
  }, [id, offset, length]);

  const handleRefresh = async () => {
    const response = await axios.get<RootBeer>(`http://localhost:4000/api/drinks/${id}`);
    setRootBeer(response.data);

    const reviewsResponse = await axios.get<ReviewsResponse>(`http://localhost:4000/api/drinks/${id}/reviews`, {
      params: { offset, length }
    });
    setReviews(reviewsResponse.data.items);
    setTotalReviews(reviewsResponse.data.total);
  };

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

  const getImageUrl = (path: string) => {
    return `http://localhost:4000/${path}`;
  };

  if (!rootBeer) {
    return <div>Loading root beer details...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{rootBeer.name}</h1>
      <p className="text-gray-600 mb-4">{rootBeer.description}</p>

      <div>
        <h2 className="text-2xl font-bold mb-4">Pictures</h2>
        <div className="flex flex-wrap space-x-4">
          {rootBeer.Pictures.length > 0 ? (
            rootBeer.Pictures.map((picture) => (
              <div key={picture.id} className="mb-4">
                <img
                  src={getImageUrl(picture.path)}
                  alt={picture.name}
                  className="w-24 h-24 object-cover rounded"
                />
                <p className="text-sm text-gray-500 mt-1">{picture.name}</p>
              </div>
            ))
          ) : (
            <p>No pictures available.</p>
          )}
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Reviews ({totalReviews})</h2>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.id} className="bg-gray-100 p-4 rounded-lg mb-4">
              <p className="font-semibold">{review.user_name}</p>
              <p className="text-gray-600">{review.description}</p>
              <StarRating rating={review.rating} />
              <p className="text-gray-400 text-sm">Posted on: {new Date(review.createdAt).toLocaleDateString()}</p>
            </div>
          ))
        ) : (
          <p>No reviews available.</p>
        )}

        <div className="flex justify-between mt-4">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:bg-gray-200"
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:bg-gray-200"
          >
            Next
          </button>
        </div>
      </div>

      <ImageUploader
        uploadUrl={`http://localhost:4000/api/drinks/${id}/pictures`}
        onImageUploaded={handleRefresh}
      />

      <Suspense fallback={<div>Loading review form...</div>}>
        <AddReview rootBeerId={id!} onReviewAdded={handleRefresh} />
      </Suspense>
    </div>
  );
};

export default RootBeerDetails;