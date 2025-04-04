import { CourseCard } from '@/components/courseCard'
import { ScrollArea } from '@/components/ui/scroll-area'
import Link from 'next/link'
import React from 'react'

const AllCourses = () => {
  return (
    <div>
        <div>
            <h1 className='text-4xl lg:text-5xl lg:leading-tight font-semibold mt-5 ml-10 md:mt-0 md:ml-10 -mb-5 text-black'>All Courses</h1>
            <div className='w-full relative'>
              <div className='scroll-fade-wrapper relative'>
                <ScrollArea className="h-[650px] border-none w-full rounded-md border p-4 mt-3">
                  <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 mt-10'>
                    <Link href='/course-description'><CourseCard /></Link>
                  </div>
                </ScrollArea>
                {/* <div className="fade-top absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-white to-transparent pointer-events-none z-10"></div> */}
                {/* <div className="fade-bottom absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-white to-transparent pointer-events-none z-10"></div> */}
              </div>
            </div>
        </div>
    </div>
  )
}

export default AllCourses