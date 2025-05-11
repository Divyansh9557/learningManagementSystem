'use client'


import Course from './Course';
import { CourseSkeleton } from '../ui/courseSkeleton';
import { useQuery } from '@tanstack/react-query';
import { ICourse } from '@/models/Course';



const Courses = () => {
    const arr = [0,1,2,3]
    const {data,isLoading}= useQuery({
      queryKey:["courseHome"],
      queryFn:async()=>{
        const res= await fetch("/api/course/published")
        const data= await res.json();
        return data.course || []
      }
    })
  return (
    <div className=' w-[70%] md:w-[90%]  min-h-60  mx-auto mb-32 flex flex-col items-center pt-3 ' >
        
             <h1 className='text-3xl font-bold  ' > Our Courses</h1>
             <div className=' grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-8 justify-center items-center gap-8 min-h-40' >
                {
                    isLoading?  arr.map((curr,index)=><CourseSkeleton key={index} /> )
                    : data?.map((curr:ICourse,index:number) =><Course  curr={curr} key={curr?._id || index } /> ) 
                }
             </div>
        
    </div>
  )
}

export default Courses


