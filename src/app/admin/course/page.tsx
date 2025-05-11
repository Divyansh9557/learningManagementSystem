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
  const data: any = await getCreatorPost() || [];
  const courses = Array.isArray(data) ? data : [];

  return (
    <div className="w-full px-4 sm:px-6 lg:px-20 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Your Courses</h2>
        <Link href="/admin/course/create">
          <Button className="bg-black text-white hover:bg-gray-900">
            Create New Course
          </Button>
        </Link>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-md">
        <Table>
          <TableCaption className="text-sm text-gray-500">
            A list of your recent courses.
          </TableCaption>
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead className="min-w-[150px] text-gray-700">Title</TableHead>
              <TableHead className="min-w-[100px] text-gray-700">Price</TableHead>
              <TableHead className="min-w-[120px] text-gray-700">Status</TableHead>
              <TableHead className="text-right text-gray-700">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courses.map((course: any) => (
              <TableRow key={course._id}>
                <TableCell className="font-medium">{course.title}</TableCell>
                <TableCell>{course.price ? `₹${course.price}` : "₹0"}</TableCell>
                <TableCell>
                  {course.isPublished ? (
                    <span className="inline-block px-3 py-1 text-xs font-semibold text-white bg-green-500 rounded-full">
                      Published
                    </span>
                  ) : (
                    <span className="inline-block px-3 py-1 text-xs font-semibold text-white bg-red-500 rounded-full">
                      Draft
                    </span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <Link href={`/admin/course/${course._id}`}>
                    <Button
                      size="sm"
                      className="bg-black text-white hover:bg-gray-800"
                      aria-label="Edit Course"
                    >
                      <FaRegEdit />
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminCourse;
