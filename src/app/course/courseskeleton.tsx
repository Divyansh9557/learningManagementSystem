import { Skeleton } from "@/components/ui/skeleton";

function CourseSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="flex flex-col md:flex-row items-center md:items-start gap-6 p-4 shadow rounded-2xl border border-gray-200"
        >
          <Skeleton className="w-[160px] h-[100px] rounded-md" />
          <div className="space-y-2 w-full">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-6 w-24 mt-2" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default CourseSkeleton