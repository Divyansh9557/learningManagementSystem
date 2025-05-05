"use client";
import { redirect } from "next/navigation";
// import { redirect } from "next/navigation";
import { Button } from "./ui/button"

import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";


const LogoutButton = () => {
  const queryClient = useQueryClient()

   const handleLogout = async () => {  
      const res= await fetch("/api/user/logout")
      const data= await res.json()
      if(data.message==="Logout Success"){
        toast.success("Logout Success")
        await queryClient.invalidateQueries({ queryKey: ["authUser"] });

        setTimeout(() => {
          redirect("/");
        }, 100); 
      }
   }
   
  return (
    <Button variant='form'  onClick={handleLogout} >LogOut</Button>
  )
}

export default LogoutButton