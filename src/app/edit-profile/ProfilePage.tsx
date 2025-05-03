'use client'

import { getUser, updateUserName } from '@/actions/user.action'
/* eslint-disable @typescript-eslint/no-explicit-any */
import Course from '@/components/home/Course'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { UploadImage } from '@/lib/UploadImage'
import { User } from '@/models/User'
import { Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'



export const ProfilePage = () => {
    const [updateUserIsLoading,setUpdateUserIsLoading]= useState(false)
    const [name, setName] = useState("");
    const [user,setUser]= useState<User>()
    const course=[1,2,3,4,5]
     
  

    useEffect(()=>{
       const getUserData= async()=>{
          const data:any= await getUser()
          setUser(data as User) // cast the object to match the User type
       }
       getUserData()
    },[])
  
    const handleSubmit= async()=>{
      setUpdateUserIsLoading(true);

      try {
        const updatedUser = await updateUserName(name); 
        if ('error' in updatedUser && typeof updatedUser.error === 'string') {
          throw new Error(updatedUser.error);
        }
        setUser(updatedUser as unknown as User || user ); 
      } catch (error) {
        if(error instanceof Error){
          setName("")
          toast.error(error.message)
        }
      } finally {
        setUpdateUserIsLoading(false);
      }
    }
  return (
    <div className="max-w-4xl mx-auto px-4 my-10">
    <h1 className="font-bold text-2xl text-center md:text-left">PROFILE</h1>
    <div className="flex flex-col md:flex-row items-center md:items-start gap-8 my-5">
      <div className="flex flex-col items-center">
        <Avatar className="h-24 w-24 md:h-32 md:w-32 mb-4">
          <AvatarImage src={ user?.image || "https://github.com/shadcn.png"} alt={user?.username} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <div>
        <div className="mb-2">
          <h1 className="font-semibold text-gray-900  ">
            Username:
            <span className="font-normal text-gray-700  ml-2">
             {user?.username}
            </span>
          </h1>
        </div>
        <div className="mb-2">
          <h1 className="font-semibold text-gray-900  ">
            Email:
            <span className="font-normal text-gray-700  ml-2">
              {user?.email}
            </span>
          </h1>
        </div>
        <div className="mb-2">
          <h1 className="font-semibold text-gray-900 ">
            Role:
            <span className="font-normal text-gray-700  ml-2">{user?.role.toUpperCase()}</span>
          </h1>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm" className="mt-2 bg-black text-white ">
              Edit Profile
            </Button>
           
          </DialogTrigger>
          <DialogContent className="bg-slate-700 text-white">
            <DialogHeader>
              <DialogTitle>Edit Profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you&apos;re
                done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label>Name</Label>
                <Input
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="col-span-3"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleSubmit}>
                {updateUserIsLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please
                    wait
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <UploadImage setUser={setUser} />
      </div>
    </div>
    <div>
      <h1 className="font-medium text-lg">Courses you&apos;re enrolled in</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-5">
        {course.length === 0 ? (
          <h1>You haven&apos;t enrolled yet</h1>
        ) : (
          course.map((course) => <Course key={course} />)
        )}
      </div>
    </div>
  </div>
  )
}

