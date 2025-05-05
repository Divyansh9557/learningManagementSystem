import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-slate-700", "w-6 h-6", "group animate-pulse rounded-md", className)}
      {...props}
    />
  )
}

export { Skeleton }
