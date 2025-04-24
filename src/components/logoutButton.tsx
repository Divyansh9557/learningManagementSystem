"use client";
import { redirect } from "next/navigation";
import { Button } from "./ui/button"

import toast from "react-hot-toast";


const LogoutButton = () => {

   const handleLogout = async () => {  
      const res= await fetch("/api/user")
      const data= await res.json()
      if(data.message==="Logout Success"){
        toast.success("Logout Success")
        redirect("/login")
      }
   } 
   
  return (
    <Button variant='outline'  onClick={handleLogout} >LogOut</Button>
  )
}

export default LogoutButton