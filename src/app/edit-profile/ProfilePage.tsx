/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { getUser, updateUserName } from '@/actions/user.action'
import { ImageUploader } from '@/components/imageUploader'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import {  useState } from 'react'
import toast from 'react-hot-toast'
import { BuyedCourse } from '../my-learning/BuyedCourse'
import ProfileSkeleton from './loadingSkeleton'

export const ProfilePage = () => {
  const [updateUserIsLoading, setUpdateUserIsLoading] = useState(false)
  const [name, setName] = useState('')
  const queryClient = useQueryClient()

  const { data: user,isLoading } = useQuery({
    queryKey: ['profileUser'],
    queryFn: async () => {
      const data: any = await getUser()
      return data
    }
  })

  

  const handleSubmit = async () => {
    setUpdateUserIsLoading(true)
    try {
      await updateUserName(name)
      queryClient.invalidateQueries({ queryKey: ['profileUser'] })
    } catch (error) {
      if (error instanceof Error) {
        setName('')
        toast.error(error.message)
      }
    } finally {
      setUpdateUserIsLoading(false)
    }
  }
  
  if(isLoading){
    return <ProfileSkeleton/>
  }


  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-center md:text-left mb-8">Profile</h1>

      <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
        <div className="flex flex-col items-center space-y-4">
          <Avatar className="h-28 w-28 md:h-36 md:w-36">
            <AvatarImage src={user?.image || 'https://github.com/shadcn.png'} alt={user?.username} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <ImageUploader />
        </div>

        <div className="flex-1 w-full">
          <div className="space-y-4">
            <p className="text-lg font-medium">
              Username: <span className="font-normal text-gray-700">{user?.username}</span>
            </p>
            <p className="text-lg font-medium">
              Email: <span className="font-normal text-gray-700">{user?.email}</span>
            </p>
            <p className="text-lg font-medium">
              Role: <span className="font-normal text-gray-700">{user?.role?.toUpperCase()}</span>
            </p>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" className="mt-6 bg-black text-white">
                Edit Profile
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-slate-800 text-white">
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you&apos;e done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Name</Label>
                  <Input
                    type="text"
                    name="name"
                    placeholder="Name"
                    className="col-span-3"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleSubmit}>
                  {updateUserIsLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">Courses You&apos;re Enrolled In</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <BuyedCourse />
        </div>
      </div>
    </div>
  )
}
