"use client";

import React, { useState } from "react";
import { ArrowUpRight, MessageCircle, Send, Sparkles } from "lucide-react";
import type { ContactForm } from "@/type/contactType";

const INITIAL_FORM: ContactForm = {
  name: "",
  email: "",
  phone: "",
  message: "",
};


const WHATSAPP_NUMBER = "2127864848";





export default function ContactPage(): React.JSX.Element {


  const [form, setForm] = useState<ContactForm>(INITIAL_FORM);

  const updateField = (field: keyof ContactForm, value: string): void => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    console.log("Form submitted:", form);

  }


  return (
    <section className="bg-background px-4 py-12 text-foreground sm:px-6 lg:px-8 lg:py-16">
      <section className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
            Contact Us
          </p>

          <h1 className="mt-3 text-3xl font-bold text-heading sm:text-4xl">
            Let&apos;s Plan Your Morocco Journey
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-text-secondary">
            Tell us about your travel plans and our local team will help you
            create a private Morocco tour designed around you.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          {/* FORM */}
          <div className="rounded-xl border border-border bg-card p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-bold text-heading">
              Send us a message
            </h2>

            <p className="mt-2 text-sm leading-6 text-text-secondary">
              Fill in the form and continue the conversation directly on
              WhatsApp.
            </p>

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
                    onChange={(event) =>
                      updateField("name", event.target.value)
                    }
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
                    onChange={(event) =>
                      updateField("email", event.target.value)
                    }
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
                  onChange={(event) =>
                    updateField("message", event.target.value)
                  }
                  required
                  placeholder="Tell us about your destinations, travel dates, group size or special requests..."
                  className="w-full resize-y rounded-xl border border-border bg-background px-4 py-3 text-sm leading-7 text-heading outline-none transition placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/10"
                />
              </div>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 font-bold text-primary-foreground transition hover:bg-primary-hover"
              >
                Send Message
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>

          {/* CONTACT INFORMATION */}
          <aside className="relative flex min-h-full flex-col overflow-hidden rounded-xl bg-secondary p-7 text-secondary-foreground shadow-sm sm:p-9">

            <div className="relative">
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-gold-muted">
                Your Morocco Travel Concierge
              </p>

              <h2 className="mt-4 max-w-md text-3xl font-bold leading-tight sm:text-4xl">
                From your first idea to a journey designed around you.
              </h2>

              <p className="mt-5 max-w-md text-base leading-8 text-secondary-foreground/75">
                Share your travel plans and let our local team transform them
                into a clear, comfortable and authentic Morocco itinerary.
              </p>
            </div>

            <div className="relative mt-9 space-y-7">
              <div className="grid grid-cols-[44px_1fr] gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-secondary-foreground/15 bg-secondary-foreground/5">
                  <MessageCircle className="h-5 w-5 text-gold-muted" />
                </div>

                <div className="border-b border-secondary-foreground/10 pb-7">
                  <h3 className="mt-1 text-lg font-bold">
                    Tell us about your trip
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-secondary-foreground/70">
                    Share your dates, preferred destinations, group size and
                    travel style.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-[44px_1fr] gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-secondary-foreground/15 bg-secondary-foreground/5">
                  <Sparkles className="h-5 w-5 text-gold-muted" />
                </div>
                <div>
                  <h3 className="mt-1 text-lg font-bold">
                    Travel with confidence
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-secondary-foreground/70">
                    Enjoy local assistance, private transport and a journey
                    organized around you.
                  </p>
                </div>
              </div>

            </div>

              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex w-full items-center justify-between rounded-xl bg-primary px-5 py-4 font-bold text-primary-foreground transition hover:bg-primary-hover"
              >
                <span className="flex items-center gap-3">
                  <MessageCircle className="h-5 w-5" />
                  Start on WhatsApp
                </span>

                <ArrowUpRight className="h-5 w-5" />
              </a>
          </aside>
          
        </div>
      </section>
    </section>
  );
}
