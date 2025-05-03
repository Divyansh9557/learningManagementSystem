'use server'

import auth from "@/lib/checkAuth"
import connectDB from "@/lib/connectDB";
import UserModel from "@/models/User";



export const imageUpdate = async(url: string, id: string) => {
const authResult = await auth();
await connectDB()
if (!authResult) {
    throw new Error("Authentication failed");
}

await UserModel.findByIdAndUpdate(
    authResult.id,{image:url, publicId:id},)
   const user = await UserModel.findById(authResult.id).select("-password");
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
   return 
}