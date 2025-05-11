"use client";
import { redirect } from "next/navigation";
// import { redirect } from "next/navigation";
import { Button } from "./ui/button"

import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";


const LogoutButton = () => {
  const [isLoading,setIsLoading]= useState(false)
  const queryClient = useQueryClient()

   const handleLogout = async () => { 
     setIsLoading(true) 
      const res= await fetch("/api/user/logout")
      const data= await res.json()
      if(data.message==="Logout Success"){
        toast.success("Logout Success")
        await queryClient.invalidateQueries({ queryKey: ["authUser"] });

        setTimeout(() => {
          redirect("/");
        }, 100); 
        setIsLoading(false)
      }
   }
   
  return (
    <Button variant='form' disabled={isLoading}  onClick={handleLogout} >
      {isLoading?"Logging out":"Log out"}
    </Button>
  )
}

export default LogoutButton