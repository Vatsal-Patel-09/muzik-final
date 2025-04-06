import { Button } from "@/components/ui/button"
// import Image from "next/image"
import Link from "next/link"
import { CourseCard } from "./courseCard"
// import CourseCard from "./courseCard"

export default function Courses() {
  return (
    <section id="courses" className="py-10 border-t-2 border-gray md:mx-28 mx-4 mt-10">
      <div className="flex justify-center items-center flex-col container mx-auto px-6 w-full">
        <h2 className="text-3xl lg:text-5xl lg:leading-tight font-semibold text-center mb-5 mt-5 text-black">Explore our courses</h2>
        <p className="text-center text-gray-800 mb-3 max-w-2xl mx-auto">
        Unlock Your Musical Potential with Our Expert-Curated Courses
        <br />
        Discover a range of courses tailored for beginners and professionals alike. Whether you're looking to enhance your production skills, learn the nuances of mixing and mastering, or dive into film scoring, we have the right course for you!
        </p>
        <div className="flex flex-col md:flex-row gap-8 mt-3">
          <div className="flex items-center justify-center"><Link href="/all-courses"><CourseCard /></Link></div>
          {/* <div className="flex items-center justify-center"><CourseCard /></div> */}
        </div>
      </div>
      <div className="text-center ">
        <Link href='/all-courses'>
          <Button className="rounded-full text-md">Explore More</Button> 
        </Link>
      </div>
    </section>
  )
}

