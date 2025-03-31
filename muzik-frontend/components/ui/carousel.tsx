"use client";
import { IconArrowNarrowRight } from "@tabler/icons-react";
import { useState, useRef, useId, useEffect } from "react";

interface SlideData {
  title: string;
  src: string;
}

interface SlideProps {
  slide: SlideData;
  index: number;
  current: number;
  handleSlideClick: (index: number) => void;
}

const Slide = ({ slide, index, current, handleSlideClick }: SlideProps) => {
  const slideRef = useRef<HTMLLIElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const xRef = useRef(0);
  const yRef = useRef(0);
  const frameRef = useRef<number>();

  useEffect(() => {
    const animate = () => {
      if (!slideRef.current) return;
      const x = xRef.current;
      const y = yRef.current;
      slideRef.current.style.setProperty("--x", `${x}px`);
      slideRef.current.style.setProperty("--y", `${y}px`);
      frameRef.current = requestAnimationFrame(animate);
    };
    frameRef.current = requestAnimationFrame(animate);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  const handleMouseMove = (event: React.MouseEvent) => {
    if (!slideRef.current) return;
    const r = slideRef.current.getBoundingClientRect();
    xRef.current = event.clientX - (r.left + r.width / 2);
    yRef.current = event.clientY - (r.top + r.height / 2);
  };

  const handleMouseLeave = () => {
    xRef.current = 0;
    yRef.current = 0;
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.pause();
    }
  };

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.play();
    }
  };

  const { src, title } = slide;

  return (
    <div className="[perspective:1200px] [transform-style:preserve-3d]">
      <li
        ref={slideRef}
        className="flex flex-1 flex-col items-center justify-center relative text-center text-white transition-all duration-300 ease-in-out w-[70vmin] h-[70vmin] mx-[4vmin] z-10"
        onClick={() => handleSlideClick(index)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        style={{
          transform:
            current !== index ? "scale(0.98) rotateX(8deg)" : "scale(1) rotateX(0deg)",
          transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
          transformOrigin: "bottom",
        }}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-[#1D1F2F] rounded-[1%] overflow-hidden transition-all duration-150 ease-out">
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover opacity-100 transition-opacity duration-600 ease-in-out"
            style={{ opacity: current === index ? 1 : 0.5 }}
            src={src}
            loop
            muted
          />
          {current === index && <div className="absolute inset-0 bg-black/30 transition-all duration-1000" />}
        </div>
        <article
          className={`relative p-[4vmin] transition-opacity duration-1000 ease-in-out ${
            current === index ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          <h2 className="text-lg md:text-2xl mt-96 lg:text-4xl font-semibold">{title}</h2>
          <div className="flex justify-center">

          </div>
        </article>
      </li>
    </div>
  );
};

interface CarouselProps {
  slides: SlideData[];
}

export default function Carousel({ slides }: CarouselProps) {
  const [current, setCurrent] = useState(1);
  const handlePreviousClick = () => setCurrent(current === 0 ? slides.length - 1 : current - 1);
  const handleNextClick = () => setCurrent((current + 1) % slides.length);
  const handleSlideClick = (index: number) => setCurrent(index);
  const id = useId();

  return (
    <div className="relative w-[70vmin] h-[70vmin] mx-auto" aria-labelledby={`carousel-heading-${id}`}>
      <ul className="absolute flex mx-[-4vmin] transition-transform duration-1000 ease-in-out" style={{ transform: `translateX(-${current * (100 / slides.length)}%)` }}>
        {slides.map((slide, index) => (
          <Slide key={index} slide={slide} index={index} current={current} handleSlideClick={handleSlideClick} />
        ))}
      </ul>
      <div className="absolute flex justify-center w-full top-[calc(100%+1rem)]">
        <button className="w-10 h-10 flex items-center mx-2 justify-center bg-neutral-200 dark:bg-neutral-800 border-3 border-transparent rounded-full hover:-translate-y-0.5 active:translate-y-0.5 transition duration-200" onClick={handlePreviousClick}>
          <IconArrowNarrowRight className="text-neutral-600 dark:text-neutral-200 rotate-180" />
        </button>
        <button className="w-10 h-10 flex items-center mx-2 justify-center bg-neutral-200 dark:bg-neutral-800 border-3 border-transparent rounded-full hover:-translate-y-0.5 active:translate-y-0.5 transition duration-200" onClick={handleNextClick}>
          <IconArrowNarrowRight className="text-neutral-600 dark:text-neutral-200" />
        </button>
      </div>
    </div>
  );
}
