import { Skeleton } from '@/components/ui/skeleton'


const SkeletonPage = () => {
  return (
     <div className="p-4 md:p-6 w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="space-y-2">
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>

      <div className="space-y-4">
        <Skeleton className="h-6 w-1/3" />
        <Skeleton className="h-[300px] sm:h-[400px] md:h-[450px] w-full rounded-xl" />
      </div>
    </div>
  )
}

export default SkeletonPage