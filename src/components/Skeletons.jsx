export function CardSkeleton() {
  return (
    <div className="rounded-2xl border border-base-300 bg-white p-5">
      <div className="flex items-center gap-3">
        <div className="skeleton h-12 w-12 rounded-xl" />
        <div className="space-y-2">
          <div className="skeleton h-4 w-28" />
          <div className="skeleton h-3 w-16" />
        </div>
      </div>
      <div className="skeleton mt-6 h-3 w-16" />
      <div className="skeleton mt-2 h-6 w-24" />
    </div>
  );
}

export function GridSkeleton({ count = 9 }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}
