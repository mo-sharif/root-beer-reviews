import React from "react";

const Loader: React.FC = () => (
  <div className="text-center py-4">
    <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-12 w-12 mx-auto"></div>
    <p className="text-gray-600 mt-4">Loading...</p>
  </div>
);

export default Loader;
