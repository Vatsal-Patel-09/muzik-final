import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "./ui/button"

export default function FAQ() {
  const faqs = [
    {
      question: "What is Muzik Skill House?",
      answer:
        "Muzik Skill House is an online academy offering expert-led music courses covering mixing, mastering, production, vocal tuning, music business, and instrument learning.",
    },
    {
      question: "Who are the instructors?",
      answer:
        "Our courses are taught by experienced industry professionals with expertise in their respective fields, ensuring high-quality learning.",
    },
    {
      question: "Are the courses suitable for beginners?",
      answer:
        "Yes! We offer courses for all skill levels, from complete beginners to advanced musicians and producers. Each course description specifies the level.",
    },
    {
      question: "Do I need prior music knowledge to take a course?",
      answer:
        "It depends on the course. Some courses are designed for beginners, while others require basic knowledge of music production or an instrument.",
    },
    {
      question: "Are the courses live or pre-recorded?",
      answer:
        "Most courses are pre-recorded so you can learn at your own pace, but we also offer live masterclasses and Q&A live doubt solving sessions occasionally.",
    },
    {
      question: "How do I access my purchased courses?",
      answer:
        "Once you enroll, you can access your courses anytime by logging into your Muzik Skill House account on our website.",
    },
    {
      question: "How long do I have access to the courses?",
      answer:
        "You get 1-year access to all courses you purchase. After 1 year, you will need to renew your access if you wish to continue learning.",
    },
    {
      question: "Can I download the course videos or materials?",
      answer:
        "No, course videos and materials are not downloadable. However, you get access to bonus episodes and exclusive community support as part of your learning experience.",
    },
    {
      question: "Do I receive a certificate after completing a course?",
      answer:
        "As of now, we do not provide certificates for course completion.",
    },
    {
      question: "What are the bonus episodes and perks included?",
      answer:
        "Some courses come with extra learning content, behind-the-scenes insights, and access to a supportive community where you can interact with mentors and fellow learners.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept credit/debit cards, UPI and net banking.",
    },
    {
      question: "Do you offer refunds if I don’t like the course?",
      answer:
        "No, we do not offer refunds on course purchases. Please review the course details carefully before enrolling.",
    },
    {
      question: "Do you offer discounts or bundle deals?",
      answer:
        "Yes! We occasionally run discounts and offer bundle deals for multiple courses. Follow our Instagram @muzikskillhouse for updates.",
    },
    {
      question: "I’m facing issues accessing my course. What should I do?",
      answer:
        "First, try logging out and back in. If the issue persists, contact our support team at [muzikskillhouse@gmail.com].",
    },
    {
      question: "Can I access my courses on mobile devices?",
      answer:
        "Yes! You can watch the courses on any device, including laptops, tablets, and smartphones.",
    },
    {
      question: "Do you provide customer support for technical issues?",
      answer:
        "Yes! Our support team is available to assist you with any technical issues related to course access and payments.",
    },
    {
      question: "Can I collaborate or teach a course on Muzik Skill House?",
      answer:
        "If you're an industry professional and want to become a tutor, contact us at [muzikskillhouse@gmail.com] with your course proposal.",
    },
    {
      question: "How do I stay updated on new courses and masterclasses?",
      answer:
        "Follow us on Instagram and join our community channel to get updates on new courses, workshops, and special offers.",
    },
    {
      question: "Can I suggest a course topic?",
      answer:
        "Absolutely! We value your input. Email us your suggestions at [muzikskillhouse@gmail.com].",
    },
    {
      question: "Do you provide one-on-one mentoring or custom training?",
      answer:
        "Yes, we offer personalized mentoring for select courses. Reach out to us for details and pricing.",
    },
  ]

  return (
    <section className="py-20 border-t-2 border-gray mx-28 mt-20">
      <div className="container mx-auto px-6 flex items-center justify-center flex-col">
        <h2 className="text-3xl lg:text-5xl lg:leading-tight font-semibold text-center mb-8">FAQs</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Find answers to common questions about our music courses and services.
        </p>
        
        {faqs.length <= 5 ? (
          <Accordion type="single" collapsible className="max-w-2xl mx-auto w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <div>
            <Accordion type="single" collapsible className="max-w-2xl mx-auto w-full">
              {faqs.slice(0, 5).map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            
            <div className="mt-10 text-center">
              <Dialog>
                <DialogTrigger className=" px-6 py-2 rounded-fulltransition-colors">
                  <Button variant='default' >Show More</Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="text-xl mb-4">Frequently Asked Questions</DialogTitle>
                    <ScrollArea className="h-[400px] rounded-md border p-4">
                      <DialogDescription>
                        <Accordion type="single" collapsible className="w-full">
                          {faqs.map((faq, index) => (
                            <AccordionItem key={index} value={`item-${index}`}>
                              <AccordionTrigger>{faq.question}</AccordionTrigger>
                              <AccordionContent>{faq.answer}</AccordionContent>
                            </AccordionItem>
                          ))}
                        </Accordion>
                      </DialogDescription>
                    </ScrollArea>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

