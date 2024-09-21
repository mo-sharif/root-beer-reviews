import React from "react";

const Loader: React.FC = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50 z-50">
    <div className="text-center">
      <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-12 w-12 mx-auto"></div>
      <p className="text-gray-600 mt-4">Loading...</p>
    </div>
  </div>
);

export default Loader;