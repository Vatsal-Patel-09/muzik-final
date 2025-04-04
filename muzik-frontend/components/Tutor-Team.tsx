import { AnimatedTeam } from "@/components/ui/animated-team";

export function TutorTeam() {
  const testimonials = [
    {
      quote:
        "Passionate about music education, Meet Soni has over 10 years of experience in music production , mixing and mastering for industries top hits.",
      name: "MEET SONI",
      designation: "Founder & Lead Instructor",
      src: "/assets/tutor/meet.jpg",
      slink: "https://www.instagram.com/meeet.soni",
    },
    {
      quote:
        "A skilled artist, entrepreneur and music business enthusiasts , Adwaitsingh, ensures our courses provide complete music industry insights with complete data and tips for every aspiring artists to grow and get better in their musical journey.",
      name: "Adwaitsingh Rajput",
      designation: "Co Founder & Lead Course Instructor",
      src: "/assets/tutor/adwait.jpg",
      slink: "https://www.instagram.com/adwaitsinghrajput",
    },
  ];
  return (
    <div className="border-t-2 border-gray md:mx-28 mx-4 mt-10 border-b-2 pb-16 border-gray">
      <h2 className="text-3xl lg:text-5xl lg:leading-tight font-semibold text-center mt-20 ">Meet the Instructors Behind Music Skill House</h2>
      <AnimatedTeam testimonials={testimonials} />
    </div>
  );
}
 