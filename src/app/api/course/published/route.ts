import connectDB from "@/lib/connectDB";
import Course from "@/models/Course";
import { NextResponse } from "next/server";

export async function GET(){
    try {
        await connectDB()
        const course= await Course.find({isPublished:true}).populate("creator") || []
        return NextResponse.json({course})
    } catch (error) {
        return NextResponse.json({error})
    }
}