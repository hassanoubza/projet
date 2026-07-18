import React from "react";
import { FaWhatsapp } from "react-icons/fa";

export default function Whatsapp(): React.JSX.Element {
  const phoneNumber = "212787996288";
  const message = encodeURIComponent(
    "Hello, I would like to customize a Morocco tour.",
  );

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact us on WhatsApp"
      className="group fixed bottom-5 right-5 z-50 flex items-center gap-3"
    >
      {/* Button */}
      <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-white shadow-xl transition-transform duration-300 group-hover:scale-110">
        {/* Ping animation */}
        <span className="absolute inset-0 rounded-full bg-accent opacity-30 " />

        {/* WhatsApp Icon */}
        <FaWhatsapp />

        {/* Badge */}
        <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-background bg-desert text-xs font-extrabold text-white">
          1
        </span>
      </span>
    </a>
  );
}
