"use client";
import { CourseCard } from "@/components/courseCard";
import { ScrollArea } from "@radix-ui/react-scroll-area";
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
            <ScrollArea className="h-[650px] w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-5">
              {storePurchasedCourse?.length > 0 &&
                storePurchasedCourse?.map((response, idx) => {
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
