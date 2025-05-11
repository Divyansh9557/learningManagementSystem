/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { deletecourse, getCourseBYId, publishCourse, UpdateCourse } from "@/actions/course.action";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const CourseTab = ({id}:{id:string}) => {
  const [image, setImage] = useState<string | null>(null);
  const [uploadImage, setUploadImage] = useState<File | null>(null);
  const [isLoading,setIsLoading]= useState(false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [courseData,setCourseData]= useState()
  const [isImageLoading,setImageIsLoading]= useState(false)
  const [isPublished,setIsPublished]= useState(false)
  const router = useRouter()
 

   useEffect(()=>{
      const getCourse= async()=>{
        const res:any= await getCourseBYId(id)
        if (!res && 'title' in res && typeof res.title === 'string') {
          toast.error("invalid course");
          return 
        }
          setIsPublished(res.isPublished)
          setCourseData(res)
      }
      getCourse()
   },[id])

  


  
  const {
    register,
    handleSubmit,
    setValue,
  } = useForm();

  const onSubmit =async (data: any) => {
    setIsLoading(true)
     const formData= new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("category", data.category);
    formData.append("level", data.level);
    formData.append("subtitle",data.subtitle)
    formData.append("id",id)
     const res=await UpdateCourse(formData)
     if(res.success){
      toast.success("Course updated successfully");
     }
     setIsLoading(false)
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setUploadImage(file)
      setValue("thumbnail", file);
    }
  };


const  handleImageUpload = async(e:any)=>{
  e.preventDefault()
   if(!image){
    toast.error("select a image first");
   }
   setImageIsLoading(true)
   const formData = new FormData();
   
     if (uploadImage) {
       formData.append('file', uploadImage);
       formData.append('id', id);
   } else {
     alert('No file selected');
     return;
   }

   const res = await fetch('/api/upload/course', {
     method: 'POST',
     body: formData,
   });

   const data = await res.json();
   if (data.success) {
     toast.success("image uploaded")
     
   } else {
       alert('Upload failed');
   }
   setImageIsLoading(false)
   setImage(null)
}


const {mutate:handleDeleteCourse,isPending}= useMutation({
    mutationFn:async(e:React.MouseEvent<HTMLButtonElement>)=>{
      e.preventDefault()
     
       const res= await deletecourse(id)
       return res
    },
    onSuccess:()=>{
      toast.success("course deleted succesfully")
    router.push("/admin/course")
    }
})

const {mutate:handlePublishCourse,isPending:isPublishing}= useMutation({
  mutationFn:async(e:React.MouseEvent<HTMLButtonElement>)=>{
    e.preventDefault()
    const res= await publishCourse(id)
    if(res?.success){
      return res
    }
    if(res?.error){
      throw new Error(res.message)
    }
  },
  onError:(err)=>{
    toast.error(err.message);
  },
  onSuccess:()=>{
    if(isPublished){

      toast.success("course Unpublished succesfully")
    }
    else{

      toast.success("course published succesfully")
    }
    setIsPublished(!isPublished)
  }
})

  return (
   
      <Card className="mx-5 mt-5">
        <CardHeader className="flex-col-reverse md:flex-row flex justify-between px-8">
          <div>
            <CardTitle>Basic course Information</CardTitle>
            <CardDescription>Make changes to your courses here</CardDescription>
          </div>
          <div className="flex gap-4">
            <Button onClick={(e)=>handlePublishCourse(e)} variant="outline">
              {isPublished ? "Unpublish" : isPublishing? "Publishing":"Publish"}
            </Button>

          <Button className="bg-red-400 text-white" >
          <Dialog >
  <DialogTrigger  >Delete</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you absolutely sure?</DialogTitle>
      <DialogDescription>
        This action cannot be undone. This will permanently course your account
        and remove your data from our servers.

      </DialogDescription>
      <Button onClick={(e)=>handleDeleteCourse(e)} className="bg-red-400 w-32  text-white">
              {
                isPending?"Deleting":"Remove Course"
              }
            </Button>
    </DialogHeader>
  </DialogContent>
</Dialog>
          </Button>
           
          </div>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <div className="space-y-5 mt-5">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input {...register("title")} placeholder="Enter the title for course" />
            </div>

            <div className="space-y-2">
              <Label>Sub-Title</Label>
              <Input {...register("subtitle")}  placeholder="Enter the sub-title for course" />
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Input {...register("description")} placeholder="Enter the description" />
            </div>

            <div className="gap-5 flex-col md:flex-row flex justify-around">
              <div className="space-y-2">
                <Label>Category</Label>
                <Select required onValueChange={(value) => setValue("category", value)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Category</SelectLabel>
                      {["Next JS", "Data Science", "Frontend Development", "Fullstack Development", "MERN Stack Development", "Javascript", "Python", "Docker", "MongoDB", "HTML"].map((item) => (
                        <SelectItem key={item} value={item}>{item}</SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Course Level</Label>
                <Select required onValueChange={(value) => setValue("level", value)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="Beginner">Beginner</SelectItem>
                      <SelectItem value="Intermediate">Intermediate</SelectItem>
                      <SelectItem value="Advanced">Advanced</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Price (INR)</Label>
                <Input {...register("price")} placeholder="100" type="number" />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Course Thumbnail</Label>
              <div className="flex gap-6 " >
              <Input
                type="file"
                accept="image/*"
                className="w-[300px]"
                onChange={handleImage}
              />
              <Button disabled={isImageLoading} onClick={handleImageUpload} className="bg-black text-white" >
                {
                  isImageLoading?"Uploading...":"upload"
                }
              </Button>
              </div>
              {image && (
                <div>
                  <Image src={image} alt="Course Thumbnail" width={300} height={300} />
                </div>
              )}
            </div>

            <div className="flex gap-5">
              <Link href="/admin/course">
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </Link>
              <Button disabled={isLoading} type="submit" className="bg-black text-white">
                {isLoading ? "Updating..." : "Save"}
              </Button>
            </div>
          </div>
        </CardContent>
    </form>
      </Card>
  );
};

export default CourseTab;
