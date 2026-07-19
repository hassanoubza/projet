import React from "react";
import { FaWhatsapp } from "react-icons/fa";

export default function Whatsapp(): React.JSX.Element {
  const phoneNumber = "212643577845"; // Replace with your WhatsApp number (without '+' or spaces)
  const message = encodeURIComponent(
    "Hello, I would like to customize a Morocco tour.",
  );

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Trips to Marrakech on WhatsApp"
      className="group fixed bottom-5 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
    >
      <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-white shadow-xl transition-transform duration-300 group-hover:scale-110">
        <span
          className="absolute inset-0 rounded-full bg-accent opacity-30"
          aria-hidden="true"
        />

        <FaWhatsapp className="relative z-10 h-6 w-6" aria-hidden="true" />

        <span
          className="absolute -right-1 -top-1 z-20 flex h-5 w-5 items-center justify-center rounded-full border-2 border-background bg-desert text-xs font-extrabold text-white"
          aria-hidden="true"
        >
          1
        </span>
      </span>
    </a>
  );
}
