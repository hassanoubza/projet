import React from "react";

import {
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";

import { BsTwitterX } from "react-icons/bs";

type SocialItem = {
  name: string;
  link: string;
  bg: string;
  icon: React.ReactNode;
};


const socials: SocialItem[] = [
  {
    name: "Facebook",
    link: "https://www.facebook.com/tripstomarrakechdemo",
    bg: "bg-[#1877F2]",
    icon: <FaFacebookF aria-hidden="true" />,
  },
  {
    name: "Instagram",
    link: "https://www.instagram.com/tripstomarrakechdemo",
    bg: "bg-gradient-to-tr from-[#833AB4] via-[#E1306C] to-[#FCAF45]",
    icon: <FaInstagram aria-hidden="true" />,
  },
  {
    name: "WhatsApp",
    link: "https://wa.me/212643577845?text=Hello%20Trips%20to%20Marrakech%2C%20I%20would%20like%20more%20information.",
    bg: "bg-[#25D366]",
    icon: <FaWhatsapp aria-hidden="true" />,
  },
  {
    name: "X",
    link: "https://x.com/tripstomarrakechdemo",
    bg: "bg-neutral-950",
    icon: <BsTwitterX aria-hidden="true" />,
  },
];



function ReseauxSociaux(): React.JSX.Element {
  return (
    <div className="mt-5 flex flex-wrap items-center gap-4 sm:gap-3">
      {socials.map((social) => (
        <a
          key={social.name}
          href={social.link}
          title={social.name}
          aria-label={social.name}
          target="_blank"
          rel="noopener noreferrer"
          className={`
            group flex h-11 w-11 items-center justify-center rounded-full
            text-white shadow-sm
            transition-all duration-300
            hover:-translate-y-1 hover:scale-105 hover:shadow-md
            focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2
            ${social.bg}
          `}
        >
          <span className="text-lg transition-transform duration-300 group-hover:scale-110">
            {social.icon}
          </span>
        </a>
      ))}
    </div>
  );
}

export default ReseauxSociaux;
