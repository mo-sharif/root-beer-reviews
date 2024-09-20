import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

// Define the type for the review form data
interface ReviewForm {
  user_name: string;
  description: string;
  rating: number;
}

// Define props for the component
interface AddReviewProps {}

// Add Review component for submitting a review for a specific root beer
const AddReview: React.FC<AddReviewProps> = () => {
  const { id } = useParams<{ id: string }>(); // Get root beer ID from route params
  const [form, setForm] = useState<ReviewForm>({
    user_name: '',
    description: '',
    rating: 0,
  });

  // Handle form change for input fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:4000/api/drinks/${id}/reviews`, form);
      alert('Review added successfully!');
    } catch (error) {
      console.error('Error adding review:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded p-4">
      <h1 className="text-2xl mb-4">Add Review</h1>

      {/* Input for user name */}
      <div>
        <label className="block mb-2">Name</label>
        <input
          type="text"
          name="user_name"
          value={form.user_name}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        />
      </div>

      {/* Textarea for review description */}
      <div>
        <label className="block mb-2">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        />
      </div>

      {/* Input for rating */}
      <div>
        <label className="block mb-2">Rating (1-5)</label>
        <input
          type="number"
          name="rating"
          value={form.rating}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          min="1"
          max="5"
          required
        />
      </div>

      {/* Submit button */}
      <button type="submit" className="bg-blue-500 text-white mt-4 py-2 px-4 rounded">
        Submit
      </button>
    </form>
  );
};

export default AddReview;