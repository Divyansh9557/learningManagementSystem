/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { purchasedCourse } from "@/actions/course.action";
import Course from "@/components/home/Course";
import { Button } from "@/components/ui/button";
import { CourseSkeleton } from "@/components/ui/courseSkeleton";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const BuyedCourse = () => {
    const arr= [1,2,3]

    const {data,isLoading}= useQuery({
      queryKey:['purchasedCourse'],
      queryFn:async()=>{
        const res= await purchasedCourse()
        return res
      }
    })
    const router = useRouter();
    

  return (
    <>
      {isLoading ? (
        arr.map((curr) => <CourseSkeleton key={curr} />)
      ) : data?.length === 0 ? (
        <Button className="bg-black text-white hover:bg-slate-700  ">
          Buy Course Now
        </Button>
      ) : (
        data?.map((curr: any) => (
          <div
            key={curr._id}
            onClick={() => router.push(`/course-details/${curr._id}`)}
          >
            <Course curr={curr} />
          </div>
        ))
      )}
    </>
  );
}

