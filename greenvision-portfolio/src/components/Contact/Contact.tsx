"use client";

import { useState } from "react";
import type { ContactSettings } from "../../lib/types";
import SectionShell from "../ui/SectionShell";
import Reveal from "../ui/Reveal";

interface ContactProps {
  contact: ContactSettings;
}

const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden>
    <rect x="3" y="5.5" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.3" />
    <path d="M3.8 7l8.2 5.8L20.2 7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);

const PinIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden>
    <path
      d="M12 21s6.5-5.3 6.5-10.2A6.5 6.5 0 0 0 5.5 10.8C5.5 15.7 12 21 12 21Z"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinejoin="round"
    />
    <circle cx="12" cy="10.5" r="2.2" stroke="currentColor" strokeWidth="1.3" />
  </svg>
);

const BuildingIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden>
    <path
      d="M5 20V6.5L12 3l7 3.5V20M3 20h18M9.5 20v-4.5h5V20"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinejoin="round"
    />
  </svg>
);

const Contact = ({ contact }: ContactProps) => {
  const [formStatus, setFormStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!contact.formEndpoint) {
      setFormStatus("error");
      setTimeout(() => setFormStatus("idle"), 6000);
      return;
    }
    setFormStatus("submitting");

    try {
      const response = await fetch(contact.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormStatus("success");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        setFormStatus("error");
      }
    } catch {
      setFormStatus("error");
    } finally {
      setTimeout(() => setFormStatus("idle"), 6000);
    }
  };

  const details = [
    { label: "Email", value: contact.email, href: contact.email ? `mailto:${contact.email}` : "", Icon: MailIcon },
    { label: "Location", value: contact.location, href: "", Icon: PinIcon },
    { label: "Institution", value: contact.institution, href: "", Icon: BuildingIcon },
  ].filter((detail) => detail.value);

  const socialLinks = [
    { href: contact.linkedin, label: "LinkedIn" },
    { href: contact.facebook, label: "Facebook" },
    { href: contact.instagram, label: "Instagram" },
    { href: contact.youtube, label: "YouTube" },
  ].filter((social) => social.href);

  return (
    <SectionShell
      index="08"
      label="Contact"
      title={
        <>
          Let&apos;s work <em className="not-italic text-gold-soft">together</em>.
        </>
      }
      intro="Collaboration, consulting, research partnerships or academic mentoring — I would be glad to hear from you."
    >
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div>
          <Reveal>
            <p className="prose-muted max-w-md text-[0.95rem]">
              {contact.intro}
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <dl className="mt-9 divide-y divide-line border-y border-line">
              {details.map(({ label, value, href, Icon }) => (
                <div key={label} className="flex items-start gap-4 py-4">
                  <dt className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line text-gold-soft">
                    <Icon />
                  </dt>
                  <dd className="min-w-0">
                    <span className="block text-[0.58rem] uppercase tracking-[0.2em] text-muted">
                      {label}
                    </span>
                    {href ? (
                      <a
                        href={href}
                        className="mt-1 block break-all text-sm text-ink-soft transition-colors hover:text-gold-soft"
                      >
                        {value}
                      </a>
                    ) : (
                      <span className="mt-1 block text-sm text-ink-soft">
                        {value}
                      </span>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          {socialLinks.length > 0 && (
            <Reveal delay={0.14}>
              <div className="mt-8">
                <p className="text-[0.58rem] uppercase tracking-[0.2em] text-muted">
                  Elsewhere
                </p>
                <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-arrow uppercase"
                    >
                      {social.label} <span aria-hidden>↗</span>
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>
          )}
        </div>

        <Reveal delay={0.1}>
          <div className="glass rounded-2xl p-6 sm:p-9">
            <h3 className="font-display text-2xl text-ink">Send a message</h3>
            <p className="mt-2 text-sm text-muted">
              I usually respond within two working days.
            </p>

            <form onSubmit={handleSubmit} className="mt-7 space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="firstName"
                    className="text-[0.58rem] uppercase tracking-[0.2em] text-muted"
                  >
                    First name
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    autoComplete="given-name"
                    className="field"
                    placeholder="Your first name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="text-[0.58rem] uppercase tracking-[0.2em] text-muted"
                  >
                    Last name
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    autoComplete="family-name"
                    className="field"
                    placeholder="Your last name"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="text-[0.58rem] uppercase tracking-[0.2em] text-muted"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  autoComplete="email"
                  className="field"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="text-[0.58rem] uppercase tracking-[0.2em] text-muted"
                >
                  Subject
                </label>
                <input
                  id="subject"
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="field"
                  placeholder="What is this about?"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="text-[0.58rem] uppercase tracking-[0.2em] text-muted"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  className="field resize-none"
                  placeholder="Tell me about your project or inquiry…"
                />
              </div>

              {formStatus === "success" && (
                <p
                  role="status"
                  className="rounded-xl border border-accent/30 bg-accent/[0.08] p-4 text-sm text-accent-soft"
                >
                  Message sent — thank you. I will get back to you shortly.
                </p>
              )}

              {formStatus === "error" && (
                <p
                  role="alert"
                  className="rounded-xl border border-red-400/30 bg-red-500/[0.08] p-4 text-sm text-red-200"
                >
                  {contact.formEndpoint ? (
                    "Something went wrong. Please try again in a moment."
                  ) : (
                    <>
                      The message form is not connected yet. Please email me
                      directly at{" "}
                      <a
                        href={`mailto:${contact.email}`}
                        className="underline underline-offset-2"
                      >
                        {contact.email}
                      </a>
                      .
                    </>
                  )}
                </p>
              )}

              <button
                type="submit"
                disabled={formStatus === "submitting"}
                className="btn btn-accent w-full disabled:cursor-not-allowed disabled:opacity-60"
              >
                {formStatus === "submitting" ? "Sending…" : "Send message"}
              </button>
            </form>
          </div>
        </Reveal>
      </div>
    </SectionShell>
  );
};

export default Contact;
