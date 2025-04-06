"use client";

import Image from "next/image";
import React from "react";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";
import Link from "next/link";

export function CourseCard({ data }: any) {

  console.log("Course data", data?.description, data?.instructor, data?.price,data?.thumbnail, data?.title, data?.videourl);

  return (
    <CardContainer className="inter-var w-[90%] flex">
      <CardBody className="border-2 border-neutral-200 bg-whiteda shadow-md relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2]  w-auto sm:w-[30rem] h-auto rounded-xl p-6   ">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-800 dark:text-black"
        >
          Make things float in air
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-800 text-sm max-w-sm mt-2 dark:text-neutral-300"
        >
          Hover over this card to unleash the power of CSS perspective
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-4">
          <Image
            src="/courses/course1.jpg"
            height="1000"
            width="1000"
            className="h-40 md:h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail"
          />
        </CardItem>
      </CardBody>
    </CardContainer>
  );
}
