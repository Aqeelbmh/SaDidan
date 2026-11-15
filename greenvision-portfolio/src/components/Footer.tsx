import Link from "next/link";
import type { ContactSettings, FooterSettings } from "../lib/types";

interface FooterProps {
  footer: FooterSettings;
  contact: ContactSettings;
}

const socialLinks = (contact: ContactSettings) =>
  [
    { name: "LinkedIn", url: contact.linkedin },
    { name: "Facebook", url: contact.facebook },
    { name: "Instagram", url: contact.instagram },
    { name: "YouTube", url: contact.youtube },
    { name: "Email", url: contact.email ? `mailto:${contact.email}` : "" },
  ].filter((social) => social.url);

const explore = [
  { name: "Journey", href: "#timeline" },
  { name: "Publications", href: "#publications" },
  { name: "Projects", href: "#projects" },
  { name: "Gallery", href: "#gallery" },
  { name: "Contact", href: "#contact" },
];

const Footer = ({ footer, contact }: FooterProps) => {
  const socials = socialLinks(contact);
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-line bg-[rgba(7,14,12,0.55)] backdrop-blur-xl">
      <div className="container-responsive py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr] lg:gap-16">
          <div>
            <p className="eyebrow">{footer.aboutTitle}</p>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-ink-soft sm:text-[0.95rem]">
              {footer.aboutText}
            </p>

            {socials.length > 0 && (
              <ul className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                {socials.map((social) => (
                  <li key={social.name}>
                    <a
                      href={social.url}
                      target={social.url.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="text-[0.7rem] font-medium uppercase tracking-[0.22em] text-muted transition-colors hover:text-gold"
                    >
                      {social.name}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <nav aria-label="Footer navigation">
            <h3 className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-muted">
              Explore
            </h3>
            <ul className="mt-6 space-y-3">
              {explore.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-ink-soft transition-colors hover:text-ink"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-muted">
              Services
            </h3>
            <ul className="mt-6 space-y-3">
              {footer.services.map((service, index) => (
                <li
                  key={`${service}-${index}`}
                  className="text-sm leading-relaxed text-ink-soft"
                >
                  {service}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted">
            © {year} {footer.copyright}
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {footer.privacyUrl && (
              <a
                href={footer.privacyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-muted transition-colors hover:text-accent-soft"
              >
                Privacy
              </a>
            )}
            {footer.termsUrl && (
              <a
                href={footer.termsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-muted transition-colors hover:text-accent-soft"
              >
                Terms
              </a>
            )}
            <Link
              href="/admin"
              className="text-xs text-muted transition-colors hover:text-accent-soft"
            >
              Manage content
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
