// import Image from "next/image"

// export default function Testimonials() {
//   const teamMembers = [
//     {
//       name: "Alex Johnson",
//       role: "Lead Instructor",
//       description: "Expert in music production with over 10 years of experience in the industry.",
//     },
//     {
//       name: "Sarah Smith",
//       role: "Vocal Coach",
//       description: "Professional singer with a passion for teaching and nurturing new talent.",
//     },
//     {
//       name: "Mike Brown",
//       role: "Sound Engineer",
//       description: "Grammy-winning sound engineer with expertise in studio recording and live performances.",
//     },
//   ]

//   return (
//     <section id="team" className="py-20 bg-gray-100">
//       <div className="container mx-auto px-6">
//         <h2 className="text-3xl font-bold text-center mb-8">Testimonials</h2>
//         <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
//           Passionate professionals dedicated to your musical journey.
//         </p>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {teamMembers.map((member, index) => (
//             <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
//               <Image src="/placeholder.svg" alt={member.name} width={300} height={300} className="w-full" />
//               <div className="p-6">
//                 <h3 className="font-bold text-xl mb-2">{member.name}</h3>
//                 <p className="text-gray-600 mb-2">{member.role}</p>
//                 <p className="text-gray-600">{member.description}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   )
// }

"use client";

import Carousel from "@/components/ui/carousel";
export function Testimonials() {
  const slideData = [
    {
      title: "Harsh Vyas",
      src: "/testimonial2.mp4",
    },
    {
      title: "Shiven Sharma",
      src: "/testimonial3.mp4",
    },
    {
      title: "AMJAD aka GABBAR",
      src: "testimonial1.mp4",
    },
  ];
  return (
    <div className="relative overflow-hidden w-full h-full py-20 ">
      <h2 className="text-4xl font-bold text-center mb-8">Testimonials</h2>
      <Carousel slides={slideData} />
    </div>
  );
}
