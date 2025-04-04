import Link from "next/link";
import DirectionsButton from "./DirectionsButton";
import { Button } from "./ui/button";

export default function Contact() {
  return (
    <section id="contact" className="relative py-20 border-t-2 border-gray mx-28 mt-10 border-b-2 pb-30">
      <div className="container mx-auto px-6">
        <h2 className="mb-8 text-center text-3xl lg:text-5xl lg:leading-tight font-semibold">Contact Us</h2>
        <div className="flex md:flex-row flex-col justify-center items-center gap-8 ">
          <div>
            <h3 className="mb-4 text-xl font-semibold">
              Get in Touch – Let’s Make Music Together!
            </h3>
            <p className="mb-4 text-gray-600">
              For inquiries, collaborations, or support, reach out to us.
            </p>
            <div className="space-y-2">
              <p className="flex items-center">
                <svg
                  className="mr-2 h-5 w-5 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  ></path>
                </svg>
                <Link target="_blank" href={'mailto:muzikskillhouse@gmail.com'} ><Button variant='link' className="text-black -ml-3" >muzikskillhouse@gmail.com</Button></Link>
              </p>
              <p className="flex items-center">
                <svg
                  className="mr-2 h-5 w-5 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  ></path>
                </svg>
                +91 7383465464
              </p>
              <p className="flex items-center">
                <svg
                  className="mr-2 h-7 w-7 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  ></path>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                </svg>
                <a
                  href="https://g.co/kgs/vPTEZ8N"
                  className="text-blue-500 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Prabhakar Apartment, B/5, Gurukul Rd, beside Chinmay Tower,
                  Tarun Nagar Part 2, Memnagar, Ahmedabad, Gujarat 380052
                </a>
              </p>
             
            </div>
          </div>
          <div className="relative h-[300px] w-full">
            <DirectionsButton className="absolute right-2 top-2 z-10 rounded-full" />
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.1866506366496!2d72.53093521094804!3d23.053617679065148!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e85ec707d29a9%3A0xfb32f2b2ef518ccf!2sGod%20Grace%20Studio!5e0!3m2!1sen!2sin!4v1742746524241!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
