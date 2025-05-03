
"use client"

import { LuSchool } from "react-icons/lu";
import { Button } from "./ui/button";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import LogoutButton from "./logoutButton";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";



type userType={
    id:string,
    role:string
    image:string
  }

  const Navbar = () => {
  const [user,setUser]=useState<userType>()
  const pathname = usePathname();



  useEffect(()=>{
    const fetchUser = async () => {
     const res= await fetch("api/user/authuser")
     const data= await res.json()
     setUser(data);
    
  }
  fetchUser()
  },[pathname])

  
  
  return (
    <nav className=" flex justify-between px-10 md:px-32 py-4 bg-slate-800 border-b border-slate-600 ">
      <div className="flex  gap-4 items-center ">
       <Link href={'/'} > 
        <LuSchool className="text-3xl text-blue-500" />
        </Link>
       <Link href={'/'} > <h1 className=" hidden md:block text-3xl font-bold text-white">
          E-Learning
        </h1></Link>
      </div>
      <div className="flex gap-4 items-center">
        {!user?.id ? (
          <>
            <Link href="/login">
              {" "}
              <Button className="bg-blue-500 text-white hover:bg-blue-600">
                Login
              </Button>
            </Link>
            <Link href="/register">
              {" "}
              <Button  className="bg-blue-500 text-white hover:bg-blue-600">
                Register
              </Button>
            </Link>
          </>
        ) : (
          <div className="flex gap-4 items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="hover:scale-105" >
                  <AvatarImage
                    src={ user?.image ||"https://github.com/shadcn.png"}
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-slate-800 text-white">
 
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                 <Link href={'/my-learning'} > <DropdownMenuItem className="hover:bg-slate-500" >My Learing</DropdownMenuItem></Link>
                 <Link href={'/edit-profile'} > <DropdownMenuItem className="hover:bg-slate-500"  >Edit Profile</DropdownMenuItem></Link>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuSeparator />
                <DropdownMenuSeparator />
                {user?.role === "admin" && (
                  <DropdownMenuItem className="hover:bg-slate-500"  >Dashboard</DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
            <span onClick={() => setUser(undefined)}>
              <LogoutButton  />
            </span>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar