import React from "react";
import { Link } from "react-router-dom";
import StarRating from "components/StarRating";
import { getImageUrl } from "utils/formatUtils";

interface RootBeerCardProps {
  id: number;
  name: string;
  description: string;
  pictures: { path: string }[];
  reviewAverageRating?: number;
}

const RootBeerCard: React.FC<RootBeerCardProps> = ({
  id,
  name,
  description,
  pictures,
  reviewAverageRating,
}) => {
  return (
    <Link
      to={`/rootbeer/${id}`}
      className="bg-gray-100 p-4 rounded-lg hover:shadow-xl hover:bg-blue-50 transition duration-200 ease-in-out transform hover:scale-105 animate-fadeIn relative group"
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

        {/* Check if reviewAverageRating is undefined */}
        {reviewAverageRating === undefined ? (
          <p className="text-gray-500 mt-4">No ratings</p>
        ) : (
          <div className="mt-4">
            <StarRating rating={Math.round(reviewAverageRating)} />
            {/* Reveal this text when the card is hovered */}
            <p className="text-gray-600 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-in-out">
              Average Rating:{" "}
              {reviewAverageRating === null
                ? 0
                : reviewAverageRating?.toFixed(1)}{" "}
              / 5
            </p>
          </div>
        )}
      </div>
    </Link>
  );
};

export default RootBeerCard;
