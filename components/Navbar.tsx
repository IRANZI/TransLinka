"use client";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const [activeLink, setActiveLink] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = [
      { id: "hero", name: "home" },
      { id: "download", name: "download" },
      { id: "features", name: "features" },
      { id: "how-it-works", name: "how-it-works" },
      { id: "contact", name: "contact" },
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionName = sections.find(
              (section) => section.id === entry.target.id,
            )?.name;
            if (sectionName) setActiveLink(sectionName);
          }
        });
      },
      {
        threshold: 0.28,
        rootMargin: "-80px 0px -80px 0px",
      },
    );

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const handleLinkClick = (linkName: string) => {
    setActiveLink(linkName);
    setIsMobileMenuOpen(false);
  };

  const light = !scrolled && activeLink === "home";

  const getLinkClasses = (linkName: string) => {
    const base = "text-sm font-medium transition-colors duration-300 xl:text-base";
    if (activeLink === linkName) {
      return `${base} ${light ? "text-white" : "text-navy-800"} border-b-2 border-navy-400 pb-1`;
    }
    return `${base} ${light ? "text-white/80 hover:text-white" : "text-navy-600 hover:text-navy-800"}`;
  };

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || isMobileMenuOpen
          ? "bg-white/95 shadow-soft backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="page-wrap flex items-center justify-between py-4">
        <Link href="/" className="flex items-center space-x-2">
          <img src="/logo.png" alt="TransLinka Logo" className="h-8 w-8 object-contain" />
          <span
            className={`text-lg font-semibold tracking-tight sm:text-xl ${
              light && !isMobileMenuOpen ? "text-white" : "text-navy-900"
            }`}
          >
            TransLinka
          </span>
        </Link>

        <div className="hidden items-center space-x-7 md:flex">
          {["home", "download", "features", "how-it-works", "contact"].map((link) => (
            <a
              key={link}
              href={`#${link === "home" ? "hero" : link}`}
              onClick={() => handleLinkClick(link)}
              className={getLinkClasses(link)}
            >
              {link.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
            </a>
          ))}
        </div>

        <div className="hidden items-center space-x-3 md:flex">
          <Link
            href="/signin"
            className={`rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
              light
                ? "border border-white/30 text-white hover:bg-white/10"
                : "border border-navy-200 text-navy-800 hover:bg-navy-50"
            }`}
          >
            Sign In
          </Link>
          <Link href="/signup" className="btn-primary !px-4 !py-2">
            Get started
          </Link>
        </div>

        <button
          className={`rounded-md p-2 transition-colors md:hidden ${
            light && !isMobileMenuOpen ? "text-white" : "text-navy-800"
          }`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <div
        className={`md:hidden overflow-hidden border-t border-navy-100 bg-white transition-all duration-300 ${
          isMobileMenuOpen ? "max-h-screen" : "max-h-0 border-t-0"
        }`}
      >
        <div className="page-wrap flex flex-col space-y-1 py-4">
          {["home", "download", "features", "how-it-works", "contact"].map((link) => (
            <a
              key={link}
              href={`#${link === "home" ? "hero" : link}`}
              onClick={() => handleLinkClick(link)}
              className={`rounded-lg px-3 py-3 text-base font-medium ${
                activeLink === link ? "bg-navy-50 text-navy-800" : "text-navy-700"
              }`}
            >
              {link.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
            </a>
          ))}
          <Link
            href="/signin"
            className="mt-2 rounded-xl border border-navy-200 py-3 text-center font-medium text-navy-800"
          >
            Sign In
          </Link>
          <Link href="/signup" className="btn-primary w-full">
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}
