import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Use React.lazy to dynamically import components
const Dashboard = React.lazy(() => import('./pages/Dasboard'));
const RootBeerDetails = React.lazy(() => import('./pages/RootBeerDetails'));
const AddReview = React.lazy(() => import('./pages/AddReview'));

// Main application component with lazy loading for routes
const App: React.FC = () => {
  return (
    <Router>
      {/* Suspense is used to show a fallback UI while components are being loaded */}
      <Suspense fallback={<div>Loading...</div>}>
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/rootbeer/:id" element={<RootBeerDetails />} />
            <Route path="/rootbeer/:id/add-review" element={<AddReview />} />
          </Routes>
        </div>
      </Suspense>
    </Router>
  );
};

export default App;