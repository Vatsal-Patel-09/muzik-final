"use client"

import CourseHeader from "@/components/course-header"
import CourseDescription from "@/components/course-description"
import CourseRequirements from "@/components/course-requirements"
import CourseInstructor from "@/components/course-instructor"
import PurchaseCard from "@/components/purchase-card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import axios from "axios"
import { Skeleton } from "@/components/ui/skeleton"

export default function CoursePageContent() {
  const [courseData, setCourseData] = useState<any>({})
  const [loading, setLoading] = useState(true)
  const searchParams = useSearchParams()
  const courseId = searchParams.get("courseId")

  // Fetch course data from API based on courseId from URL
  useEffect(() => {
    const fetchCourseData = async (id: string) => {
      try {
        setLoading(true)
        // API call to get course details
        const response = await axios.get(`https://muzik-mgj9.onrender.com/api/courses/${id}`)
        setCourseData(response.data)
      } catch (error) {
        console.error("Error fetching course by ID:", error)
      } finally {
        setLoading(false)
      }
    }

    if (courseId) {
      fetchCourseData(courseId)
    }
  }, [courseId])

  return (
    <ScrollArea className="h-[calc(100vh-40px)] border-none w-full rounded-md p-4">
      <div className="min-h-screen bg-white">
        {loading ? (
          // Loading skeleton UI
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Skeleton className="h-12 w-3/4 mb-6" />
                <Skeleton className="h-[400px] w-full rounded-xl mb-8" />
                <div className="mt-8 space-y-8">
                  <div>
                    <Skeleton className="h-8 w-48 mb-4" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      {[...Array(6)].map((_, i) => (
                        <div key={i} className="flex">
                          <Skeleton className="h-5 w-5 mr-3" />
                          <Skeleton className="h-5 w-full" />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Skeleton className="h-8 w-48 mb-4" />
                    <div className="space-y-3">
                      {[...Array(3)].map((_, i) => (
                        <Skeleton key={i} className="h-5 w-full" />
                      ))}
                    </div>
                  </div>
                  <div>
                    <Skeleton className="h-8 w-48 mb-4" />
                    <div className="flex items-start gap-4">
                      <Skeleton className="h-24 w-24 rounded-full" />
                      <div className="flex-1">
                        <Skeleton className="h-6 w-48 mb-2" />
                        <Skeleton className="h-4 w-32 mb-4" />
                        <div className="flex flex-wrap gap-4 mb-4">
                          {[...Array(3)].map((_, i) => (
                            <Skeleton key={i} className="h-5 w-32" />
                          ))}
                        </div>
                        <Skeleton className="h-4 w-full" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-1">
                <div className="lg:sticky lg:top-6">
                  <Skeleton className="h-[500px] w-full rounded-xl" />
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Actual content when data is loaded
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <CourseHeader course={courseData} />
                <div className="mt-8 space-y-8">
                  <CourseDescription course={courseData} />
                  <CourseRequirements course={courseData} />
                  <CourseInstructor course={courseData} />
                </div>
              </div>
              <div className="lg:col-span-1">
                <PurchaseCard course={courseData} />
              </div>
            </div>
          </div>
        )}
      </div>
    </ScrollArea>
  )
}
