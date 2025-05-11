"use client";
/* eslint-disable react-hooks/exhaustive-deps */

import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { fetchCourses } from "@/actions/course.action";
import { ICourse } from "@/models/Course";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import CourseSkeleton from "./courseskeleton";

export default function CourseFilterPageUI() {
  const [category, setCategory] = useState<string[]>([]);
  const [order, setOrder] = useState("");
  const [input, setInput] = useState("");
  const [filtersReady, setFiltersReady] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();

  // React Query mutation
  const {
    data: courseData,
    mutate,
    isPending,
  } = useMutation({
    mutationFn: async () => {
      return await fetchCourses({
        search: input || "",
        order: order || "",
        category: category || [],
      });
    },
  });

  // 1. Initialize state from URL
  useEffect(() => {
    const initialOrder = searchParams.get("order") || "";
    const initialSearch = searchParams.get("search") || "";
    const initialCategory = searchParams.get("category")?.split(",") || [];

    setOrder(initialOrder);
    setInput(initialSearch);
    setCategory(initialCategory);
    setFiltersReady(true); // Ready to fetch now
  }, []);

  // 2. Fetch data when filters are ready or changed
  useEffect(() => {
    if (!filtersReady) return;

    const params = new URLSearchParams();
    if (input) params.set("search", input);
    if (order) params.set("order", order);
    if (category.length > 0) params.set("category", category.join(","));

    router.push(`?${params.toString()}`);
    mutate();
  }, [filtersReady, order, category, input]);

  // User updates input
  const handleInputSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(); // Trigger fetch manually on search
  };

  const handleRemoveSuggestion = () => {
    setInput("");
    mutate();
  };

  const handleCategory = (e: boolean | string , val: string) => {
    if (e) setCategory((prev) => [...prev, val]);
    else setCategory((prev) => prev.filter((c) => c !== val));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-4 gap-8">
      {/* Sidebar Filters */}
      <aside className="space-y-6">
        <div className="font-semibold text-lg">Filter Options</div>

        <Select onValueChange={setOrder} value={order}>
          <SelectTrigger className="w-full">Sort by</SelectTrigger>
          <SelectContent>
            <SelectItem value="increasing">Increasing</SelectItem>
            <SelectItem value="decreasing">Decreasing</SelectItem>
          </SelectContent>
        </Select>

        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-600">CATEGORY</p>
          {[
            "Next JS",
            "Data Science",
            "Frontend Development",
            "Fullstack Development",
            "MERN Stack Development",
            "Backend Development",
            "Javascript",
            "Python",
            "Docker",
            "MongoDB",
            "HTML",
          ].map((cat) => (
            <div key={cat} className="flex items-center space-x-2">
              <Checkbox
                id={cat}
                onCheckedChange={(check) => handleCategory(check, cat)}
                checked={category.includes(cat)}
              />
              <label htmlFor={cat} className="text-sm">
                {cat}
              </label>
            </div>
          ))}
        </div>
      </aside>

      {/* Main Course Display */}
      <main className="md:col-span-3 space-y-6">
        <form onSubmit={handleInputSubmit} className="flex gap-3 mb-4">
          <Input
            placeholder="Search for courses..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full"
          />
          <Button
            type="submit"
            className="bg-black text-white hover:bg-slate-400"
          >
            Search
          </Button>
        </form>

        {isPending ? (
          <CourseSkeleton/>
        ) : courseData?.length > 0 ? (
          <div className="space-y-4">
            {courseData.map((curr: ICourse) => (
              <Link href={`/course-details/${curr._id}`} key={curr._id}>
                <Card className="flex flex-col md:flex-row items-center md:items-start gap-6 p-4 shadow-lg rounded-2xl border border-gray-200">
                  <Image
                    src={curr?.thumbnail}
                    alt={curr?.title}
                    width={160}
                    height={100}
                    className="w-[160px] h-[100px] object-cover rounded-md shrink-0"
                  />
                  <CardContent className="p-0 w-full space-y-2">
                    <h3 className="text-xl font-semibold text-gray-800">
                      {curr?.title}
                    </h3>
                    <p className="text-sm text-gray-600">{curr?.subtitle}</p>
                    <p className="text-sm text-gray-600">
                      Instructor:{" "}
                      <span className="font-medium text-black">
                        {curr?.creator?.username}
                      </span>
                    </p>
                    <Badge variant="secondary" className="w-fit mt-1">
                      {curr?.courseLevel}
                    </Badge>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center space-y-4">
            <div className="text-gray-500">No courses found</div>
            <Button
              onClick={handleRemoveSuggestion}
              className="bg-black text-white"
            >
              Get All Courses
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
