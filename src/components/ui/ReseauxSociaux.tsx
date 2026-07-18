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
    link: "#",
    bg: "bg-[#1877F2]",
    icon: <FaFacebookF />,
  },
  {
    name: "Instagram",
    link: "#",
    bg: "bg-gradient-to-tr from-[#833AB4] via-[#E1306C] to-[#FCAF45]",
    icon: <FaInstagram />,
  },
  {
    name: "WhatsApp",
    link: "#",
    bg: "bg-[#25D366]",
    icon: <FaWhatsapp />,
  },
  {
    name: "X",
    link: "#",
    bg: "bg-neutral-950",
    icon: <BsTwitterX />,
  }
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
