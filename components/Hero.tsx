"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import BusScene3D from "./BusScene3D";
import { api } from "@/lib/api";

export default function Hero() {
  const [stats, setStats] = useState({ travelers: 0, routes: 0 });

  useEffect(() => {
    api<{ travelers: number; routes: number }>("/api/public/stats")
      .then((data) => setStats(data))
      .catch(() => undefined);
  }, []);
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-navy-950 text-white">
      <BusScene3D />

      <div className="page-wrap relative z-10 flex min-h-[100svh] items-center pb-16 pt-28 md:pt-32">
        <div className="w-full max-w-3xl">
          <div className="mb-5 inline-flex items-center rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-sm font-medium text-white/90 backdrop-blur-md sm:px-4">
            Real-time bus booking across Rwanda
          </div>

          <h1 className="text-display max-w-[18ch] text-white">
            Smart bus travel{" "}
            <span className="text-navy-200">made simple</span>
          </h1>

          <p className="mt-5 max-w-[56ch] text-body-lg text-white/80 sm:mt-6">
            Book seats in seconds, track your coach live, and board with a
            digital ticket. A calmer way to move between cities.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row">
            <Link href="/signup" className="btn-primary bg-white text-navy-900 hover:bg-navy-50">
              Start your journey
              <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
            <Link
              href="/signin"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/10 sm:px-6 sm:text-base"
            >
              Sign in
            </Link>
          </div>

          <div className="mt-10 grid max-w-lg grid-cols-3 gap-4 border-t border-white/15 pt-6 sm:mt-12">
            <div>
              <p className="text-xl font-bold sm:text-2xl">{stats.travelers || "—"}</p>
              <p className="text-xs text-white/65 sm:text-sm">Travelers</p>
            </div>
            <div>
              <p className="text-xl font-bold sm:text-2xl">{stats.routes || "—"}</p>
              <p className="text-xs text-white/65 sm:text-sm">Daily routes</p>
            </div>
            <div>
              <p className="text-xl font-bold sm:text-2xl">99.9%</p>
              <p className="text-xs text-white/65 sm:text-sm">Uptime</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
