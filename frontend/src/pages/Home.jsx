import React from "react";
import { motion } from "framer-motion";
import {
  GlobeAltIcon,
  SparklesIcon,
  MapIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";

const tripsSample = [
  { id: 1, title: "Goa Weekend Escape", days: 3, tag: "Beach" },
  { id: 2, title: "Himalayan Roadtrip", days: 6, tag: "Mountains" },
  { id: 3, title: "Rann of Kutch", days: 4, tag: "Desert" },
  { id: 4, title: "Kerala Backwaters", days: 5, tag: "Relax" },
  { id: 5, title: "Ladakh Adventure", days: 7, tag: "Adventure" },
  { id: 6, title: "Andaman Islands", days: 5, tag: "Islands" },
];

function TopNav() {
  return (
    <header className="w-full py-5 px-6 md:px-12 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div
          className="w-11 h-11 rounded-lg flex items-center justify-center text-white font-black"
          style={{ background: "linear-gradient(135deg,#6C5CE7,#00B894)" }}
        >
          TM
        </div>
        <div className="font-semibold text-lg">TravMate</div>
      </div>

      <nav className="hidden md:flex items-center gap-6 text-sm">
        <button className="hover:text-tmPurple transition">Explore</button>
        <button className="hover:text-tmPurple transition">My Trips</button>
        <button className="px-4 py-2 rounded-lg bg-white text-primary font-medium shadow-soft transition hover:scale-105">
          Create Trip
        </button>
      </nav>

      <div className="md:hidden">
        <button className="p-2 rounded-md bg-white/60 backdrop-blur-sm">
          Menu
        </button>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="px-6 md:px-12 py-12 md:py-20 bg-hero">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <motion.h1
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-extrabold tracking-tight"
          >
            Plan trips you’ll actually remember
            <span
              className="block mt-3 text-transparent bg-clip-text"
              style={{ background: "linear-gradient(90deg,#6C5CE7,#00B894)" }}
            >
              — simple, social, magical.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="mt-4 text-gray-600 max-w-xl"
          >
            Build itineraries, discover local experiences, and share plans with
            friends. Save places, manage budgets, and travel smarter with
            TravMate.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="mt-6 flex gap-3"
          >
            <button className="px-5 py-3 rounded-xl bg-white font-semibold shadow-lg hover:scale-[1.02] transition">
              Start Planning
            </button>
            <button className="px-5 py-3 rounded-xl border border-gray-200 text-gray-700 hover:bg-white/60 transition">
              Explore Trips
            </button>
          </motion.div>

          <div className="mt-8 flex flex-wrap gap-3 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <span
                className="inline-block w-3 h-3 rounded-full"
                style={{ background: "#6C5CE7" }}
              />
              Popular this week
            </div>
            <div className="flex items-center gap-2">
              <span
                className="inline-block w-3 h-3 rounded-full"
                style={{ background: "#00B894" }}
              />
              7800+ trips planned
            </div>
          </div>
        </div>

        <div className="relative">
          <motion.div
            initial={{ scale: 0.98, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="w-full h-64 md:h-80 rounded-2xl shadow-glow overflow-hidden"
            style={{ background: "linear-gradient(135deg,#6C5CE7,#00B894)" }}
          >
            <div className="h-full w-full flex items-center justify-center text-white text-xl font-semibold">
              Your travel board — hero visual
            </div>
          </motion.div>

          <div className="absolute -left-6 -bottom-8 hidden md:block">
            <div className="w-44 p-3 rounded-2xl bg-white shadow-soft">
              <div className="text-sm font-semibold">Quick Trips</div>
              <div className="text-xs text-gray-500 mt-1">
                Top short itineraries
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Features() {
  const items = [
    {
      title: "Discover",
      desc: "Find curated spots & hidden gems",
      icon: <GlobeAltIcon className="w-6 h-6" />,
    },
    {
      title: "Plan",
      desc: "Drag-and-drop itinerary builder",
      icon: <MapIcon className="w-6 h-6" />,
    },
    {
      title: "Share",
      desc: "Invite friends & collaborate",
      icon: <UserCircleIcon className="w-6 h-6" />,
    },
    {
      title: "Inspire",
      desc: "Personalized suggestions",
      icon: <SparklesIcon className="w-6 h-6" />,
    },
  ];

  return (
    <section className="px-6 md:px-12 py-10">
      <div className="max-w-7xl mx-auto">
        <h3 className="text-xl font-semibold">What you can do</h3>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {items.map((it) => (
            <div key={it.title} className="p-4 rounded-xl bg-white shadow-soft">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-gray-100">{it.icon}</div>
                <div>
                  <div className="font-semibold">{it.title}</div>
                  <div className="text-sm text-gray-500">{it.desc}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TripsGrid() {
  return (
    <section className="px-6 md:px-12 pb-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-semibold">Popular Trips</h3>
          <div className="text-sm text-gray-500">Handpicked for you</div>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {tripsSample.map((trip) => (
            <motion.article
              key={trip.id}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.18 }}
              className="rounded-2xl overflow-hidden bg-white shadow-soft"
            >
              <div className="h-44 bg-gray-100 flex items-center justify-center text-gray-600">
                <div className="text-lg font-semibold">{trip.title}</div>
              </div>

              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div className="font-semibold">{trip.title}</div>
                  <div className="text-sm text-gray-500">{trip.days} days</div>
                </div>

                <p className="mt-2 text-sm text-gray-500">
                  A memorable trip to {trip.tag.toLowerCase()} spots and local
                  experiences.
                </p>

                <div className="mt-4 flex gap-2 items-center">
                  <button className="px-3 py-2 rounded-lg text-sm border border-gray-200">
                    Open
                  </button>
                  <button className="px-3 py-2 rounded-lg text-sm bg-gradient-to-r from-tmPurple to-tmGreen text-white font-medium">
                    Book
                  </button>
                  <div className="ml-auto text-xs text-gray-400">Saved</div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="px-6 md:px-12 py-8 bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-gray-600 text-sm">
          © 2025 TravMate. All rights reserved.
        </div>
        <div className="flex gap-4">
          <a href="#" className="text-gray-600 hover:text-tmPurple transition">
            Twitter
          </a>
          <a href="#" className="text-gray-600 hover:text-tmPurple transition">
            Instagram
          </a>
          <a href="#" className="text-gray-600 hover:text-tmPurple transition">
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <>
      <TopNav />
      <Hero />
      <Features />
      <TripsGrid />
      <Footer />
    </>
  );
}
