"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
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
      console.log(error);

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
          Thank you for your message! We'll get back to you soon.
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
