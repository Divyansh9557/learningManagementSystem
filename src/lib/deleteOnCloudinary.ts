import { v2 as cloudinary } from 'cloudinary';

const deleteOnCloudinary = async(publicId:string,resourceType:string) => {
    try {
         await cloudinary.uploader.destroy(publicId, {
           resource_type: resourceType // "image" or "video"
         });
       } catch (error) {
           if(error instanceof Error){
   
               console.error('Failed to delete old image:', error.message);
           }
       }
}

export default deleteOnCloudinary