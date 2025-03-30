import { AnimatedTeam } from "@/components/ui/animated-testimonials";

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
      name: "ADWAITSINGH RAJPUT",
      designation: "Co Founder & Lead Course Instructor",
      src: "/assets/tutor/adwait.jpg",
      slink: "https://www.instagram.com/adwaitsinghrajput",
    }    
  ];
  return <AnimatedTeam testimonials={testimonials} />;
}
