/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"
import auth from "@/lib/checkAuth"
import connectDB from "@/lib/connectDB";
import deleteOnCloudinary from "@/lib/deleteOnCloudinary";
import uploadOnClodinary from "@/lib/uploadOnCloudinary";
import Course, { ICourse } from "@/models/Course";
import Lecture from "@/models/lecture";
import UserModel, { User } from "@/models/User";

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
      await connectDB()
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
    const courseId = formData.get("id") as string;
    const course = await Course.findById(courseId);

    const title = formData.get("title") as string || course.title ;
    const subtitle = formData.get("subtitle") as string || course.subtitle ;
    const description = formData.get("description") as string || course.description ;
    const price = formData.get("price") as string || course.price ;
    const category = formData.get("category") as string || course.category ;
    const level = formData.get("level") as string || course.courseLevel

     await Course.findByIdAndUpdate(courseId,{
      title ,
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

export const deletecourse = async(id:string)=>{
    try {
      connectDB();
      const course = await Course.findById(id).populate("lecture")
      if(!course){
        throw new Error("course not found")
      }
      if(course.lecture){
        course.lecture.forEach(async(lec: { _id:string,publicId: string, resourceType:string}) => {
           await deleteOnCloudinary(lec.publicId,lec.resourceType)
           await Lecture.findByIdAndDelete(lec._id)
         })
      
      }
      await deleteOnCloudinary(course.publicId,course.resourceType)
      await Course.findByIdAndDelete(id)
       return true

    } catch (error) {
      
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
 await  connectDB()
 
 const free= isFree==='true'?true:false
 
 const lecture = await Lecture.findById(lectureId)
 if(!lecture){
   throw new Error("lecture not found")
 }
 const {public_id,url,resourceType}= await uploadOnClodinary(video)
     if(lecture.publicId){
         await deleteOnCloudinary(lecture.publicId,lecture.resourceType)
     }

     await Lecture.findByIdAndUpdate(lectureId,{
       lectureTitle:title || lecture.lectureTitle,
        videoUrl: url,
        publicId: public_id,
        resourceType,
        isPriviewFree:free
     })
  return true;


} catch (error) {
  if(error instanceof Error){
    return {error:true,message:error.message}
  }
}
   

} 

export const removeLecture= async (id:string)=>{
    try {
      await connectDB()
      const lecture = await Lecture.findById(id)
      if(!lecture){
        throw new Error(' Lecture not found')
      }
      if(lecture.publicId){
        await deleteOnCloudinary(lecture.publicId,lecture.resourceType)
      }
      await Lecture.findByIdAndDelete(id)
      return {success:true};
    } catch (error) {
      if(error instanceof Error){
        return {error:true,message:error.message}
     
    }
  }
}
     

export const publishCourse = async (id:string)=>{
  try {
     await connectDB()
     const course = await Course.findById(id).populate('lecture')
      if(!course){
        throw new Error("course not found")
      }
       if(course.title==="" || !course.title ){
        throw new Error(" title not filed ")
      }
       if(course.subtitle==="" || !course.subtitle ){
        throw new Error(" subtitle not filed ")
      }
       if(course.description==="" || !course.description ){
        throw new Error(" description not filed ")
      }
       if(course.courseLevel==="" || !course.courseLevel ){
        throw new Error(" courseLevel not filed ")
      }
       if(course.category==="" || !course.category ){
        throw new Error(" category not filed ")
      }
       if(course.price==="" || !course.price ){
        throw new Error(" price not filed ")
      }
       if(course.thumbnail==="" || !course.thumbnail ){
        throw new Error(" thumbnail not filed ")
      }
       if(course.lecture.length===0){
        throw new Error(" no lecture found create one ")
      }
       course.lecture.forEach((curr:{videoUrl:string},index:number)=>{
          if(!curr.videoUrl || curr.videoUrl===""){
            throw new Error(` video is required in lecture ${index+1} `)
          }
       })
       course.isPublished=!course.isPublished
       await course.save()
       return {success:true}

  } catch (error) {
    if(error instanceof Error){
      return {error:true,message:error.message}
    }
  }
}


export const getCourseById = async (id: string) => {
  try {
    await connectDB();

    const authUser = await auth();
    const userId = authUser?.id as string;

    if (!userId) {
      throw new Error("User not authenticated");
    }

    const user: User = await UserModel.findById(userId).populate({
      path: "enrolledCourses",
    });

    const course = await Course.findById(id)
      .populate("creator")
      .populate({ path: "lecture" })
     

    if (!course) {
      throw new Error("Course not found");
    }

    const isEnrolled = user.enrolledCourses.some((enrolledCourse: any) => {
      return (enrolledCourse as { _id: string })._id.toString() === course._id.toString();
    });

    if (isEnrolled && course && 'lecture' in course && Array.isArray(course.lecture)) {
      course.lecture = course.lecture.map((curr: any) => ({
        ...curr,
        isPriviewFree: true,
      }));
    }

    const safeCourse = JSON.parse(JSON.stringify(course));

    return {
      course: safeCourse,
      isEnrolled,
    };
  } catch (error) {
    if (error instanceof Error) {
      return { error: true, message: error.message };
    }
  }
};


export const purchasedCourse = async()=>{
   const user= await auth();
   try {
    const userData = await UserModel.findById(user?.id as string).select("-password")
      .populate({ path: "enrolledCourses",populate: {path:"creator"} })
      .lean() as { enrolledCourses: any[] } | null;

    

    return JSON.parse(JSON.stringify(userData?.enrolledCourses))  || [];
   } catch (error) {
     console.log(error)
   }
}


export async function fetchCourses({
  search,
  order,
  category,
}: {
  search?: string
  order?: string
  category?: string[]
}) {
  await connectDB()

  const query: any = {
    isPublished: true, // always filter only published courses
  }

  if (search) {
    const regex = new RegExp(search, 'i') // case-insensitive
    query.$or = [
      { title: regex },
      { subtitle: regex },
    ]
  }

  if (category && category.length > 0) {
    query.category = { $in: category }
  }

  let sortOption = {}
  if (order === 'increasing') sortOption = { title: 1 }
  if (order === 'decreasing') sortOption = { title: -1 }

  const courses = await Course.find(query).populate('creator').sort(sortOption).lean()

  return JSON.parse(JSON.stringify(courses))
}