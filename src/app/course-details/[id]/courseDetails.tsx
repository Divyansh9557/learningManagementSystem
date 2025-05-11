'use client'
/* eslint-disable @typescript-eslint/no-explicit-any */
import { getCourseById } from "@/actions/course.action";
import ProductBuy from "@/components/productBuy";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FaInfoCircle, FaPlayCircle } from "react-icons/fa";
import ReactPlayer from "react-player";
import CoursePreviewSkeleton from "./loaderSkeleton";
// import Course from '@/models/Course';

const CourseDetailss = ({id}:{id:string}) => {


  const { data,isLoading } = useQuery({
    queryKey: ["courseDetails"],
    queryFn: async () => {
      const res = await getCourseById(id as string);
      if (res?.error) {
        throw new Error(res.message);
      }
      return {
        course: res?.course ?? null,
        isEnrolled: res?.isEnrolled ?? false,
      };
    },
  });

  const [selectedLecture, setSelectedLecture] = useState<any>(null);

  useEffect(() => {
    if (data?.course?.lecture?.length) {
      setSelectedLecture(data.course.lecture[0]);
    }
  }, [data]);

  if(isLoading){
    return <CoursePreviewSkeleton/>
  }

  return (
    <div className="w-full mt-5">
      <div className="w-full bg-gray-800 py-7 px-4 md:px-20 space-y-3">
        <h1 className="text-3xl md:text-4xl font-bold text-white">
          {data?.course.title}
        </h1>
        <h3 className="text-lg md:text-xl text-gray-300">
          {data?.course.subtitle}
        </h3>
        <p className="text-gray-300">
          Created By: {data?.course.creator?.username}
        </p>
        <p className="flex items-center gap-2 text-gray-300">
          <FaInfoCircle /> Last Updated:
        </p>
        <p className="text-gray-300">
          Students Enrolled: {data?.course.enrolledStudents.length || "0"}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-4 md:px-20 py-8">
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-gray-700">{data?.course.description}</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold">Course Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p>{data?.course.lecture.length} Lectures</p>
              {data?.course.lecture.map((curr: any) => (
                <button
                  key={curr._id}
                  onClick={() => setSelectedLecture(curr)}
                  className={`flex w-full items-center gap-3 text-left p-2 rounded-md hover:bg-gray-200 ${
                    selectedLecture?._id === curr._id ? "bg-gray-200 font-semibold" : ""
                  }`}
                >
                  <FaPlayCircle className="text-blue-600" />
                  {curr?.lectureTitle}
                </button>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-center items-start">
          <Card className="w-full max-w-md bg-gray-100 flex flex-col p-4">
            <div className="w-full aspect-video mb-4">
              {selectedLecture && (
                data?.isEnrolled || selectedLecture.isPreviewFree ? (
                  <ReactPlayer
                    width="100%"
                    height="100%"
                    controls
                    url={selectedLecture.videoUrl}
                  />
                ) : (
                  <p className="text-center text-gray-700">
                    This video is not available for preview. Please purchase the course to access it.
                  </p>
                )
              )}
            </div>
            <h1 className="text-lg font-medium mb-2">
              {selectedLecture?.lectureTitle}
            </h1>
            <Separator className="my-2 bg-black" />
            <h1 className="text-lg font-semibold mb-4">
              Price: ₹{data?.course.price}
            </h1>
            <CardFooter className="p-0">
              <Button className="w-full bg-black text-white">
                {data?.isEnrolled ? (
                  <Link
                    href={`/course-progress/${data?.course._id}`}
                    className="w-full text-center"
                  >
                    Continue
                  </Link>
                ) : (
                  <ProductBuy />
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default CourseDetailss