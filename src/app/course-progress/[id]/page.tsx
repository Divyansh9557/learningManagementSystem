/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import ReactPlayer from "react-player";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useQuery } from "@tanstack/react-query";
import { getCourseById } from "@/actions/course.action";
import { useParams } from "next/navigation";
import { FaPlayCircle } from "react-icons/fa";
import CoursePlayerSkeleton from "./loadingSkeleton";



const CoursePlayer = () => {
  const [currentLectureIndex, setCurrentLectureIndex] = useState(0);
  const { id } = useParams() ?? {};

  const {data,isLoading}= useQuery({
    queryKey: ["course", id],
    queryFn:async()=>{
         const  res= await getCourseById(id as string)
         if(res?.error){
           throw new Error(res.message)
         }
         return res?.course
    }
  })
   if(isLoading){
    return <CoursePlayerSkeleton/>
   }

  return (
    <div className="max-w-6xl mx-auto my-8 px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
      
      <div className="md:col-span-2 space-y-4">
        <h1 className="text-3xl font-bold">{data?.title}</h1>
        <Card className="overflow-hidden shadow-xl rounded-2xl">
          <div className="aspect-video">
            <ReactPlayer
              url={data?.lecture[currentLectureIndex].videoUrl}
              width="100%"
              height="100%"
              controls
            />
          </div>
        </Card>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            Lecture {currentLectureIndex + 1}: {data?.lecture[currentLectureIndex].lectureTitle}
          </h2>
          <Button className="bg-black text-white">Mark as completed</Button>
        </div>
      </div>

      
      <Card className=" w-[500px] shadow-md rounded-2xl">
        <CardContent className="p-4">
          <h3 className="text-xl font-semibold mb-4">Course Lectures</h3>
          <ScrollArea className="space-y-5  min-h-[400px] pr-2">
            {data?.lecture.map((lecture: any, index: number) => (
              <div 
                key={lecture.lectureTitle}
                
                className={` ${
                  index === currentLectureIndex && "bg-slate-200 text-black "
                } p-3 my-3 rounded-lg cursor-pointer border `}
                onClick={() => {
                  setCurrentLectureIndex(index)
                }}
              >
                <div className="flex justify-between items-center">
                  <span className="text-sm flex gap-1 font-medium">
                   
                      <span className="bg-gray-500 rounded-full w-5 h-5 flex justify-center items-center text-white ">
                        <FaPlayCircle />
                      </span>
                    {lecture.lectureTitle}
                  </span>
                  
                </div>
              </div>
            ))}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default CoursePlayer;
