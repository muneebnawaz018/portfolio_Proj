"use client";

import type React from "react";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Mail, MapPin, Send, AlertCircle, Share2 } from "lucide-react";
import { GithubIcon, UpworkIcon, FiverrIcon } from "@/components/brand-icons";
import emailjs from "@emailjs/browser";

// Module-scope so its identity is stable across renders (a component defined
// inside Contact would remount on every keystroke and trip Fast Refresh).
const FieldError = ({ msg }: { msg?: string }) =>
  msg ? (
    <p className="mt-1.5 flex items-center gap-1.5 text-sm text-red-500 dark:text-red-400">
      <AlertCircle size={14} className="shrink-0" />
      <span>{msg}</span>
    </p>
  ) : null;

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const form = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const clearError = (field: string) =>
    setErrors((prev) => (prev[field] ? { ...prev, [field]: "" } : prev));

  // Shared input styling. Turns the ring and border red when a field has an
  // error so validation reads in-theme instead of the browser's native bubble.
  const fieldClass = (err?: string) =>
    `w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors ${
      err
        ? "border-red-400 dark:border-red-500"
        : "border-gray-300 dark:border-gray-600"
    }`;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 },
    },
  };

  const validateForm = () => {
    if (!form.current) return false;

    const formElements = form.current.elements as HTMLFormControlsCollection;
    const val = (n: string) =>
      (
        formElements.namedItem(n) as HTMLInputElement | HTMLTextAreaElement
      )?.value.trim() ?? "";

    const name = val("user_name");
    const email = val("user_email");
    const subject = val("subject");
    const message = val("message");

    const next: Record<string, string> = {};
    if (!name) next.user_name = "Please enter your name.";
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) next.user_email = "Please enter your email.";
    else if (!emailPattern.test(email))
      next.user_email = "Enter a valid email address.";
    if (!subject) next.subject = "Please add a subject.";
    if (!message) next.message = "Please write a message.";

    setErrors(next);
    setSubmitError("");

    const firstInvalid = Object.keys(next)[0];
    if (firstInvalid) {
      (formElements.namedItem(firstInvalid) as HTMLElement | null)?.focus();
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm() || !form.current) {
      return;
    }

    setIsSubmitting(true);

    const formElements = form.current.elements as HTMLFormControlsCollection;
    const templateParams = {
      to_name: "Muneeb Nawaz",
      from_name: (formElements.namedItem("user_name") as HTMLInputElement)
        ?.value,
      from_email: (formElements.namedItem("user_email") as HTMLInputElement)
        ?.value,
      subject: (formElements.namedItem("subject") as HTMLInputElement)?.value,
      message: (formElements.namedItem("message") as HTMLTextAreaElement)
        ?.value,
    };

    if (
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID &&
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID &&
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
    ) {
      // Using environment variables for EmailJS credentials
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
      emailjs.send(serviceId, templateId, templateParams, publicKey).then(
        (result) => {
          console.log(result.text);
          setSubmitSuccess(true);
          form.current?.reset();
          setErrors({});
          setIsSubmitting(false);

          // Reset success message after 5 seconds
          setTimeout(() => {
            setSubmitSuccess(false);
          }, 5000);
        },
        (error) => {
          console.log("Error sending email:", error.text);
          setSubmitError("Failed to send message. Please try again later.");
          setIsSubmitting(false);
        },
      );
    }
  };

  const contactInfo: {
    icon: React.ReactNode;
    title: string;
    value: string;
    link?: string;
  }[] = [
    {
      icon: <MapPin className="w-7 h-7 text-purple-600 dark:text-purple-400" />,
      title: "Location",
      // No link: this is a way of working, not a place to open a map on.
      value: "Remote (Worldwide)",
    },
  ];

  // Three equal rows now, so each card is taller. A frosted surface over the
  // aurora, with the gradient-border ring appearing on hover; the icon well
  // carries the purple->blue signature. flex-1 unused: lg:grid rows own height.
  // min-h so the three cards are equal on mobile too, where there is no form
  // height for the lg grid rows to borrow from.
  const cardShell =
    "flex items-center gap-4 p-5 min-h-[132px] rounded-2xl bg-white/80 dark:bg-gray-800/50 backdrop-blur-md shadow-sm ring-1 ring-gray-200/70 dark:ring-white/10 gradient-border transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10";

  // Icon well: the purple->blue signature in a soft gradient disc, sized on the
  // 44px+ touch grid so it doubles as a comfortable tap area.
  const iconWell =
    "shrink-0 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/40 dark:to-blue-900/20 ring-1 ring-purple-200/60 dark:ring-purple-400/15";

  const socialLinks = [
    {
      icon: <Mail className="w-6 h-6" />,
      name: "Email",
      link: "mailto:muneeb.fusion@gmail.com",
    },
    {
      icon: <GithubIcon className="w-6 h-6" />,
      name: "GitHub",
      link: "https://github.com/muneebnawaz018",
    },
    {
      icon: <FiverrIcon className="w-6 h-6" />,
      name: "Fiverr",
      link: "https://www.fiverr.com/s/KerqVVW",
    },
    {
      icon: <UpworkIcon className="w-6 h-6" />,
      name: "Upwork",
      link: "https://www.upwork.com/freelancers/~01113fcaa500ee9108?mp_source=share",
    },
  ];

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="space-y-12"
        >
          <motion.div
            variants={itemVariants}
            className="text-center max-w-3xl mx-auto space-y-4"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Get In <span className="gradient-text">Touch</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Have a project in mind or want to collaborate? Feel free to reach
              out to me for consulting, development work, or just to connect.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Every card shares one anatomy: a round icon on the left, a title
                and its content on the right. On lg the column is a 3-row grid
                with equal (1fr) rows, so the cards are pixel-identical in height
                and the column still ends level with the form beside it. */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-1 flex flex-col gap-6 lg:grid lg:grid-rows-3"
            >
              {contactInfo.map((info, index) => {
                const card = (
                  <>
                    <div className={iconWell}>{info.icon}</div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {info.title}
                      </h3>
                      <p className="text-[15px] text-gray-600 dark:text-gray-400">
                        {info.value}
                      </p>
                    </div>
                  </>
                );
                return info.link ? (
                  <a
                    key={index}
                    href={info.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${cardShell} hover:-translate-y-0.5`}
                  >
                    {card}
                  </a>
                ) : (
                  <div key={index} className={cardShell}>
                    {card}
                  </div>
                );
              })}

              <div className={cardShell}>
                <div className={iconWell}>
                  <Share2 className="w-7 h-7 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2.5">
                    Connect With Me
                  </h3>
                  {/* Named pills, echoing the hero's. The icon alone left people
                      guessing which service each grey circle was. */}
                  <div className="flex flex-wrap gap-2">
                    {socialLinks.map((social, index) => (
                      <a
                        key={index}
                        href={social.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/pill inline-flex items-center gap-2 rounded-full bg-gray-100 dark:bg-gray-700 py-1.5 pl-1.5 pr-3.5 text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors hover:bg-purple-100 dark:hover:bg-purple-900/30 hover:text-purple-600 dark:hover:text-purple-400"
                      >
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white dark:bg-gray-600 [&_svg]:w-4 [&_svg]:h-4">
                          {social.icon}
                        </span>
                        {social.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              <div className={cardShell}>
                {/* Green well, not the purple signature: this is a live status,
                    so the colour carries the same meaning as the pulsing dot. */}
                <div className="shrink-0 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/40 dark:to-emerald-900/20 ring-1 ring-green-300/60 dark:ring-green-400/20">
                  <span className="relative flex h-4 w-4 items-center justify-center">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75 motion-reduce:animate-none" />
                    <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500" />
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Available for new projects
                  </h3>
                  <p className="text-[15px] text-gray-600 dark:text-gray-400">
                    Usually replies within a day.
                  </p>
                </div>
              </div>
            </motion.div>

            <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 gradient-border">
              <form
                ref={form}
                onSubmit={handleSubmit}
                noValidate
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="user_name"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="user_name"
                      name="user_name"
                      required
                      aria-invalid={!!errors.user_name}
                      onChange={() => clearError("user_name")}
                      className={fieldClass(errors.user_name)}
                      placeholder="John Doe"
                    />
                    <FieldError msg={errors.user_name} />
                  </div>
                  <div>
                    <label
                      htmlFor="user_email"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="user_email"
                      name="user_email"
                      required
                      aria-invalid={!!errors.user_email}
                      onChange={() => clearError("user_email")}
                      className={fieldClass(errors.user_email)}
                      placeholder="john@example.com"
                    />
                    <FieldError msg={errors.user_email} />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    aria-invalid={!!errors.subject}
                    onChange={() => clearError("subject")}
                    className={fieldClass(errors.subject)}
                    placeholder="Project Inquiry"
                  />
                  <FieldError msg={errors.subject} />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    aria-invalid={!!errors.message}
                    onChange={() => clearError("message")}
                    className={`${fieldClass(errors.message)} resize-none`}
                    placeholder="Your message here..."
                  ></textarea>
                  <FieldError msg={errors.message} />
                </div>
                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-medium rounded-full ring-1 ring-white/20 hover:brightness-110 hover:shadow-lg hover:shadow-purple-500/40 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 animate-pulse-glow hover:scale-105"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </div>
                {submitSuccess && (
                  <div className="p-3 rounded-lg border border-green-200 dark:border-green-800/50 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400">
                    Your message has been sent successfully!
                    <span className="gradient-text">&nbsp;Muneeb</span> will get
                    back to you soon.
                  </div>
                )}
                {submitError && (
                  <div className="flex items-center gap-2 p-3 rounded-lg border border-red-200 dark:border-red-800/50 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400">
                    <AlertCircle size={16} className="shrink-0" />
                    <span>{submitError}</span>
                  </div>
                )}
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
