import React, { useState } from "react";
import axios from "axios";
import RatingDropdown from "./RatingDropdown"; // Import the reusable RatingDropdown component
import { useAlert } from "context/AlertContext"; // Import the global alert context

interface AddReviewProps {
  rootBeerId: string;
  onReviewAdded: () => void;
}

const AddReview: React.FC<AddReviewProps> = ({ rootBeerId, onReviewAdded }) => {
  const [userName, setUserName] = useState<string>("");
  const [reviewText, setReviewText] = useState<string>("");
  const [rating, setRating] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Use the global alert context
  const { showAlert } = useAlert();

  // Form validation
  const isFormValid =
    userName.trim() !== "" && reviewText.trim() !== "" && rating !== null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid) {
      showAlert(
        "Please fill in all fields and provide a valid rating.",
        "error",
      );
      return;
    }

    setLoading(true);

    const payload = {
      user_name: userName,
      description: reviewText,
      rating,
    };

    try {
      await axios.post(
        `http://localhost:4000/api/drinks/${rootBeerId}/reviews`,
        payload,
      );
      showAlert("Review added successfully!", "success");

      // Reset form fields
      setUserName("");
      setReviewText("");
      setRating(null);
      onReviewAdded(); // Notify parent component
    } catch (error) {
      showAlert("Failed to submit the review. Please try again.", "error");
      console.error("Error adding review:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="mt-8">
        <div className="mb-4">
          <label className="block mb-2">Your Name</label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="border p-2 rounded w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Review</label>
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            className="border p-2 rounded w-full"
            required
          />
        </div>

        {/* Use the RatingDropdown component */}
        <div className="mb-4">
          <RatingDropdown
            label="Rating"
            selectedRating={rating}
            onRatingSelect={setRating}
          />
        </div>

        <button
          type="submit"
          className={`py-2 px-4 rounded shadow-md ${isFormValid ? "bg-blue-500 text-white hover:scale-105 transition-all" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
          disabled={!isFormValid || loading}
        >
          {loading ? "Submitting..." : "Submit Review"}
        </button>
      </form>
    </div>
  );
};

export default AddReview;
