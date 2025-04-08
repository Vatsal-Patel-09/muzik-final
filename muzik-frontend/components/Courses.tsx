"use client";

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CourseCard } from "./courseCard"
import { useEffect, useState } from "react"
import axios from "axios"

export default function Courses() {
  const [featuredCourses, setFeaturedCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedCourses = async () => {
      try {
        setLoading(true);
        const response = await axios.get("https://muzik-mgj9.onrender.com/api/courses");
        // Get the first 3 courses (or fewer if less than 3 are available)
        const coursesToShow = response.data.slice(0, 3);
        setFeaturedCourses(coursesToShow);
      } catch (error) {
        console.error("Error fetching featured courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedCourses();
  }, []);

  return (
    <section id="courses" className="py-10 border-t-2 border-gray md:mx-28 mx-4 mt-10">
      <div className="flex justify-center items-center flex-col container mx-auto px-6 w-full">
        <h2 className="text-3xl lg:text-5xl lg:leading-tight font-semibold text-center mb-5 mt-5 text-black">Explore our courses</h2>
        <p className="text-center text-gray-800 mb-8 max-w-2xl mx-auto">
          Unlock Your Musical Potential with Our Expert-Curated Courses
          <br />
          Discover a range of courses tailored for beginners and professionals alike. Whether you're looking to enhance your production skills, learn the nuances of mixing and mastering, or dive into film scoring, we have the right course for you!
        </p>
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="h-64 rounded-xl bg-gray-100 animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
            {featuredCourses.map((course: any) => (
              <Link 
                key={course._id} 
                href={`/course-description?courseId=${course._id}`}
                className="transition-transform hover:scale-[1.02] duration-200"
              >
                <CourseCard course={course} />
              </Link>
            ))}
          </div>
        )}
      </div>
      
      <div className="text-center mt-10">
        <Link href='/all-courses'>
          <Button className="rounded-full text-md">Explore More</Button> 
        </Link>
      </div>
    </section>
  )
}

