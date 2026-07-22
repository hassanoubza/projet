"use client";

import { useState, type FormEvent } from "react";
import { Mail } from "lucide-react";
import ReseauxSociaux from "@/components/ui/ReseauxSociaux";

interface TourInquiryFormProps {
  tourTitle: string;
  tourSlug: string;
}

const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";

export default function TourInquiryForm({tourTitle,tourSlug,}: TourInquiryFormProps): React.JSX.Element {


  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    setError("");

    const cleanEmail = email.trim();
    const cleanMessage = message.trim();

    if (!cleanEmail || !cleanMessage) {
      setError("Please complete all fields.");
      return;
    }
    

    const phoneNumber = whatsappNumber.replace(/\D/g, "");

    if (!phoneNumber) {
      setError("WhatsApp number is not configured.");
      return;
    }

    const tourUrl = `${window.location.origin}/tours/${tourSlug}`;

    const whatsappMessage = [
      "Hello, I would like to check availability for this tour.",
      "",
      `Tour: ${tourTitle}`,
      `Email: ${cleanEmail}`,
      `Message: ${cleanMessage}`,
      `Tour page: ${tourUrl}`,
    ].join("\n");

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  }



  return (
    <section className="sticky top-40">
      <div className="overflow-hidden rounded-xl border border-border bg-background">
        <div className=" px-4 py-3">
          <h2 className="mt-2 text-2xl font-extrabold text-heading">
            Book your Adventure
          </h2>

          <p className="mt-2 text-sm leading-6 text-text-secondary">
            Send us your request and receive availability details for this
            private tour.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 p-6">
          <div>
            <label
              htmlFor="tour-inquiry-email"
              className="mb-2 block text-sm font-semibold text-heading"
            >
              Email address
            </label>

            <div className="relative">
              <Mail
                aria-hidden="true"
                className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted"
              />

              <input
                id="tour-inquiry-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                autoComplete="email"
                placeholder="Enter your email"
                className="min-h-12 w-full rounded-xl border border-border bg-background py-3 pl-11 pr-4 text-sm text-heading outline-none transition placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/15"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="tour-inquiry-message"
              className="mb-2 block text-sm font-semibold text-heading"
            >
              Your message
            </label>

            <textarea
              id="tour-inquiry-message"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              rows={5}
              placeholder="Travel dates, number of travelers and any special requests..."
              className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm leading-6 text-heading outline-none transition placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/15"
            />
          </div>

          {error ? (
            <p role="alert" className="text-sm font-medium text-red-600">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            Book now
          </button>

          <p className="text-center text-xs leading-5 text-text-muted">
            No payment is required. We will confirm availability and details
            with you.
          </p>
        </form>
      </div>
      <div className="flex justify-center">
        <ReseauxSociaux />
      </div>
    </section>
  );
}
