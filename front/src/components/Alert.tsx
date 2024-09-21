import React from "react";
import { useAlert } from "context/AlertContext";

const Alert: React.FC = () => {
  const { alertMessage, alertType, hideAlert } = useAlert();

  if (!alertMessage) return null;

  return (
    <div
      className={`fixed flex justify-between p-4 top-0 left-0 w-full text-center py-4 ${
        alertType === "success" ? "bg-green-500" : "bg-red-500"
      } text-white`}
    >
      {alertMessage}
      <button className="ml-4" onClick={hideAlert}>
        X
      </button>
    </div>
  );
};

export default Alert;
