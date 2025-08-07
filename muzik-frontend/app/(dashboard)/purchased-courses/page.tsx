"use client";
import { CourseCard } from "@/components/courseCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const page = () => {
  const [storeCoursesData, setStoreCoursesData] = React.useState([]);
  const [storePurchasedCourse, setStorePurchasedCourse] = useState([]);
  const fetchAllCourses = async ({ email }: { email: string }) => {
    try {
      const response = await fetch("https://muzik-mgj9.onrender.com/api/courses", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      setStoreCoursesData(data);
      console.log("All courses", data);
    } catch (error) {
      console.error("Error fetching all courses", error);
    }
  };

  const fetchPurchasedAllCourses = async () => {
    try {
      const response = await fetch(
        "https://muzik-mgj9.onrender.com/api/purchases/my-courses",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();
      setStorePurchasedCourse(data?.courses);
    } catch (error) {
      console.error("Error fetching all courses", error);
    }
  };

  const fetchLoggedInUser = async () => {
    try {
      const response = await fetch("https://muzik-mgj9.onrender.com/api/user/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      // localStorage.setItem("user", JSON.stringify(response));
      const data = await response.json();
      const loggedInEmail = data?.user?.email;
      fetchAllCourses({ email: loggedInEmail });
      console.log("Logged in user data", data);
    } catch (error) {
      console.error("Error fetching logged in user data", error);
    }
  };

  useEffect(() => {
    fetchLoggedInUser();
    fetchPurchasedAllCourses();
  }, []);

  console.log("Purchased courses", storePurchasedCourse);

  return (
    <div>
      <div>
        <h1 className="text-4xl lg:text-5xl lg:leading-tight font-semibold mt-5 mb-8 md:mt-0 text-black">
          Purchased Courses
        </h1>
        <div className="w-full relative">
          <div className="scroll-fade-wrapper relative">
            <ScrollArea className="h-[calc(100vh-200px)] w-full">
              {storePurchasedCourse?.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-5">
                  {storePurchasedCourse?.map((response, idx) => {
                    return (
                      <div key={idx} className="mb-2 ml-2">
                        <Link
                          href={`/video-room?courseId=${response?._id}`}
                          key={idx + 1}
                        >
                          <CourseCard course={response} />
                        </Link>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-96 text-center">
                  <h2 className="text-2xl font-semibold text-gray-600 mb-4">
                    No Purchased Courses
                  </h2>
                  <p className="text-gray-500 mb-6">
                    You haven't purchased any courses yet. Explore our course catalog to get started!
                  </p>
                  <Link href="/all-courses">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200">
                      Browse All Courses
                    </button>
                  </Link>
                </div>
              )}
            </ScrollArea>
            {/* <div className="fade-top absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-white to-transparent pointer-events-none z-10"></div> */}
            {/* <div className="fade-bottom absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-white to-transparent pointer-events-none z-10"></div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
