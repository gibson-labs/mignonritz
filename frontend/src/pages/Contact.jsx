import React from "react";
import { motion } from "framer-motion";
import { Mail, Linkedin, Instagram } from "lucide-react";
import ContactForm from "@/components/contact/ContactForm";

const socials = [
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/mignon-ritz/" },
  { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/mig.ritz/" },
  { icon: Mail, label: "Email", href: "mailto:mignonritz29@gmail.com" },
];

export default function Contact() {
  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-3">
            Get In Touch
          </h1>
          <p className="text-muted-foreground font-body text-lg max-w-xl">
            I'd love to hear from you — whether it's a project, collaboration, or just to say hello.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Left column — About & links */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2 space-y-8"
          >
            <div>
              <h2 className="font-heading text-xl font-semibold text-foreground mb-3">About Me</h2>
              <p className="text-muted-foreground font-body leading-relaxed">
                I'm a marketing professional passionate about building brands, analyzing data, and
                creating content that resonates. With experience spanning social media, data analytics,
                product marketing, and print design, I bring a versatile toolkit to every project.
              </p>
            </div>

            <div>
              <h3 className="font-heading text-lg font-semibold text-foreground mb-4">Connect</h3>
              <div className="flex gap-3">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                    aria-label={s.label}
                  >
                    <s.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

          </motion.div>

          {/* Right column — Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="bg-card rounded-2xl border border-border p-6 sm:p-8">
              <ContactForm />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}