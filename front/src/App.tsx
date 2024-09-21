import Loader from "components/Loader";
import { AlertProvider } from "context/AlertContext";
import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Use React.lazy to dynamically import components
const Dashboard = React.lazy(() => import("pages/Dashboard"));
const RootBeerDetails = React.lazy(() => import("pages/RootBeerDetails"));
const Alert = React.lazy(() => import("components/Alert"));

// Main application component with lazy loading for routes
const App: React.FC = () => {
  return (
    <AlertProvider>
      <Router>
        {/* Suspense is used to show a fallback UI while components are being loaded */}
        <Suspense fallback={<Loader />}>
          <div className="container mx-auto p-4">
            <Alert /> {/* Global Alert */}
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/rootbeer/:id" element={<RootBeerDetails />} />
            </Routes>
          </div>
        </Suspense>
      </Router>
    </AlertProvider>
  );
};

export default App;
