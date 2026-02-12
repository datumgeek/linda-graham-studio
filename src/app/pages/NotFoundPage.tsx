import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div className="container mx-auto p-8 text-center min-h-[60vh] flex flex-col items-center justify-center">
      <p className="text-8xl font-serif font-bold opacity-15 mb-4">404</p>
      <h1 className="text-2xl sm:text-3xl font-serif font-semibold mb-2">
        Page Not Found
      </h1>
      <p className="opacity-60 mb-8 max-w-md">
        The page you're looking for doesn't exist. It may have been moved or removed.
      </p>
      <div className="flex gap-3">
        <Link to="/" className="btn btn-primary">
          Go Home
        </Link>
        <Link to="/portfolio/exhibitions" className="btn btn-ghost">
          View Exhibitions
        </Link>
      </div>
    </div>
  );
}
