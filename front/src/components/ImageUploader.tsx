import React, { useState } from "react";
import axios from "axios";
import { useAlert } from "context/AlertContext"; // Import the global Alert context

interface ImageUploaderProps {
  uploadUrl: string; // URL to upload the image
  onImageUploaded: () => void; // Callback after the image is uploaded
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  uploadUrl,
  onImageUploaded,
}) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Use the global alert context
  const { showAlert } = useAlert();

  // Handle image selection
  const handleImageSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  // Handle image upload
  const handleImageUpload = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedImage) return;

    const formData = new FormData();
    formData.append("file", selectedImage); // Append file with 'file' key

    try {
      setLoading(true);

      await axios.post(uploadUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      showAlert("Image uploaded successfully!", "success"); // Show success alert
      setSelectedImage(null); // Clear the selected image after successful upload
      onImageUploaded(); // Notify the parent component
    } catch (error) {
      showAlert("Failed to upload image.", "error"); // Show error alert
      console.error("Error uploading image:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleImageUpload} className="mt-6">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageSelection}
          className="border p-2 rounded w-full"
        />

        {selectedImage && (
          <div className="mt-4">
            <p className="font-semibold mb-2">Selected Image:</p>
            <p className="text-gray-600">
              {selectedImage.name} ({selectedImage.type})
            </p>
          </div>
        )}

        <button
          type="submit"
          className={`mt-4 py-2 px-4 rounded ${
            selectedImage
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          disabled={!selectedImage || loading}
        >
          {loading ? "Uploading..." : "Upload Image"}
        </button>
      </form>
    </div>
  );
};

export default ImageUploader;
