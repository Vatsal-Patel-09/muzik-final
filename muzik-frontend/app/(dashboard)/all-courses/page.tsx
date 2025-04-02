import { CourseCard } from '@/components/courseCard'
import React from 'react'

const AllCourses = () => {
  return (
    <div>
        <div>
            <h1 className='text-[34px] font-bold bg-black text-white'>AllCourses</h1>
            <div className='flex flex-row '>
              <CourseCard />
              <CourseCard />
              <CourseCard />
            </div>
        </div>

    </div>
  )
}

export default AllCourses