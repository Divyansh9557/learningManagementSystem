import { Skeleton } from "@/components/ui/skeleton"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"

const ProfileSkeleton = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-10">
      <Skeleton className="h-10 w-40 mb-8" />

      <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
        {/* Avatar and uploader */}
        <div className="flex flex-col items-center space-y-4">
          <Avatar className="h-28 w-28 md:h-36 md:w-36">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Skeleton className="h-8 w-32" />
        </div>

        {/* Profile details */}
        <div className="flex-1 w-full space-y-4">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-6 w-2/3" />
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-9 w-32 mt-4" />
        </div>
      </div>

      {/* Courses section */}
      <div className="mt-10">
        <Skeleton className="h-6 w-64 mb-4" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i} className="p-4 space-y-3">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-40 w-full rounded-lg" />
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProfileSkeleton
