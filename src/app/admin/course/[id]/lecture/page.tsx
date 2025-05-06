'use client'
import { createLecture, getLecture } from "@/actions/course.action";
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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaRegEdit } from "react-icons/fa";

const AdminLecture = () => {
   const { id } = useParams() as { id: string };

   const [title,setTitle]= useState<string | undefined >()
   const queryClient = useQueryClient()
    
   const {mutate:createLectureFunction,isPending,error} = useMutation({
     mutationFn:async({title,id}:{title:string,id:string})=>{
           const data=  await createLecture(title,id)
             return data
     },
     onSuccess:()=>{
         toast.success("lecture created successfully")
         queryClient.invalidateQueries({queryKey:["lectures"]})
     },
     onError:(err)=>{
         toast.error(err.message)
         setTitle(undefined)
     }
   })
   
   const {data:lectures,isLoading}= useQuery({
    queryKey:["lectures"],
    queryFn:async()=>{
         const data= await getLecture(id)
         return data
    }
   })

   if(error){
     toast.error(error.message)
   }
   console.log(lectures)

  const handleSubmit = ()=>{
    if(title){
      createLectureFunction({title,id})
    }
    queryClient.invalidateQueries({queryKey:['lectures']})
  }
  

  return (
    <Card className="w-full overflow-y-auto h-[90.5vh] p-5 border-none ">
      <CardHeader>
        <CardTitle>
          Let&apos;s add lecture,addsome basic details for your new lectures
        </CardTitle>
        <CardDescription>
          make the lecture to attract the students{" "}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-5">
        <div className="space-y-2">
          <Label>Title</Label>
          <Input type="text" onChange={(e)=> setTitle(e.target.value)} placeholder="Enter the title" />
        </div>
        <div className="flex gap-5 ">
          <Link href={`/admin/course/${id}`} ><Button variant={"outline"}>Back to course</Button></Link>
          <Button onClick={handleSubmit} className="bg-black text-white">
            {
              isPending?"Creating...":"Create"
            }
          </Button>
        </div>

       {
        isLoading?"Loading...":(
          lectures?.lecture?.map((lec,index:number)=>(
            <div key={index} >
            <div className="flex w-full justify-between border border-black px-5 py-3 items-center rounded-2xl bg-amber-100-50  " >
  
             <div>     Lecture-{index+1}: {lec.lectureTitle} </div>
              
              <div>
                <Link href={`/admin/course/${id}/lecture/${lec._id}`} >
                <Button className=" bg-black text-white  ">
                  <FaRegEdit />
                </Button>
                </Link>
              </div>
            </div>
          
          </div>
          ))
        )
       }
        
      </CardContent>
    </Card>
  );
};

export default AdminLecture;
