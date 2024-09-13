import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import ProductItems from "./product-items";
import { PRODUCTS_HEADER } from "@/constants";

const ProductSection = () => {
  return (
    <section id="products" className="w-full py-12 md:py-24 lg:py-32">
      <div className=" px-4 md:px-6 ">
        <div className="space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            {PRODUCTS_HEADER.title}
          </h2>
          <p className="text-muted-foreground md:text-xl">
            {PRODUCTS_HEADER.description}
          </p>
        </div>
        <div className="mt-12">
          <Carousel className="w-full max-w-5xl mx-auto">
            <CarouselContent className="w-full">
              <ProductItems />
            </CarouselContent>
            <CarouselPrevious className="absolute top-1/2 -left-12 -translate-y-1/2 bg-primary text-primary-foreground rounded-full p-2 hover:bg-primary/90 focus:outline-none focus-visible:ring-1 focus-visible:ring-ring">
              <ChevronLeftIcon className="h-6 w-6" />
            </CarouselPrevious>
            <CarouselNext className="absolute top-1/2 -right-8 -translate-y-1/2 bg-primary text-primary-foreground rounded-full p-2 hover:bg-primary/90 focus:outline-none focus-visible:ring-1 focus-visible:ring-ring">
              <ChevronRightIcon className="h-6 w-6" />
            </CarouselNext>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
