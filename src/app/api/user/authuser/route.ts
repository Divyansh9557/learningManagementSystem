/* eslint-disable @typescript-eslint/no-explicit-any */
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken"

export async function GET() {
    const cookieStore= await cookies()
   const token= cookieStore.get("token")?.value
    if(!token){
        return NextResponse.json({message:"token not found"})
    }
    const user = jwt.verify(token, process.env.JWT_SECRET as string);

    if (typeof user === "object" && user !== null && "id" in user && "role" in user) {
        return NextResponse.json({ id: user.id, role: user.role });
    }

    return NextResponse.json({ message: "Invalid token payload" });
}