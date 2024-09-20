import React, { useState } from 'react';
import axios from 'axios';
import StarRating from './StarRating'; // Import the reusable StarRating component
import Alert from './Alert'; // Import the new Alert component

interface AddReviewProps {
  rootBeerId: string; // Root beer ID to associate the review with
  onReviewAdded: () => void; // Callback after review submission
}

const AddReview: React.FC<AddReviewProps> = ({ rootBeerId, onReviewAdded }) => {
  const [userName, setUserName] = useState<string>('');
  const [reviewText, setReviewText] = useState<string>('');
  const [rating, setRating] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false); // Manage custom dropdown state
  const [alertMessage, setAlertMessage] = useState<string>(''); // Alert message
  const [showAlert, setShowAlert] = useState<boolean>(false); // Alert visibility state
  const [alertType, setAlertType] = useState<'success' | 'error'>('success'); // Alert type

  // Validate form inputs
  const isFormValid = userName.trim() !== '' && reviewText.trim() !== '' && rating >= 1 && rating <= 5;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid) {
      setError('Please fill in all fields and provide a rating between 1 and 5.');
      setAlertMessage('Please fill in all fields and provide a valid rating.');
      setAlertType('error');
      setShowAlert(true);
      return;
    }

    setLoading(true);
    setError(null);

    const payload = {
      user_name: userName,
      description: reviewText,
      rating,
    };

    try {
      await axios.post(`http://localhost:4000/api/drinks/${rootBeerId}/reviews`, payload);
      setAlertMessage('Review added successfully!');
      setAlertType('success');
      setShowAlert(true);

      // Reset form fields
      setUserName('');
      setReviewText('');
      setRating(0);
      onReviewAdded(); // Notify the parent component to refresh the reviews
    } catch (error) {
      console.error('Error adding review:', error);
      setAlertMessage('Failed to submit the review. Please try again.');
      setAlertType('error');
      setShowAlert(true);
    } finally {
      setLoading(false);
    }
  };

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleRatingSelect = (selectedRating: number) => {
    setRating(selectedRating);
    setDropdownOpen(false); // Close the dropdown after selection
  };

  return (
    <div>
      {/* Form for adding review */}
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded p-4 mt-8">
        <h2 className="text-2xl mb-4">Add a Review</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        {/* Input for user name */}
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

        {/* Textarea for review */}
        <div className="mb-4">
          <label className="block mb-2">Review</label>
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            className="border p-2 rounded w-full"
            required
          />
        </div>

        {/* Custom dropdown for rating */}
        <div className="mb-4 relative">
          <label className="block mb-2">Rating</label>
          <button
            type="button"
            className="border p-2 rounded w-full bg-white flex justify-between items-center"
            onClick={toggleDropdown}
          >
            {rating ? (
              <div className="flex items-center">
                <StarRating rating={rating} /> {/* Show selected rating with stars */}
              </div>
            ) : (
              'Select Rating'
            )}
            <span>{dropdownOpen ? '▲' : '▼'}</span>
          </button>

          {/* Dropdown list of ratings */}
          {dropdownOpen && (
            <ul className="absolute bg-white border mt-1 rounded w-full z-10">
              {[1, 2, 3, 4, 5].map((value) => (
                <li
                  key={value}
                  className="p-2 hover:bg-gray-100 cursor-pointer flex items-center justify-between"
                  onClick={() => handleRatingSelect(value)}
                >
                  <StarRating rating={value} /> {/* Show stars */}
                  <span>{value} Star{value > 1 ? 's' : ''}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className={`py-2 px-4 rounded ${isFormValid ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
          disabled={!isFormValid || loading}
        >
          {loading ? 'Submitting...' : 'Submit Review'}
        </button>
      </form>

      {/* Reusable Alert Component */}
      <Alert message={alertMessage} show={showAlert} type={alertType} onClose={() => setShowAlert(false)} />
    </div>
  );
};

export default AddReview;