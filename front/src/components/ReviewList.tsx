import React from 'react';
import StarRating from './StarRating'; // Import StarRating component

interface Review {
  id: number;
  user_name: string;
  description: string;
  rating: number;
  createdAt: string;
}

interface ReviewListProps {
  reviews: Review[];
  totalReviews: number;
}

const ReviewList: React.FC<ReviewListProps> = ({ reviews, totalReviews }) => (
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
  </div>
);

export default ReviewList;