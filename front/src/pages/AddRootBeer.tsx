import React, { useState } from 'react';
import axios from 'axios';

interface AddRootBeerProps {
  onRootBeerAdded: () => void; // Callback to notify when a root beer is added
}

const AddRootBeer: React.FC<AddRootBeerProps> = ({ onRootBeerAdded }) => {
  // Form state for root beer details
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false); // To manage loading state

  // Validate form inputs
  const isFormValid = name.trim() !== '' && description.trim() !== '';

  // Handle form submission using axios
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid) return;

    const payload = {
      name,
      description,
    };

    try {
      setLoading(true);
      const response = await axios.post('http://localhost:4000/api/drinks', payload);

      if (response.status === 200) {
        alert('Root Beer added successfully!');
        setName(''); // Reset the form
        setDescription('');
        onRootBeerAdded(); // Trigger the callback to reload the list of root beers
      } else {
        console.error('Error adding root beer:', response.data);
      }
    } catch (error) {
      console.error('Error adding root beer:', error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded p-4">
      <h1 className="text-2xl mb-4">Add Root Beer</h1>

      {/* Input for root beer name */}
      <div>
        <label className="block mb-2">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded w-full"
          required
        />
      </div>

      {/* Textarea for root beer description */}
      <div>
        <label className="block mb-2">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 rounded w-full"
          required
        />
      </div>

      {/* Submit button */}
      <button
        type="submit"
        className={`mt-4 py-2 px-4 rounded ${isFormValid ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
        disabled={!isFormValid || loading} // Disabled if form is invalid or loading
      >
        {loading ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
};

export default AddRootBeer;