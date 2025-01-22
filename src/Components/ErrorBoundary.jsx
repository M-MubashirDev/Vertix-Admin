import { Link } from "react-router-dom";

const ErrorBoundaryFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <h1 className="text-4xl font-bold text-primary mb-4">
        Something Went Wrong.
      </h1>
      <p className="text-neutral mb-6">{error.message}</p>
      <button
        onClick={resetErrorBoundary}
        className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition mb-4"
      >
        Try Again
      </button>
      <Link
        to="/"
        className="px-4 py-2 bg-secondary text-white rounded hover:bg-secondary-dark transition"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default ErrorBoundaryFallback; // Renamed for clarity
