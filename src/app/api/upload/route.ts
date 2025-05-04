import auth from '@/lib/checkAuth';
import UserModel from '@/models/User';
import { v2 as cloudinary } from 'cloudinary';
import { NextResponse,NextRequest } from 'next/server';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request:NextRequest) {
    const userId = await auth()
    if(!userId?.id){
        return NextResponse.json({ error: 'Not authorized' }, { status: 401 });
    }
  const formData = await request.formData();
  const file = formData.get('file');

  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  }

  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'Invalid file type' }, { status: 400 });
  }
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  let public_id;
  let url;
  let resourceType: string | undefined;
  await new Promise((resolve) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'uploads', resource_type: 'auto' },
      (error, result) => {
        if (error) {
         return resolve(NextResponse.json({ error: 'Upload failed', details: error }, { status: 500 }));
        } else {
           public_id=result?.public_id;
           url=result?.secure_url;
           resourceType = result?.resource_type;
          resolve("hello");
        }
      }
    );

    stream.end(buffer);
  });


  const user = await UserModel.findById(userId?.id);


  if (user?.publicId) {
    try {
      await cloudinary.uploader.destroy(user.publicId, {
        resource_type: user.resourceType // "image" or "video"
      });
    } catch (error) {
        if(error instanceof Error){

            console.error('Failed to delete old image:', error.message);
        }
    }
  }


   await UserModel.findByIdAndUpdate(userId?.id, { image: url ,publicId:public_id,resourceType:resourceType },{new:true});
  return   NextResponse.json({ success:true})
}
