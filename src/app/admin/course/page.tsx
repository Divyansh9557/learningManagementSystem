/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getCreatorPost } from "@/actions/course.action";
import { FaRegEdit } from "react-icons/fa";

const AdminCourse = async () => {
  const data: any = await getCreatorPost() || [] ;
  
  const courses = Array.isArray(data) ? data : [];

  return (
    <div className=" px-5 p-15 md:px-20 md:py-15 w-full">
      <Link href={"/admin/course/create"}>
        <Button className="bg-black text-white">Create New Course</Button>
      </Link>
      <Table>
        <TableCaption>A list of your recent Course.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">{"title"}</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses?.map((course: any) => (
            <TableRow key={course._id}>
              <TableCell className="font-medium">{course.title}</TableCell>
              <TableCell>{course.price ? `₹${course.price}` : "₹0"}</TableCell>
              <TableCell>
                {course.isPublished ? (
                  <p className="px-1 w-20 text-center rounded-2xl py-2 bg-green-400 text-white">
                    published
                  </p>
                ) : (
                  <p className="px-1 w-24 text-center rounded-2xl py-2 bg-red-400 text-white">
                    {" "}
                    Draft
                  </p>
                )}
              </TableCell>
              <TableCell className="text-right">
                <Link href={`/admin/course/${course._id}`}>
                  <Button className=" bg-black text-white  ">
                    <FaRegEdit />
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
       
      </Table>
    </div>
  );
};

export default AdminCourse;
