"use server"

import connectDB from "@/lib/connectDB";
import genertateToken from "@/lib/generateToken";
import User from "@/models/User";
import bcrypt from "bcrypt"
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import auth from "@/lib/checkAuth";



interface registerType{
    username:string,
    email:string,
    password:string,
}
interface loginType{
   email:string,
   password:string,
}


export const RegisterUserAction = async (data: registerType) => {
    const {username, email, password} = data;
    await connectDB()
   try {
     const checkUser= await User.findOne({username})
     if(checkUser){
        throw new Error("username already taken")
     }
     const checkEmail= await User.findOne({email})
     if(checkEmail){
        throw new Error("email already taken")
     }
     const salt = await bcrypt.genSalt(10)

     const hassedPassword= await bcrypt.hash(password,salt)

     await User.create({
        username,
        email,
        password:hassedPassword
     })

     return {success:true}

   } catch (error) {
     if(error instanceof Error) {
        return { success:false,error: error.message}
     }
   }
}

export const LoginUser= async(data:loginType)=>{
  const {email,password}= data
  await connectDB()
   try {
      const user= await User.findOne({email})
      if(!user){
         throw new Error("email address is wrong")
      }
      const isMatch= await bcrypt.compare(password,user.password)
      if(!isMatch){
         throw new Error("incorrect password")
      }
      await genertateToken(user._id.toString(), user.role,user.image)
     return {success:true}

   } catch (error) {
          if(error instanceof Error) {
            return { success:false,error: error.message}
          }
   }
   redirect('/')
}



export const authUser =async()=>{
    const cookieStore = cookies();
    const data=(await cookieStore).get("token")
    const token = data?.value
const user = token ? jwt.verify(token, process.env.JWT_SECRET as string) : null;
if (user && typeof user !== "string") {
    return { id: user.id, role: user.role };
}
return null;
     
} 



export const getUser = async ()=>{
    const cookieStore = await cookies();
    const token= cookieStore.get("token")?.value
    
    try {
       if (!token) {
           throw new Error("Token is missing");
       }
       const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string);
       await connectDB()
       
       if (typeof decodedToken !== "object" || !("id" in decodedToken)) {
           throw new Error("Invalid token");
       }
      const user = await User.findById(decodedToken.id).select("-password");
      if(!user ){
         throw new Error("user not found")
      }
      
      const dbUser = {
         _id:user._id.toString(),
         image:user.image.toString(),
         username: user.username.toString(),
         email: user.email.toString(),
         role: user.role.toString(),
         enrolledCourses:user.enrolledCourses,
         createdAt: user.createdAt.toString(),
         updatedAt: user.updatedAt.toString(),
      }
      return dbUser
    } catch (error) {
      if(error instanceof Error) {
         return {error:error.message}
      }

    }
} 


export const updateUserName = async (username: string) => {
   const authResult = await auth();
   if (!authResult) {
       throw new Error("Authentication failed");
   }
  try {
    const { id } = authResult;
    await connectDB()
    await User.findByIdAndUpdate(id,{username:username}).select("-password -publicId ")
    const user = await User.findById(id).select("-password -publicId ");
    const dbUser = {
       _id:user._id.toString(),
       image:user.image.toString(),
       username: user.username.toString(),
       email: user.email.toString(),
       role: user.role.toString(),
       enrolledCourses:user.enrolledCourses,
       createdAt: user.createdAt.toString(),
       updatedAt: user.updatedAt.toString(),
      }
      return dbUser
  } catch (error) {
   if(error instanceof Error) {}
       return {error:"username already taken"}
  }
}
