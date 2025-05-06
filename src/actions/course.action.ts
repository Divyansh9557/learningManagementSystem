/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"
import auth from "@/lib/checkAuth"
import connectDB from "@/lib/connectDB";
import deleteOnCloudinary from "@/lib/deleteOnCloudinary";
import uploadOnClodinary from "@/lib/uploadOnCloudinary";
import Course from "@/models/Course";
import Lecture from "@/models/lecture";

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

export const createLecture= async (title:string,courseId:string)=>{
      if(!title) throw new Error("title is required")
       await connectDB()
      try {
        const course = await Course.findById(courseId);
        if(!course){
          throw new Error("couse is invaild")
        }
        const lecture = await Lecture.create({lectureTitle:title})
         if(!lecture){
          throw new Error("failed to create lecture")
         }

         const courseLecture = await Course.findByIdAndUpdate(courseId,{lecture:[...course.lecture,lecture._id]})
         if(!courseLecture){
          throw new Error("failed to update course")
         }
         return {success:true}


      } catch (error) {
        if(error instanceof Error){
          return {error:true}
        }
      }
}

export const getLecture = async (id:string)=>{
  try {
    await connectDB();

    const course = await Course.findById(id)
      .populate("lecture")
      .lean() as ({ _id: string; lecture: any[] } | null);

    if (!course) {
      throw new Error("Course not found");
    }

    const plainLectures = (course.lecture || []).map((lec: any) => ({
      _id: lec._id.toString(),
      lectureTitle: lec.lectureTitle,
      createdAt: lec.createdAt,
      updatedAt: lec.updatedAt,
    }));

    return {
      _id: course._id.toString(),
      lecture: plainLectures,
    };

  } catch (error) {
    if(error instanceof Error){

      return {error:true,message:error.message}
    }
  }
}

export const updateLecture= async (formData:FormData)=>{
   const title= formData.get("title") as string
   const video= formData.get("video") as File
   const isFree= formData.get("isFree") as string
   const lectureId= formData.get("lectureId") as string
try {
  const {public_id,url,resourceType}= await uploadOnClodinary(video)
  
     const free= isFree==='true'?true:false
     
     const lecture = await Lecture.findById(lectureId)
     if(lecture.publicId){
         await deleteOnCloudinary(lecture.publicId,lecture.resourceType)
     }

     await Lecture.findByIdAndUpdate(lectureId,{
       lectureTitle:title,
        videoUrl: url,
        publicId: public_id,
        resourceType,
        isPriviewFree:free
     },{new:true})
  return true;


} catch (error) {
   console.log(error)
}
   

}  