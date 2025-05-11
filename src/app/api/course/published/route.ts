import connectDB from "@/lib/connectDB";
import Course from "@/models/Course";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectDB();

        const courses = await Course.find({ isPublished: true }).populate("creator") || [];

        // Shuffle the array
        const shuffled = courses.sort(() => 0.5 - Math.random());

        // Select up to 4
        const selected = shuffled.slice(0, 4);

        return NextResponse.json({ course: selected });
    } catch (error) {
        if(error instanceof Error){

            return NextResponse.json({ error: error.message });
        }
    }
}
