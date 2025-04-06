"use client"; // Important to add this line

import CourseHeader from "@/components/course-header";
import CourseContent from "@/components/course-content";
import CourseDescription from "@/components/course-description";
import CourseRequirements from "@/components/course-requirements";
import CourseInstructor from "@/components/course-instructor";
import PurchaseCard from "@/components/purchase-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function CoursePage() {
  const [courseData, setCourseData] = useState({});
  const searchParams = useSearchParams();
  const courseId = searchParams.get("courseId");

  const getProductById = async (id: string) => {
    try {
      const response = await fetch(`https://muzik-mgj9.onrender.com/api/courses/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log("Fetched course data", data);
      setCourseData(data); // ✅ Update the state with the fetched data
    } catch (error) {
      console.error("Error fetching product by ID:", error);
    }
  };


  useEffect(() => {
    const id = courseId;
    getProductById(courseId as string); // Pass the courseId as a string
  }, [courseId]);

  return (
    <ScrollArea className="h-[750px] border-none w-full rounded-md border p-4">
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {courseData && <CourseHeader course={courseData} />}

              <div className="mt-8 space-y-8">
                {courseData && <CourseDescription course={courseData} />}
                {courseData && <CourseContent course={courseData} />}
                <CourseRequirements />
                <CourseInstructor />
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-6">
                {courseData && <PurchaseCard course={courseData} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
