import React from 'react';
import { Link } from 'react-router-dom';
import StarRating from './StarRating';
import { getImageUrl } from '../utils/formatUtils';

interface RootBeerCardProps {
  id: number;
  name: string;
  description: string;
  pictures: { path: string }[];
  reviewAverageRating?: number;
}

const RootBeerCard: React.FC<RootBeerCardProps> = ({
  id, name, description, pictures, reviewAverageRating,
}) => {
  return (
    <Link
      to={`/rootbeer/${id}`}
      className="bg-gray-100 p-4 rounded-lg hover:shadow-xl hover:bg-blue-50 transition duration-200 ease-in-out transform hover:scale-105 animate-fadeIn"
    >
      {pictures.length > 0 && (
        <img
          src={getImageUrl(pictures[0].path)}
          alt={name}
          className="w-full h-40 object-cover rounded"
        />
      )}
      <div className="mt-4">
        <p className="text-xl font-semibold text-blue-600">{name}</p>
        <p className="text-gray-600 mt-2">{description}</p>

        {reviewAverageRating !== undefined && (
          <div className="mt-4">
            <StarRating rating={Math.round(reviewAverageRating)} />
            <p className="text-gray-600 text-sm">
              Average Rating: {reviewAverageRating?.toFixed(1)} / 5
            </p>
          </div>
        )}
      </div>
    </Link>
  );
};

export default RootBeerCard;