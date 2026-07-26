"use client";
import { toast } from "sonner";
import React, { useState } from "react";
import type { ContactForm } from "@/type/contactType";
import { Send } from "lucide-react";

const INITIAL_FORM: ContactForm = {
  name: "",
  email: "",
  phone: "",
  message: "",
};


function ContactForm() {

  const [form, setForm] = useState<ContactForm>(INITIAL_FORM);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await fetch("/api/contact", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Your request has been sent successfully!", {
          description: "Our Morocco travel team will contact you shortly.",
        });

        setForm(INITIAL_FORM);
      }
    } catch {
  toast.error("Something went wrong", {
    description: "Please try again later.",
  });
    } finally {
      setLoading(false);
    }
  };

  const updateField = (field: keyof ContactForm, value: string): void => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="mt-7 space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-semibold text-heading"
          >
            Full name
          </label>

          <input
            id="name"
            type="text"
            value={form.name}
            onChange={(event) => updateField("name", event.target.value)}
            required
            autoComplete="name"
            placeholder="Your name"
            className="h-12 w-full rounded-xl border border-border bg-background px-4 text-sm text-heading outline-none transition placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/10"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-semibold text-heading"
          >
            Email address
          </label>

          <input
            id="email"
            type="email"
            value={form.email}
            onChange={(event) => updateField("email", event.target.value)}
            required
            autoComplete="email"
            placeholder="you@example.com"
            className="h-12 w-full rounded-xl border border-border bg-background px-4 text-sm text-heading outline-none transition placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/10"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="phone"
          className="mb-2 block text-sm font-semibold text-heading"
        >
          Phone or WhatsApp
        </label>

        <input
          id="phone"
          type="tel"
          value={form.phone}
          onChange={(event) => updateField("phone", event.target.value)}
          autoComplete="tel"
          placeholder="+212..."
          className="h-12 w-full rounded-xl border border-border bg-background px-4 text-sm text-heading outline-none transition placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/10"
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="mb-2 block text-sm font-semibold text-heading"
        >
          Your travel request
        </label>

        <textarea
          id="message"
          rows={6}
          value={form.message}
          onChange={(event) => updateField("message", event.target.value)}
          required
          placeholder="Tell us about your destinations, travel dates, group size or special requests..."
          className="w-full resize-y rounded-xl border border-border bg-background px-4 py-3 text-sm leading-7 text-heading outline-none transition placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/10"
        />
      </div>

      <button
        type="submit"
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 font-bold text-primary-foreground transition hover:bg-primary-hover"
      >
        {loading ? "Sending..." : "Send Message"}
        <Send className="h-4 w-4" />
      </button>
    </form>
  );
}

export default ContactForm;
