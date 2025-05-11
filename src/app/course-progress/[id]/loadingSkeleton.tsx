import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

const CoursePlayerSkeleton = () => {
  return (
    <div className="max-w-6xl mx-auto my-8 px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
      
      {/* Video Section */}
      <div className="md:col-span-2 space-y-4">
        <Skeleton className="h-8 w-3/4 rounded" />
        <Card className="overflow-hidden shadow-xl rounded-2xl">
          <div className="aspect-video">
            <Skeleton className="w-full h-full" />
          </div>
        </Card>
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-1/2 rounded" />
          <Skeleton className="h-8 w-32 rounded" />
        </div>
      </div>

      {/* Lecture List */}
      <Card className="w-[500px] shadow-md rounded-2xl">
        <CardContent className="p-4">
          <Skeleton className="h-6 w-1/2 mb-4 rounded" />
          <div className="space-y-5 min-h-[400px] pr-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="p-3 my-3 rounded-lg border space-y-2"
              >
                <div className="flex gap-3 items-center">
                  <Skeleton className="w-5 h-5 rounded-full" />
                  <Skeleton className="h-4 w-3/4 rounded" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default CoursePlayerSkeleton
