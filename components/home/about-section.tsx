import React from "react";
import { ABOUT_HEADER, FEATURE_DATA } from "@/constants";
import FeatureCard from "./feature-card";

const AboutSection = () => {
  return (
    <section id="services" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
      <div className=" px-4 md:px-6 ">
        <div className="grid gap-6 lg:grid-cols-1 lg:gap-12 ">
          <div className="space-y-4">
            <h2 className="text-3xl text-center font-bold tracking-tighter sm:text-4xl md:text-5xl">
              {ABOUT_HEADER.title}
            </h2>
            <p className="text-muted-foreground md:text-xl text-center">
              {ABOUT_HEADER.description}
            </p>
          </div>
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
            {FEATURE_DATA.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
