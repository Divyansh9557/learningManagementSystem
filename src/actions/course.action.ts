"use server"
import auth from "@/lib/checkAuth"
import connectDB from "@/lib/connectDB";
import Course from "@/models/Course";

export const createCourse= async(formData:FormData)=>{
    const title = formData.get('title') as string
    const category = formData.get('category') as string
    console.log(title,category)
  const user = await auth();
  
  try {
    await connectDB()
    if(!user) {
       throw new Error('not auth')
    }
    if(!title || !category){
            throw new Error('both the feild is required')
    }
    await Course.create({
        title,
        category,
        creator: user.id
    })
  } catch (error) {
     if(error instanceof Error){
      console.log(error.message)
     }
  }
}

export const getCreatorPost= async ()=>{
    const authUser = await auth()
    try {
      if(!authUser){
        return
      }
      const post= await Course.find({creator: authUser.id})
      return post
    } catch (error) {
      if(error)
       return {error:"failed to fetch post"}
    }
}

export const UpdateCourse= async(formData:FormData)=>{
  try {
    await connectDB();
    const user= await auth()

    const title = formData.get("title") as string;
    const subtitle = formData.get("subtitle") as string;
    const description = formData.get("description") as string;
    const price = formData.get("price") as string;
    const category = formData.get("category") as string;
    const level = formData.get("level") as string
    const courseId = formData.get("id") as string;


     await Course.findByIdAndUpdate(courseId,{
      title,
      subtitle,
      description,
      price,
      category,
      courseLevel:level,
      creator:user?.id
    },{new:true});


    return { success: true};
  } catch (error) {
    console.error("Course update failed:", error);
    return { success: false, error: "Something went wrong." };
  }

  
}
export const getCourseBYId= async(id:string)=>{
     await connectDB()
     try {
       const courseData = await Course.findById(id)
       if(!courseData){
         throw new Error("Course not found")
       }
       const data={
        title: courseData.title.toString(),
        description: courseData.description.toString(),
        subtitle: courseData.subtitle.toString(),
        isPublished: courseData.isPublished
       }
       return data
        
     } catch (error) {
       if(error instanceof Error){
          return {error:true}
       }
     }

}