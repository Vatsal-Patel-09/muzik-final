// import { link } from "fs"
// import Image from "next/image"
// import Link from "next/link"
// // import { SiTelegram } from "react-icons/si";

// export default function Testimonials() {
//   const testimonials = [
//     {
//       name: "MEET SONI",
//       role: "Founder & Lead Instructor",
//       link: 'https://www.instagram.com/meeet.soni',
//       quote:
//         "Passionate about music education, Meet Soni has over 10 years of experience in music production , mixing and mastering for industries top hits.",
//     },
//     {
//       name: "Adwaitsingh Rajput",
//       role: "Co Founder & Lead Course Instructor",
//       link: 'https://www.instagram.com/adwaitsinghrajput',
//       quote:
//         " A skilled artist, entrepreneur and music business enthusiasts , Adwaitsingh, ensures our courses provide complete music industry insights with complete data and tips for every aspiring artists to grow and get better in their musical journey.",
//     },
//     // {
//     //   name: "Alex Johnson",
//     //   role: "Student",
//     //   quote:
//     //     "As a beginner, I was intimidated at first, but MUZIK's supportive community and step-by-step lessons made learning enjoyable and achievable.",
//     // },
//   ]

//   return (
//     <section className="py-20">
//       <div className="container mx-auto px-6">
//         <h2 className="text-3xl font-bold text-center mb-8"> Meet the Experts Behind Music Skill House</h2>
//         <div className="flex items-center justify-center flex-col md:flex-row gap-8">
//           {testimonials.map((testimonial, index) => (
//             <div key={index} className="bg-white rounded-lg shadow-2xl md:h-[200px] p-6 md:w-[1000px]">
//               <div className="flex items-center mb-4">
//                 <Link href={testimonial.link} target="_blank">
//                   <Image
//                     src="/logo/share.png"
//                     alt={testimonial.name}
//                     width={50}
//                     height={50}
//                     className=" mr-4 bg-white "
//                   />
//                 </Link>
//                 {/* <SiTelegram className='' /> */}
//                 <div>
//                   <h3 className="font-bold">{testimonial.name}</h3>
//                   <p className="text-gray-600 text-sm">{testimonial.role}</p>
//                 </div>
//               </div>
//               <p className="text-gray-600 italic">{testimonial.quote}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   )
// }

import { AnimatedTeam } from "@/components/ui/animated-team";

export function TutorTeam() {
  const testimonials = [
    {
      quote:
        "Passionate about music education, Meet Soni has over 10 years of experience in music production , mixing and mastering for industries top hits.",
      name: "MEET SONI",
      designation: "Founder & Lead Instructor",
      src: "/assets/tutor/meet.jpg",
    },
    {
      quote:
        "A skilled artist, entrepreneur and music business enthusiasts , Adwaitsingh, ensures our courses provide complete music industry insights with complete data and tips for every aspiring artists to grow and get better in their musical journey.",
      name: "Adwaitsingh Rajput",
      designation: "Co Founder & Lead Course Instructor",
      src: "/assets/tutor/adwait.jpg",
    },
  ];
  return (
    <div className="border-t-2 border-gray mx-28 mt-10 border-b-2 pb-16 border-gray">
      <h2 className="text-3xl font-bold text-center mt-20">Meet the Experts Behind Music Skill House</h2>
      <AnimatedTeam testimonials={testimonials} />
    </div>
  );
}
 