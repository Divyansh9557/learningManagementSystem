'use client'

import { useRouter } from "next/navigation"
import { useState } from "react"

const Input = () => {
    const router= useRouter()
    const [search, setSearch] = useState<string>('')
    const handleSubmit =(e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
         router.push(`/course?search=${search}`)
    }
  return (
   
    <form onSubmit={handleSubmit} className="flex mt-5 ">
      <input
        type="text"
        className="w-full p-2  border-gray-300 rounded rounded-l-3xl bg-white text-black border-2  "
        placeholder="Search for a course"
        onChange={(e) => setSearch(e.target.value)}
      />
      <button
        type="submit"
        className=" px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
      >
        Search
      </button>
    </form>
    
  );
}

export default Input