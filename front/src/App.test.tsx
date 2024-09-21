import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App"; // Adjust the import path according to your project structure
import { AlertProvider } from "context/AlertContext";

// Mock the lazy-loaded components to prevent loading the actual files
jest.mock("pages/Dashboard", () => () => <div>Mock Dashboard</div>);
jest.mock("pages/RootBeerDetails", () => () => <div>Mock RootBeerDetails</div>);
jest.mock("components/Alert", () => () => <div>Mock Alert</div>);

describe("App component", () => {
  test("renders loader while lazy-loaded components are loading", async () => {
    render(
      <AlertProvider>
        <Router>
          <App />
        </Router>
      </AlertProvider>,
    );

    // Check if Loader component is displayed initially
    const loader = screen.getByText(/Loading.../i);
    expect(loader).toBeInTheDocument();

    // Wait for the lazy-loaded components to render
    await waitFor(() => {
      expect(screen.getByText("Mock Dashboard")).toBeInTheDocument();
    });
  });

  test("renders Dashboard component on the home route", async () => {
    render(
      <AlertProvider>
        <Router>
          <App />
        </Router>
      </AlertProvider>,
    );

    // Wait for the lazy-loaded Dashboard component
    await waitFor(() => {
      expect(screen.getByText("Mock Dashboard")).toBeInTheDocument();
    });
  });

  test("renders RootBeerDetails component on /rootbeer/:id route", async () => {
    window.history.pushState({}, "RootBeerDetails Page", "/rootbeer/1");

    render(
      <AlertProvider>
        <Router>
          <App />
        </Router>
      </AlertProvider>,
    );

    // Wait for the lazy-loaded RootBeerDetails component
    await waitFor(() => {
      expect(screen.getByText("Mock RootBeerDetails")).toBeInTheDocument();
    });
  });

  test("renders global Alert component", async () => {
    render(
      <AlertProvider>
        <Router>
          <App />
        </Router>
      </AlertProvider>,
    );

    // Check if the global Alert component is rendered
    await waitFor(() => {
      expect(screen.getByText("Mock Alert")).toBeInTheDocument();
    });
  });
});
