"use client";

import CourseHeader from "@/components/course-header";
import CourseContent from "@/components/course-content";
import CourseDescription from "@/components/course-description";
import CourseRequirements from "@/components/course-requirements";
import CourseInstructor from "@/components/course-instructor";
import PurchaseCard from "@/components/purchase-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";

export default function CoursePageContent() {
  const [courseData, setCourseData] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const courseId = searchParams.get("courseId");

  useEffect(() => {
    const fetchCourseData = async (id: string) => {
      try {
        setLoading(true);
        const response = await axios.get(`https://muzik-mgj9.onrender.com/api/courses/${id}`);
        console.log("Fetched course data", response.data);
        setCourseData(response.data);
      } catch (error) {
        console.error("Error fetching course by ID:", error);
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
      fetchCourseData(courseId);
    }
  }, [courseId]);

  return (
    <ScrollArea className="h-[750px] border-none w-full rounded-md border p-4">
      <div className="min-h-screen bg-white">
        
        {loading ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="h-64 rounded-lg bg-gray-100 animate-pulse"></div>
                <div className="mt-8 space-y-8">
                  <div className="h-32 rounded-lg bg-gray-100 animate-pulse"></div>
                  <div className="h-48 rounded-lg bg-gray-100 animate-pulse"></div>
                  <div className="h-24 rounded-lg bg-gray-100 animate-pulse"></div>
                  <div className="h-32 rounded-lg bg-gray-100 animate-pulse"></div>
                </div>
              </div>
              <div className="lg:col-span-1">
                <div className="lg:sticky lg:top-6">
                  <div className="h-96 rounded-lg bg-gray-100 animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <CourseHeader course={courseData} />
                <div className="mt-8 space-y-8">
                  <CourseDescription course={courseData} />
                  {/* <CourseContent course={courseData} /> */}
                  <CourseRequirements course={courseData} />
                  <CourseInstructor course={courseData} />
                </div>
              </div>
              <div className="lg:col-span-1">
                <div className="lg:sticky lg:top-6">
                  <PurchaseCard course={courseData} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </ScrollArea>
  );
}
