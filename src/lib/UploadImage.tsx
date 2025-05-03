/* eslint-disable @typescript-eslint/no-explicit-any */

'use client'

import { imageUpdate } from '@/actions/imageUpdate';
import { Button } from '@/components/ui/button';
import { CldUploadWidget } from 'next-cloudinary'

export const UploadImage = ({setUser}:any) => {
  return (
    <CldUploadWidget
      uploadPreset="learning management system"
      options={{
        sources: ["local", "url", "camera"],
        resourceType: "image", // Ensures only image files are accepted
        clientAllowedFormats: ["jpg", "jpeg", "png", "gif", "webp"],
        maxFileSize: 5000000, // optional: limit size to 5MB
      }}
      onSuccess={async({  info }) => {
          if (typeof info !== 'string' && info?.public_id && info?.secure_url) {
           const user= await imageUpdate(info.secure_url,info.public_id)
            setUser(user)
           
          }
      }}
    >
      {({ open }) =>  <Button className='bg-black text-white p-2 py-1.5 ml-5 ' onClick={() => open()} >Upload Image</Button>}
    </CldUploadWidget>
  );
}
