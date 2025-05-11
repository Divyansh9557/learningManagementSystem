import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

const CoursePreviewSkeleton = () => {
  return (
    <div className="w-full mt-5">
      {/* Top Section */}
      <div className="w-full bg-gray-800 py-7 px-4 md:px-20 space-y-3">
        <Skeleton className="h-10 w-1/2" />
        <Skeleton className="h-6 w-1/3" />
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-4 w-1/4" />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-4 md:px-20 py-8">
        {/* Left: Description and Lecture List */}
        <div className="space-y-6">
          <div>
            <Skeleton className="h-6 w-1/3 mb-2" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4 mt-1" />
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold">
                <Skeleton className="h-6 w-1/3" />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Skeleton className="h-4 w-1/4" />
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Skeleton className="w-6 h-6 rounded-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right: Video Player & Pricing */}
        <div className="flex justify-center items-start">
          <Card className="w-full max-w-md bg-gray-100 flex flex-col p-4">
            <div className="w-full aspect-video mb-4">
              <Skeleton className="w-full h-full" />
            </div>
            <Skeleton className="h-5 w-3/4 mb-2" />
            <Separator className="my-2 bg-black" />
            <Skeleton className="h-5 w-1/4 mb-4" />
            <CardFooter className="p-0">
              <Skeleton className="h-10 w-full rounded" />
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default CoursePreviewSkeleton
