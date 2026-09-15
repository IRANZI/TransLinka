import { Heart } from "lucide-react";
import Link from "next/link";

export default function FooterAndCTA() {
  return (
    <div>
      <section className="relative overflow-hidden bg-navy-900 py-14 text-white sm:py-16 lg:py-20">
        <img
          src="/illustrations/hero-bus-3d.png"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-navy-950/70" />
        <div className="page-wrap relative text-center">
          <h2 className="mx-auto max-w-[18ch] text-display text-white">
            Ready for a calmer commute?
          </h2>
          <p className="mx-auto mt-4 max-w-[46ch] text-body-lg text-navy-100/80">
            Join travelers who book, track, and board with TransLinka. Create a
            free account and start your next trip today.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
            <Link href="/signup" className="btn-primary bg-white text-navy-900 hover:bg-navy-50">
              Start your journey
            </Link>
            <Link
              href="/signin"
              className="inline-flex items-center justify-center rounded-xl border border-white/30 px-5 py-3 font-semibold text-white transition hover:bg-white/10 sm:px-6"
            >
              Sign in
            </Link>
          </div>
        </div>
      </section>

      <footer className="bg-navy-950 px-4 pb-8 pt-12 text-white sm:pt-14">
        <div className="page-wrap grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div className="sm:col-span-2 md:col-span-1">
            <div className="mb-4 flex items-center space-x-3">
              <img src="/logo.png" alt="TransLinka Logo" className="h-8 w-8 object-contain" />
              <span className="text-xl font-bold">TransLinka</span>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-navy-200 sm:text-base">
              Smart bus booking with live tracking, digital tickets, and a
              quieter way to travel.
            </p>
          </div>
          {[
            {
              title: "Product",
              links: ["Features", "Pricing", "API", "Downloads"],
            },
            {
              title: "Company",
              links: ["About", "Careers", "Press", "Blog"],
            },
            {
              title: "Support",
              links: ["Help Center", "Contact", "Privacy", "Terms"],
            },
          ].map((group) => (
            <div key={group.title}>
              <p className="mb-4 font-semibold">{group.title}</p>
              <ul className="space-y-2 text-sm text-navy-300">
                {group.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="transition-colors hover:text-white">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <hr className="page-wrap my-8 border-navy-800" />
        <div className="text-center text-sm text-navy-300">
          © 2026 <span className="font-semibold text-white">TransLinka</span>.
          All rights reserved. Built with
          <Heart className="mx-1 inline h-4 w-4 text-rose-400" /> for better
          transportation.
        </div>
      </footer>
    </div>
  );
}
