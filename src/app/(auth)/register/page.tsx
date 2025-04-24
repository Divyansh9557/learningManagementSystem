
import { SignUp } from "@/components/sign-up"
import auth from "@/lib/checkAuth"
import { redirect } from "next/navigation"

export default async function Register() {
  const user = await auth()
  if (user?.id) {
    redirect("/")
  }
  return (
    <div className="bg-muted flex min-h-svh flex-col bg-gray-900 items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-4xl">
        <SignUp />
      </div>
    </div>
  )
}
