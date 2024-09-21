import React from "react";
import StarRating from "components/StarRating"; // Import StarRating component
import { Review } from "interfaces";

interface ReviewListProps {
  reviews: Review[];
}

const ReviewList: React.FC<ReviewListProps> = ({ reviews }) => (
  <div className="mt-8">
    {reviews.length > 0 ? (
      reviews.map((review) => (
        <div key={review.id} className="bg-gray-100 p-4 rounded-lg mb-4">
          <p className="font-semibold">{review.user_name}</p>
          <p className="text-gray-600">{review.description}</p>
          <StarRating rating={review.rating} />
          <p className="text-gray-400 text-sm">
            Posted on: {new Date(review.createdAt).toLocaleDateString()}
          </p>
        </div>
      ))
    ) : (
      <p>No reviews available.</p>
    )}
  </div>
);

export default ReviewList;
