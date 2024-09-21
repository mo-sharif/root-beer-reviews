import { PictureObject } from "interfaces";
import React from "react";
import { getImageUrl } from "utils/formatUtils"; // Utility function

interface PicturesGridProps {
  pictures: PictureObject[];
}

const PicturesGrid: React.FC<PicturesGridProps> = ({ pictures }) => (
  <div className="flex flex-wrap space-x-4">
    {pictures.length > 0 ? (
      pictures.map((picture) => (
        <div key={picture.id} className="mb-4">
          <img
            src={getImageUrl(picture.path)}
            alt={picture.name}
            className="w-24 h-24 object-cover rounded"
          />
        </div>
      ))
    ) : (
      <p>No pictures available.</p>
    )}
  </div>
);

export default PicturesGrid;
