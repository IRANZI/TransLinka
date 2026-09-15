"use client";
import React, { useState } from "react";
import {
  User,
  Mail,
  MapPin,
  Phone,
  Send,
  MessageCircle,
  Twitter,
  Linkedin,
} from "lucide-react";
import { api } from "@/lib/api";

export default function ContactPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");
    try {
      await api("/api/public/contact", { method: "POST", body: JSON.stringify(form) });
      setStatus("Message saved and emailed to the TransLinka team.");
      setForm({ firstName: "", lastName: "", email: "", subject: "", message: "" });
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Could not send message");
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="bg-white py-14 sm:py-16 lg:py-20">
      <div className="page-wrap">
        <div className="mx-auto mb-10 max-w-2xl text-center lg:mb-14">
          <h2 className="text-section text-navy-900">Get in touch</h2>
          <p className="mx-auto mt-4 max-w-2xl text-body-lg text-navy-600">
            Questions about TransLinka? Reach our team and we will get back to
            you as soon as possible.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-soft">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-5 sm:p-8 lg:p-12">
              <h3 className="text-subhead text-navy-900">Send us a message</h3>
              <form className="mt-6 space-y-5 sm:mt-8 sm:space-y-6" onSubmit={onSubmit}>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-navy-700">
                      First name
                    </label>
                    <div className="relative">
                      <input name="firstName" value={form.firstName} onChange={onChange} type="text" placeholder="John" className="input-field" required />
                      <User className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-400" />
                    </div>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-navy-700">
                      Last name
                    </label>
                    <div className="relative">
                      <input name="lastName" value={form.lastName} onChange={onChange} type="text" placeholder="Doe" className="input-field" required />
                      <User className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-400" />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-navy-700">
                    Email address
                  </label>
                  <div className="relative">
                    <input name="email" value={form.email} onChange={onChange} type="email" placeholder="john.doe@email.com" className="input-field" required />
                    <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-400" />
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-navy-700">
                    Subject
                  </label>
                  <input
                    name="subject"
                    value={form.subject}
                    onChange={onChange}
                    type="text"
                    placeholder="How can we help?"
                    className="input-field !pl-4"
                    required
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-navy-700">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={onChange}
                    rows={6}
                    placeholder="Write your message here..."
                    className="input-field !pl-4 resize-none"
                    required
                  />
                </div>
                {status && <p className="text-sm text-navy-700">{status}</p>}
                <button type="submit" className="btn-primary w-full sm:w-auto" disabled={loading}>
                  {loading ? "Sending…" : "Send message"}
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </div>

            <div className="border-t border-navy-100 bg-navy-50 p-5 sm:p-8 lg:border-l lg:border-t-0 lg:p-12">
              <h3 className="text-subhead text-navy-900">Contact information</h3>
              <div className="mt-8 space-y-7">
                {[
                  { icon: MapPin, title: "Headquarters", value: "Kigali, Rwanda" },
                  { icon: Mail, title: "Email", value: "iradianah5@gmail.com", href: "mailto:iradianah5@gmail.com" },
                  { icon: Phone, title: "Phone", value: "+250-722-500-692" },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-navy-700 text-white">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-navy-900">{item.title}</h4>
                      {"href" in item && item.href ? (
                        <a
                          href={item.href}
                          className="mt-1 block text-body text-navy-600 hover:text-navy-800 hover:underline"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="mt-1 text-body text-navy-600">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-10">
                <h4 className="mb-4 text-lg font-semibold text-navy-900">Follow us</h4>
                <div className="flex gap-3">
                  {[MessageCircle, Twitter, Linkedin].map((Icon, index) => (
                    <a
                      key={index}
                      href="#"
                      className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-navy-700 shadow-soft transition hover:bg-navy-700 hover:text-white"
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
