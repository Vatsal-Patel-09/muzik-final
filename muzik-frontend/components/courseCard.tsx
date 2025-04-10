"use client";

import Image from "next/image";
import React from "react";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";

export function CourseCard({ course }: any) {
  return (
    <CardContainer className="w-[90%] ">
      <CardBody className="border-2 border-neutral-200 bg-white shadow-md relative group/card hover:shadow-xl transition-all duration-200 w-full h-full rounded-xl p-6">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-800 dark:text-black line-clamp-2 h-16"
        >
          {course?.courseTitle || "Course Title"}
        </CardItem>
        
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-800 text-md font-semibold mt-2 dark:text-neutral-300"
        >
          {course?.price}
        </CardItem>
        
        <CardItem translateZ="100" className="w-full mt-4">
          <div className="relative aspect-video w-full overflow-hidden rounded-lg">
            <Image
              src= {course?.thumbnailImage}
              height={400}
              width={600}
              className="w-full object-cover rounded-xl group-hover/card:scale-105 transition-transform duration-300"
              alt={course?.courseTitle || "Course thumbnail"}
            />
          </div>
        </CardItem>
      
      </CardBody>
    </CardContainer>
  );
}
