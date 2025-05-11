import React from 'react';
import Input from './input';
import { Sparkles } from 'lucide-react'; // optional: any icon set
import Link from 'next/link';

const Hero = () => {
  return (
    <div className="relative w-full h-[38rem] bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 overflow-hidden">
      {/* Background Pattern Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff33_1px,transparent_1px)] bg-[size:20px_20px] opacity-20 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center text-white max-w-3xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight drop-shadow">
          Find the <span className="text-yellow-300">Best Courses</span> to Upskill
        </h1>
        <p className="mt-4 text-lg sm:text-xl text-gray-100 max-w-xl">
          Learn from industry experts and get certified. Explore tech, design, business, and more.
        </p>

        <div className="w-full mt-6 max-w-xl">
          <Input />
        </div>

        <Link href={'/course'} className="mt-6 px-6 py-3 rounded-full bg-yellow-400 text-black font-semibold hover:bg-yellow-500 transition duration-200 shadow-lg">
          Explore Courses
        </Link>

        {/* Stats / Trust Bar */}
        <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-white/80">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-yellow-300" />
            10K+ Learners
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-yellow-300" />
            500+ Certified Courses
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-yellow-300" />
            Trusted by 100+ Companies
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
