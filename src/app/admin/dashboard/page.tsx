'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPurchasedCourse } from "@/actions/coursePurchase";
import { useQuery } from "@tanstack/react-query";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ICourse } from "@/models/Course";
import SkeletonPage from "./Skeleton";

 

const AdminDashboard = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["adminDashboard"],
    queryFn: async () => {
      const res = await getPurchasedCourse();
      return res;
    },
  });

  const courseData = data?.course.map((c: ICourse) => ({
    name: c.title,
    price: c.price,
  }));

  if(isLoading){
    return <SkeletonPage/>
  }

  return (
   
    <div className="p-4 md:p-6 w-full ">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card className="shadow-md  hover:shadow-xl transition-shadow duration-300 rounded-2xl">
          <CardHeader>
            <CardTitle className="text-lg text-gray-700">Total Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-blue-600">
              {data?.course.length || "0"}
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-md hover:shadow-xl transition-shadow duration-300 rounded-2xl">
          <CardHeader>
            <CardTitle className="text-lg text-gray-700">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-green-600">
              ₹{data?.sum || "0"}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-md hover:shadow-xl transition-shadow duration-300 rounded-2xl">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-700">
            Course Prices Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full h-[300px] sm:h-[400px] md:h-[450px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={courseData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis
                  dataKey="name"
                  stroke="#6b7280"
                  angle={-30}
                  textAnchor="end"
                  interval={0}
                />
                <YAxis stroke="#6b7280" />
                <Tooltip formatter={(value, name) => [`₹${value}`, name]} />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#4a90e2"
                  strokeWidth={3}
                  dot={{ stroke: "#4a90e2", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
