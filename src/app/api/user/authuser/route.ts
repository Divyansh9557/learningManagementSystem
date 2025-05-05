
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import UserModel from "@/models/User";

export async function GET() {
    const cookieStore= await cookies()
   const token= cookieStore.get("token")?.value
    if(!token){
        return NextResponse.json({res:null})
    }
    try {
        const userId = jwt.verify(token, process.env.JWT_SECRET as string);
        if (typeof userId === "object" && userId !== null && "id" in userId) {
            const user = await UserModel.findById(userId.id );
        if (typeof user === "object" && user !== null && "id" in user && "role" in user) {
            const res= {
                id:user._id.toString(), 
                role:user.role.toString() ,
                image:user.image.toString(),
                username:user.username.toString(),
                email:user.email.toString(),
            }
            return NextResponse.json({ res },{status:200});
        }
    } 
}catch (error) {
        if(error instanceof Error){

            return NextResponse.json({ error: error.message },{status:401});
        }
    }


}