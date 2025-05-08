'use client'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ICourse } from "@/models/Course";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Course = ({ curr }: { curr: ICourse }) => {
  // Split the title into words, take the first 5 words, and join them back into a string
  const words = curr.title.split(" ");
  const limitedTitle = words.slice(0, 5).join(" ") + (words.length > 5 ? "..." : "");

  return (
    <Link href={`/`} className="block">
      <Card className="overflow-hidden rounded-2xl  bg-white shadow-md hover:shadow-xl transition-transform duration-300 hover:scale-[1.02] max-h-[380px]">
        <div className="relative w-full">
          <div className="w-full h-40">  {/* Set fixed height for the image container */}
            <Image
              src={curr.thumbnail}
              alt={curr.title}
              layout="fill"
              className="object-cover rounded-t-2xl"
              priority
            />
          </div>
        </div>

        <CardContent className="p-4 space-y-4 flex flex-col justify-between">
          <h1 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 hover:underline line-clamp-2">
            {limitedTitle} {/* Display the limited title with ellipsis */}
          </h1>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={curr.creator?.image}
                  alt={curr.creator?.username}
                />
                <AvatarFallback className="bg-gray-900 text-white text-xs">
                  CN
                </AvatarFallback>
              </Avatar>
              <span className="text-sm text-gray-700 font-medium">
                {curr.creator?.username || "Unknown"}
              </span>
            </div>

            <Badge className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
              {curr.courseLevel}
            </Badge>
          </div>

          <div className="text-lg font-bold text-gray-900">
            ₹{curr.price}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default Course;
