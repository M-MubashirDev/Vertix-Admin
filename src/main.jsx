import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
import "./index.css";
import App from "./App.jsx";
import ErrorBoundaryFallback from "./Components/ErrorBoundary.jsx"; // Updated import

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ErrorBoundary
      FallbackComponent={ErrorBoundaryFallback} // Consistent naming
      onReset={() => window.location.replace("/")} // Reset to home
    >
      <App />
    </ErrorBoundary>
  </StrictMode>
);
