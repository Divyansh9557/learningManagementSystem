'use client'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import React from "react";


const Course = () => {
  return (
    <Link href={`/`}>
      <Card className="overflow-hidden rounded-lg  h-80 bg-white shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
        <div className="relative">
          <Image
            src="/course.jpg"
            alt="course"
            width={100}
            height={100}
            className="w-full h-43 transform -translate-y-6.5 object-cover rounded-t-lg"
            priority
          />
        </div>
        <CardContent className="px-5   transform -translate-y-6.5  space-y-3">
          <h1 className="hover:underline font-bold text-lg truncate">
            vjdbkjbvkshkvbbsvdnvhjeeh
          </h1>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={"https://github.com/shadcn.png"}
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <h1 className="font-medium text-sm">ckjkbbsabcabc</h1>
            </div>
            <Badge
              className={
                "bg-blue-600 text-white px-2 py-1 text-xs rounded-full"
              }
            >
              vdvjbsdv
            </Badge>
          </div>
          <div className="text-lg font-bold">
            <span>₹50000</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default Course;