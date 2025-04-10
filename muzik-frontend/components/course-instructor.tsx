"use client";

import { useState } from "react";
import { Star, Users, Video, ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { IconExternalLink } from "@tabler/icons-react";

interface CourseInstructorProps {
  course: any;
}

export default function CourseInstructor({ course }: CourseInstructorProps) {
  const [showFullBio, setShowFullBio] = useState(false);

  // Extract instructor data from the API response
  const instructor = course[0]?.instructor || {
    name: "Unknown Instructor",
    bio: "",
    description: "",
    Image: "/avatar.jpg",
  };

  return (
    <section className="border-t border-gray-200 pt-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Instructor</h2>

      <div className="bg-gray-50 rounded-xl p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Instructor profile image */}
          <div className="flex-shrink-0">
            <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md">
              <Image
                src={instructor.ImageUrl || "/avatar.jpg"}
                alt={instructor.name}
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="flex-grow">
            {/* Instructor name and title */}
            <h3 className="text-xl flex font-bold text-gray-900 hover:text-gray-700 transition-colors">
              {instructor.name} 
              <Link href={instructor.social} target="blank"><IconExternalLink className="h-5 w-5 mt-1.5 ml-2" /></Link>
            </h3>
            <p className="text-gray-600 mb-3">{instructor.description}</p>

            {/* Instructor bio */}
            {instructor.bio && (
              <>
                <div className="text-gray-700">
                  <p className="mb-3">
                    {showFullBio
                      ? instructor.bio
                      : `${instructor.bio.slice(0, 150)}...`}
                  </p>
                </div>

                {/* Show more/less button for bio */}
                {instructor.bio.length > 150 && (
                  <Button
                    variant="ghost"
                    className="transition-colors text-green-600 font-medium hover:text-green-800 p-0 flex items-center"
                    onClick={() => setShowFullBio(!showFullBio)}
                  >
                    {showFullBio ? (
                      <>
                        Show less <ChevronUp className="ml-1 h-4 w-4" />
                      </>
                    ) : (
                      <>
                        Show more <ChevronDown className="ml-1 h-4 w-4" />
                      </>
                    )}
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
