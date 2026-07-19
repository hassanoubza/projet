import Link from "next/link";
import { Headphones, Mail } from "lucide-react";
import { FaInstagram } from "react-icons/fa";

const contactItems = [
  {
    title: "Email us",
    value: "info@tripstomarrakech.com",
    href: "mailto:info@tripstomarrakech.com",
    icon: Mail,
    ariaLabel: "Send an email to Trips to Marrakech",
  },
  {
    title: "Call us",
    value: "+212 787 996 288",
    href: "tel:+212787996288",
    icon: Headphones,
    ariaLabel: "Call Trips to Marrakech",
  },
  {
    title: "Follow us",
    value: "@tripstomarrakech",
    href: "https://www.instagram.com/tripstomarrakech",
    icon: FaInstagram,
    ariaLabel: "Follow Trips to Marrakech on Instagram",
  },
];

export default function ContactAdventure(): React.JSX.Element {
  return (
    <section className="flex items-center bg-background px-4 py-8 sm:px-6 lg:px-8 lg:py-16">
      <div className="mx-auto grid w-full max-w-5xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="max-w-xl">
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-heading sm:text-4xl">
            Ready for a Marrakech Adventure?
          </h2>

          <p className="mt-5 max-w-lg text-base leading-8 text-text-secondary sm:text-lg">
            Have questions about our Marrakech tours, day trips or private
            Morocco journeys? Contact our local team and let us help you plan
            the perfect experience.
          </p>

          <Link
            href="/contact"
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 font-semibold text-primary-foreground transition hover:bg-primary-hover"
          >
            Get in Touch
            <Mail className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="w-full max-w-md space-y-8">
          {contactItems.map((item) => {
            const Icon = item.icon;

            return (
              <a
                key={item.title}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  item.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                aria-label={item.ariaLabel}
                className="group flex items-center lg:pl-16  gap-5"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition group-hover:bg-primary-hover">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>

                <span className="min-w-0">
                  <span className="block text-lg font-bold text-heading sm:text-xl">
                    {item.title}
                  </span>
                  <span className="mt-2 block break-words text-sm text-text-secondary transition group-hover:text-primary sm:text-base">
                    {item.value}
                  </span>
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
