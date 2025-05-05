import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react'
import CourseTab from './courseTab';


const IndivisualCourse = async({params}:{params:Promise<{id:string}>}) => {
    const {id} = await params
  return (
    <div className='flex-1 h-[90vh] overflow-y-auto pb-20' >
      <div className=' flex justify-between w-full mt-10  px-10 ' >
        <h1 className=' text-sm md:text-2xl font-bold ' >Add detail informations regarding course </h1>
        <Link href={`/admin/course/${id}/lecture`} ><Button variant={"link"} >Go to lecture page {'->'} </Button></Link>
      </div>
      <CourseTab id={id} />
    </div>
  );
}

export default IndivisualCourse