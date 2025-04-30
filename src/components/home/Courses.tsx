'use client'

import { useState } from 'react';
import Course from './Course';
import { CourseSkeleton } from '../ui/courseSkeleton';



const Courses = () => {
    const [isLoading,setIsLoading]= useState(false)
    const arr = [0,1,2,3,4,5,6,7]
  return (
    <div className='w-[90%]  min-h-60  mx-auto flex flex-col items-center pt-3 ' >
        
             <h1 className='text-3xl font-bold  ' > Our Courses</h1>
             <div className='flex flex-wrap mt-8 justify-center gap-8 min-h-40' >
                {
                    isLoading?  arr.map((curr,index)=><CourseSkeleton key={index} /> )
                    : arr.map((curr,index)=><Course key={index} /> ) 
                }
             </div>
        
    </div>
  )
}

export default Courses


