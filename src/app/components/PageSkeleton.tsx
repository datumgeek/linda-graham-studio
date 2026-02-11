export function PageSkeleton() {
  return (
    <div className="container mx-auto p-6 animate-pulse">
      <div className="h-8 bg-base-300 rounded w-48 mb-6" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="card bg-base-100 shadow-sm">
            <div className="h-44 bg-base-300 rounded-t-2xl" />
            <div className="p-4">
              <div className="h-4 bg-base-300 rounded w-3/4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
