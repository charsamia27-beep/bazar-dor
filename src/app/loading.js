import { GridSkeleton } from "@/components/Skeletons";

export default function Loading() {
  return (
    <div className="space-y-8">
      <div className="skeleton h-64 w-full rounded-3xl" />
      <div className="skeleton h-7 w-48" />
      <GridSkeleton count={6} />
    </div>
  );
}
