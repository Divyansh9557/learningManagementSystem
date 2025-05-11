'use client'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ICourse } from "@/models/Course";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Course = ({ curr }: { curr: ICourse }) => {
  return (
    <Link href={`/course-details/${curr._id}`} className="block">
      <Card className="overflow-hidden rounded-2xl  bg-gradient-to-br from-white via-gray-50 to-white shadow-lg hover:shadow-2xl w-[300px] transition-all duration-300 hover:scale-[1.03] max-h-[400px] border border-gray-100">
        <div className="relative h-40 w-full">
          <Image
            src={curr?.thumbnail}
            alt={curr?.title}
            layout="fill"
            className="object-cover rounded-t-2xl"
            priority
          />
        </div>

        <CardContent className="p-4 flex flex-col justify-between h-[240px]">
          <h1 className="text-lg md:text-xl font-semibold text-gray-800 hover:underline line-clamp-2">
            {curr?.title}
          </h1>

          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-2">
              <Avatar className="h-9 w-9 border">
                <AvatarImage
                  src={curr?.creator?.image}
                  alt={curr?.creator?.username}
                />
                <AvatarFallback className="bg-gray-800 text-white text-xs">
                  CN
                </AvatarFallback>
              </Avatar>
              <span className="text-sm text-gray-600 font-medium">
                {curr?.creator?.username || "Unknown"}
              </span>
            </div>

            <Badge className="bg-blue-600/90 text-white text-[10px] px-3 py-1 rounded-full uppercase tracking-wide">
              {curr?.courseLevel}
            </Badge>
          </div>

          <div className="text-right mt-auto text-xl font-bold text-blue-700">
            ₹{curr?.price}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default Course;
