import React, { createContext, useContext, useState } from "react";

// Define types for the alert
interface AlertContextType {
  alertMessage: string;
  alertType: "success" | "error" | "";
  showAlert: (message: string, type: "success" | "error") => void;
  hideAlert: () => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

// Custom hook to use the alert context
export const useAlert = (): AlertContextType => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
};

// AlertProvider component
export const AlertProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [alertType, setAlertType] = useState<"success" | "error" | "">("");

  const showAlert = (message: string, type: "success" | "error") => {
    setAlertMessage(message);
    setAlertType(type);
  };

  const hideAlert = () => {
    setAlertMessage("");
    setAlertType("");
  };

  return (
    <AlertContext.Provider
      value={{ alertMessage, alertType, showAlert, hideAlert }}
    >
      {children}
    </AlertContext.Provider>
  );
};
