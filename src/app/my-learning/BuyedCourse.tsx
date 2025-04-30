'use client'

import Course from "@/components/home/Course";
import { Button } from "@/components/ui/button";
import { CourseSkeleton } from "@/components/ui/courseSkeleton";
import { useState } from "react";

export const BuyedCourse = () => {
    const [isLoading, setIsLoading] = useState(false);
    const arr= [1,2,3]
    const data=[2]

  return (
    <>
    
         
         {isLoading? arr.map((curr) => <CourseSkeleton key={curr} />)
            : data.length===0 ? <Button className="bg-black text-white hover:bg-slate-700  "  >Buy Course Now</Button>
                            :arr.map((curr) => <Course key={curr} />)}

    
      
    </>
  );
}

