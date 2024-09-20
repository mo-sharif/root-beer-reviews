import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ImageUploader from '../components/ImageUploader'; // Import the shared ImageUploader

interface PictureObject {
  id: number;
  name: string;
  mimetype: string;
  path: string;
  createdAt: string;
  updatedAt: string;
}

interface RootBeer {
  id: number;
  name: string;
  description: string;
  Pictures: PictureObject[];
}

const RootBeerDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get root beer ID from route parameters
  const [rootBeer, setRootBeer] = useState<RootBeer | null>(null);

  // Fetch root beer details when component mounts
  useEffect(() => {
    const fetchRootBeer = async () => {
      try {
        const response = await axios.get<RootBeer>(`http://localhost:4000/api/drinks/${id}`);
        setRootBeer(response.data);
      } catch (error) {
        console.error('Error fetching root beer:', error);
      }
    };
    fetchRootBeer();
  }, [id]);

  const handleImageUploaded = async () => {
    // Re-fetch the root beer data to reflect the newly uploaded images
    const response = await axios.get<RootBeer>(`http://localhost:4000/api/drinks/${id}`);
    setRootBeer(response.data);
  };

  // Construct the image URL using the backend path
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

      {/* Display existing pictures */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Pictures</h2>
        <div className="flex flex-wrap space-x-4">
          {rootBeer.Pictures.length > 0 ? (
            rootBeer.Pictures.map((picture) => (
              <div key={picture.id} className="mb-4">
                <img
                  src={getImageUrl(picture.path)} // Use the constructed URL to fetch the image
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

      {/* Use the shared ImageUploader */}
      <ImageUploader
        uploadUrl={`http://localhost:4000/api/drinks/${id}/pictures`}
        onImageUploaded={handleImageUploaded}
      />
    </div>
  );
};

export default RootBeerDetails;