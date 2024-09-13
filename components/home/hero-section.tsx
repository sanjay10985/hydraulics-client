"use client";
import React, { useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import { IMAGES } from "@/constants";

const HeroSection = () => {
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

  return (
    <section className="w-full h-[720px] relative overflow-hidden">
      <Carousel
        plugins={[plugin.current]}
        className="w-full h-full "
        // onMouseEnter={plugin.current.stop}
        // onMouseLeave={plugin.current.reset}
      >
        <CarouselContent className="h-full">
          {IMAGES.map((img) => (
            <CarouselItem key={img.id} className="h-full">
              <div className="w-full h-full relative">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full  object-end"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/20 text-white rounded-full p-2 hover:bg-white/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-white">
          <ChevronLeftIcon className="h-6 w-6" />
        </CarouselPrevious>
        <CarouselNext className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/20 text-white rounded-full p-2 hover:bg-white/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-white">
          <ChevronRightIcon className="h-6 w-6" />
        </CarouselNext>
      </Carousel>
    </section>
  );
};

export default HeroSection;
