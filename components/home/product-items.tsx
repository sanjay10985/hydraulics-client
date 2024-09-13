import React from "react";
import { PRODUCT_CAROUSEL_ITEMS } from "@/constants";
import { CarouselItem } from "../ui/carousel";

export default function ProductItems() {
  const chunks = [];

  for (let i = 0; i < PRODUCT_CAROUSEL_ITEMS.length; i += 2) {
    chunks.push(PRODUCT_CAROUSEL_ITEMS.slice(i, i + 2));
  }

  return (
    <>
      {chunks.map((chunk, index) => (
        <CarouselItem key={index} className="w-full ">
          <div className="flex">
            {chunk.map((item, idx) => (
              <div
                key={idx}
                className="bg-background w-1/2 rounded-lg p-4 shadow-sm"
              >
                <img
                  src={item.imgSrc}
                  width={640}
                  height={360}
                  alt={item.imgAlt}
                  className="aspect-video object-cover rounded-lg"
                />
                <h3 className="text-xl font-semibold mt-2">{item.title}</h3>
                <p className="text-muted-foreground mt-1">{item.description}</p>
              </div>
            ))}
          </div>
        </CarouselItem>
      ))}
    </>
  );
}
