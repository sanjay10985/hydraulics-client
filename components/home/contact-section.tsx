import React from "react";
import { CONTACT_HEADER } from "@/constants";
import ContactForm from "./contact-form";

const ContactSection = () => {
  return (
    <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-muted ">
      <div className=" px-4 md:px-6 ">
        <div className="max-w-2xl mx-auto space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            {CONTACT_HEADER.title}
          </h2>
          <p className="text-muted-foreground md:text-xl">
            {CONTACT_HEADER.description}
          </p>
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
