import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const auth =async()=>{
    const cookieStore = cookies();
    const data=(await cookieStore).get("token")
    const token = data?.value
const user = token ? jwt.verify(token, process.env.JWT_SECRET as string) : null;
if (user && typeof user !== "string") {
    return { id: user.id, role: user.role };
}
return null;
     
} 
export default auth 