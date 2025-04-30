
import React from 'react'

const Hero = () => {
  return (
    <div className="w-full h-[35rem]   grid items-center bg-gradient-to-r from-blue-500 to-purple-500">
 
      <div className="flex flex-col items-center px-5 text-center justify-center h-full text-white">
        <h1 className="text-5xl font-bold">Find The Best Course For You </h1>
        <p className="mt-4 text-lg">
          Discover and upskill with our wide scale of courses.
        </p>
        <form className="flex mt-5 ">
          <input
            type="text"
            className="w-full p-2  border-gray-300 rounded rounded-l-3xl bg-white text-black border-2  "
            placeholder="Search for a course"
          />
          <button className=" px-4 py-2 bg-blue-600 rounded hover:bg-blue-700">
            Search
          </button>
        </form>
        <button className="mt-6 px-6 py-2 rounded-2xl bg-blue-600  hover:bg-blue-700">
          Explore Courses
        </button>
      </div>
      
    </div>
  );
}

export default Hero