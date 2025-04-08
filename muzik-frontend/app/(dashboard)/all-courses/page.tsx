"use client";

import { CourseCard } from "@/components/courseCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const AllCourses = () => {
  const router = useRouter();
  const [storeCoursesData, setStoreCoursesData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllCourses = async () => {
    try {
      setLoading(true);
      const response = await axios.get("https://muzik-mgj9.onrender.com/api/courses");
      setStoreCoursesData(response.data);
      console.log("All courses", response.data);
    } catch (error) {
      console.error("Error fetching all courses", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllCourses();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl lg:text-5xl lg:leading-tight font-semibold mb-8 text-black">
        All Courses
      </h1>
      
      <div className="w-full relative">
        <ScrollArea className="h-[650px] w-full">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <div 
                  key={index} 
                  className="rounded-xl animate-pulse bg-gray-100 h-72"
                ></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {storeCoursesData?.map((course: any) => (
                <div key={course._id} className="mb-2">
                  <Link
                    href={`/course-description?courseId=${course._id}`}
                  >
                    <CourseCard course={course} />
                  </Link>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </div>
    </div>
  );
};

export default AllCourses;
