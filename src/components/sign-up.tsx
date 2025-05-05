'use client'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import Link from "next/link"
import {z} from 'zod'
import { useForm,SubmitHandler } from "react-hook-form"
import {zodResolver} from '@hookform/resolvers/zod'
import { RegisterUserAction } from "@/actions/user.action"
import toast from "react-hot-toast"
import { redirect } from "next/navigation"

export function SignUp({
  className,
  ...props
}: React.ComponentProps<"div">) {

 const registerSchema= z.object({
    username:z.string().min(1, "Username is required").max(20, "Username must be at most 20 characters long"),
    email:z.string().min(1, "Email is required").email("Invalid email address"),
    password:z.string().min(8, "Password is minimum 8 character long").max(20, "Password must be at most 20 characters long") 
 })
 
 type RegisterSchema=z.infer<typeof registerSchema>

 const {register,formState:{errors,isSubmitting},handleSubmit}= useForm<RegisterSchema>({
     defaultValues:{
        username:"",
        email:"",
        password:""
     },
     resolver:zodResolver(registerSchema),
 })

 const onSubmit: SubmitHandler<RegisterSchema> =async (data) => {
    const result=await RegisterUserAction(data)
    if(result?.success){
      toast.success("user created succesfully")
      redirect("/login")
    }else{
        toast.error(result?.error || "An unknown error occurred")
    }
 }
   

  return (
    <div className={cn("flex flex-col gap-6  ", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2 ">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-6 md:p-8 bg-black "
          >
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold text-white ">New with us</h1>
                <p className="text-muted-foreground text-balance text-white">
                  Register to make Learing account
                </p>
              </div>
              <div className="grid gap-3">
                <Label className="text-white" htmlFor="email">
                  Username
                </Label>
                <Input
                  {...register("username")}
                  id="username"
                  type="text"
                  placeholder="john_doe"
                  className="text-white border-white"
                />
              </div>
              {errors.username && (
                <p className="text-red-500">{errors.username.message}</p>
              )}
              <div className="grid gap-3">
                <Label className="text-white" htmlFor="email">Email</Label>
                <Input
                  {...register("email")}
                  id="email"
                  type="email"
                   className="text-white border-white"
                  placeholder="m@example.com"
                />
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label className="text-white" htmlFor="password">Password</Label>
                </div>
                <Input
                  {...register("password")}
                  id="password"
                  type="password"
                   className="text-white border-white"
                />
              </div>
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
              <Button type="submit" className="w-full" variant="form">
                {isSubmitting ? "Loading..." : "Register"}
              </Button>

              <div className="text-center text-white text-sm">
                Already have an account?{" "}
                <Link href="/login" className="underline underline-offset-4">
                  Login
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
      <div className="text-white *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
