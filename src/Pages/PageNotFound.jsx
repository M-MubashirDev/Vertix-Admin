import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="text-center p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-6xl font-bold text-primary">404</h1>
        <p className="mt-4 text-2xl text-neutral">
          Oops! The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block px-6 py-3 bg-primary text-white rounded-full hover:bg-primary-dark transition duration-300"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
}

export default PageNotFound;
