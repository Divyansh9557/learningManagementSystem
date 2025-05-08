'use client'
import { IoArrowBackSharp } from "react-icons/io5";
import { useParams, useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import Link from "next/link";
import { ChangeEvent, useState } from "react";
import { removeLecture, updateLecture } from "@/actions/course.action";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

const UpdateLecturePage = () => {
    const [isFree,setIsfree]= useState(false)
    const [title,setTitle]= useState<string>()
    const [video,setVideo]= useState<File | null>()
    const { lectureId,id } = useParams();
    const router= useRouter()

    const handleVideo= (e:ChangeEvent<HTMLInputElement>)=>{
         const videoFile = e.target.files?.[0]
         setVideo(videoFile)
    }


   const {mutate:handleFormSubmit,isPending}= useMutation({
    mutationFn:async()=>{
      if(!video){
        throw new Error("Video is required")
      }
      const formData = new FormData()
      formData.append("title", title || "")
      formData.append("video",video || "")
      formData.append("isFree", isFree.toString())
      formData.append("lectureId", lectureId?.toString() || "")
     const data= await updateLecture(formData)
     if (typeof data === "object" && data?.error) {
       throw new Error(data.message)
     }
     return data
    },
      onSuccess:()=>{
        toast.success("Lecture Updated Successfully");
        router.push(`/admin/course/${id}/lecture`)
      },
      onError:(error)=>{
        toast.error(error.message)
        router.push(`/admin/course/${id}/lecture`)
      }

   })

   const { isPending: isDeleting, mutate: handleDelete } = useMutation({
     mutationFn: async () => {
       const res = await removeLecture(lectureId as string);
       if (res?.success) {
         return res;
       }
       throw new Error(res?.message);
     },
     onSuccess: () => {
       toast.success("Lecture Deleted Successfully");
       router.push(`/admin/course/${id}/lecture`);
     },
     onError: (error) => {
       toast.error(error.message);
     },
   });

 
   

  return (
    <div className="w-full">
      <div className="w-full mt-10 ">
        <CardHeader>
          <div className="flex gap-8  items-center h-fit ">
            <Link href={`/admin/course/${id}/lecture`}>
              {" "}
              <IoArrowBackSharp className="text-2xl  " />
            </Link>
            <h1 className="text-2xl font-bold">Update Your Lecture</h1>
          </div>
        </CardHeader>
        <Card className="mx-6 mt-8 ">
          <CardContent className="space-y-3   ">
            <CardHeader className="text-2xl font-bold ">
              Edit Lecture
            </CardHeader>
            <CardDescription className="ml-6">
              Save Changes and , save when done
            </CardDescription>
            <Button onClick={()=> handleDelete()} className="bg-red-400 ml-6 text-white ">
             {
              isDeleting?"Deleting...":"Remove Lecture"
             }
            </Button>
            <div className="space-y-3">
              <Label>Title</Label>
              <Input
                required
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                placeholder="enter the title for lecture"
              />
            </div>
            <div className="space-y-3">
              <Label>Video</Label>
              <Input
                className="w-[300px]"
                required
                onChange={handleVideo}
                type="file"
                accept="video/*"
              />
            </div>
            <div className="flex items-center space-x-3">
              <Switch
                onCheckedChange={(checked) => setIsfree(checked)}
                className="bg-black"
                id="airplane-mode"
              />
              <Label htmlFor="airplane-mode">Is this video free?</Label>
            </div>

            <Button onClick={()=>handleFormSubmit()} className="bg-gray-400 mt-2 ml-6 text-white">
              {
                isPending?"Updating...":" Update Course "
              }
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default UpdateLecturePage