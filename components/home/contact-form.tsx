"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

type SubmitStatus = "success" | "error" | null;

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error(error);
      setSubmitStatus("error");
    }
    setIsSubmitting(false);
  };

  return (
    <div>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            type="text"
            name="name"
            placeholder="Name"
            className="w-full"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <Input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <Input
          type="text"
          name="subject"
          placeholder="Subject"
          className="w-full"
          value={formData.subject}
          onChange={handleChange}
          required
        />
        <Textarea
          name="message"
          placeholder="Message"
          className="w-full"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          required
        />
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </form>
      {submitStatus === "success" && (
        <p className="text-green-600">
          Thank you for your message! We&apos;ll get back to you soon.
        </p>
      )}
      {submitStatus === "error" && (
        <p className="text-red-600">
          An error occurred. Please try again later.
        </p>
      )}
    </div>
  );
};

export default ContactForm;
