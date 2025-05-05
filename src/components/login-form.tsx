"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import Link from "next/link"
import { LoginUser } from "@/actions/user.action"
import { useForm ,SubmitHandler} from "react-hook-form"
import toast from "react-hot-toast"
import { redirect } from "next/navigation"
import { useQueryClient } from "@tanstack/react-query";


export  function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const queryClient = useQueryClient()
  const {register,formState:{isSubmitting},handleSubmit} = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  })

  interface LoginFormInputs {
    email: string;
    password: string;
  }

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
     const res= await LoginUser(data);
     if(res?.success){
      toast.success("Login successful")
      await queryClient.invalidateQueries({ queryKey: ["authUser"] });
      redirect("/")
     }
     else{
      toast.error(res?.error || "An unknown error occurred")
     }
  }

  return (
    <div className={cn("flex flex-col gap-6  ", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2 ">
          <form className="p-6 md:p-8 bg-black " onSubmit={handleSubmit(onSubmit)}>  
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold text-white ">Welcome back</h1>
                <p className="text-muted-foreground text-balance text-white">
                  Login to your Learing account
                </p>
              </div>
              <div className="grid gap-3">
                <Label className="text-white" htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  placeholder="m@example.com"
                  required
                  className="text-white border-white"
                  {...register("email", {})}
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label className="text-white" htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-2 hover:underline text-white "
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input {...register("password")}  className="text-white border-white" id="password" name="password" type="password" required />
              </div>
              <Button type="submit" className="w-full" variant="form"> 
               {isSubmitting?"Loading...":"Login"}
              </Button>
            
              
              <div className="text-center text-white text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/register" className="underline underline-offset-4">
                  Sign up
                </Link>
              </div>
            </div>
          </form>
          <div className="bg-muted relative hidden md:block">
            <Image
              src="/loginImage.jpg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.5] "
              width={500}
              height={500}
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-white  *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  )
}
