
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


  type userType={
    id:string,
    role:string
  }

const Navbar = () => {
  const [user,setUser]=useState<userType>()
  const [isLogin,setIsLogin]=useState(false)


  useEffect(()=>{
    const fetchUser = async () => {
     const res= await fetch("api/user/authuser")
     const data= await res.json()
     setUser(data);
     if(res.ok){
      setIsLogin(true)
    }
  }
  fetchUser()
  },[isLogin])
  console.log(user)

  
  
  return (
    <nav className=" flex justify-between px-10 md:px-32 py-4 bg-slate-800 border-b border-slate-600 ">
      <div className="flex  gap-4 items-center ">
        <LuSchool className="text-3xl text-blue-500" />
        <h1 className=" hidden md:block text-3xl font-bold text-white">
          E-Learning
        </h1>
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
              <Button className="bg-blue-500 text-white hover:bg-blue-600">
                Register
              </Button>
            </Link>
          </>
        ) : (
          <div className="flex gap-4 items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>My Learing</DropdownMenuItem>
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuSeparator />
                <DropdownMenuSeparator />
                {user?.role === "admin" && (
                  <DropdownMenuItem>Dashboard</DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
            <span onClick={() => setIsLogin(false)}>
              <LogoutButton />
            </span>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar