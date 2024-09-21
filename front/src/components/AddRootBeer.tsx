import React, { useState } from "react";
import axios from "axios";
import Alert from "components/Alert"; // Import the Alert component

interface AddRootBeerProps {
  onRootBeerAdded: () => void; // Callback to notify when a root beer is added
}

const AddRootBeer: React.FC<AddRootBeerProps> = ({ onRootBeerAdded }) => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState<boolean>(false);
  const [showErrorAlert, setShowErrorAlert] = useState<boolean>(false);

  // Validate form inputs
  const isFormValid = name.trim() !== "" && description.trim() !== "";

  // Handle form submission using axios
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid) return;

    const payload = { name, description };

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:4000/api/drinks",
        payload,
      );

      if (response.status === 200) {
        setShowSuccessAlert(true); // Show success alert
        setName(""); // Reset the form
        setDescription("");
        onRootBeerAdded(); // Trigger the callback to reload the list of root beers
      } else {
        setShowErrorAlert(true); // Show error alert
        console.error("Error adding root beer:", response.data);
      }
    } catch (error) {
      setShowErrorAlert(true); // Show error alert
      console.error("Error adding root beer:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Success Alert */}
      <Alert
        message="Root Beer added successfully!"
        show={showSuccessAlert}
        type="success"
        onClose={() => setShowSuccessAlert(false)}
      />

      {/* Error Alert */}
      <Alert
        message="Failed to add Root Beer."
        show={showErrorAlert}
        type="error"
        onClose={() => setShowErrorAlert(false)}
      />

      <form onSubmit={handleSubmit} className="mt-8">
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
          className={`mt-4 py-2 px-4 rounded ${isFormValid ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
          disabled={!isFormValid || loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default AddRootBeer;
