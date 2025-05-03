import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const genertateToken = async(id: string,role:string,image:string) => {
     const token = jwt.sign({ id,role,image }, process.env.JWT_SECRET as string, { expiresIn: '60d' });
    const cookieStore = await cookies();

    cookieStore.set("token", token, {
        httpOnly: true,
    });
}
export default genertateToken