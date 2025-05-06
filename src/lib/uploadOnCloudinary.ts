/* eslint-disable @typescript-eslint/no-explicit-any */
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnClodinary= async(file:any)=>{

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
             return resolve({error:"failed to upload"});
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
      return {public_id,url,resourceType}
}
export default uploadOnClodinary