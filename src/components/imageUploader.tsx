'use client';


import { useState } from 'react';
import toast from 'react-hot-toast';
import { useQueryClient } from "@tanstack/react-query";

export  function ImageUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading,setIsuploading]= useState(false)
  const queryClient = useQueryClient();

  const handleUpload = async () => {
    const formData = new FormData();
    if (file) {
      formData.append('file', file);
    } else {
      alert('No file selected');
      return;
    }
    setIsuploading(true)

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    if (data.success) {
       await queryClient.invalidateQueries({ queryKey: ["authUser"] });
       await queryClient.invalidateQueries({ queryKey: ["profileUser"] });
      toast.success("image uploaded")
      
    } else {
        alert('Upload failed');
    }
    setFile(null)
    setIsuploading(false)
  };

  return (
    <div className="space-y-4 ">
      <p className='font-bold' >Update profile Image:</p>
      <input
        type="file"
        accept="image/*,video/*"
        className='border border-amber-800 px-5 py-2 rounded-3xl mr-4'
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
          }
        }}
      />
      <button
        onClick={handleUpload}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        {isUploading?"Uploading...":"upload"}
      </button>

     
    </div>
  );
}
