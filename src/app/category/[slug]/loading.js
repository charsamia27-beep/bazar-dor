import { GridSkeleton } from "@/components/Skeletons";

export default function Loading() {
  return (
    <div>
      <div className="skeleton mb-6 h-28 w-full rounded-2xl" />
      <p className="mb-4 text-sm text-gray-500">Loading…</p>
      <GridSkeleton count={6} />
    </div>
  );
}
