"use client";

import { useState } from "react";
import Hero from "@/components/Hero";
import Countdown from "@/components/Countdown";
import Story from "@/components/Story";
import Gallery from "@/components/Gallery";
import EventDetails from "@/components/EventDetails";
import RSVPForm from "@/components/RSVPForm";
import MusicToggle from "@/components/MusicToggle";
import PetalFall from "@/components/PetalFall";
import Footer from "@/components/Footer";
import LandingPage from "@/components/LandingPage";
import { motion, AnimatePresence } from "framer-motion";

const galleryPhotos = [
  { url: "/1.jpg", rotation: -2, caption: "Precious Moment" },
  { url: "/2.jpg", rotation: 3, caption: "Love Story" },
  { url: "/3.jpg", rotation: -1, caption: "Memories" },
  { url: "/4.jpg", rotation: 2, caption: "Together" },
  { url: "/5.jpg", rotation: -3, caption: "Forever" },
  { url: "/6.jpg", rotation: 1, caption: "Journey" },
  { url: "/7.jpg", rotation: -2, caption: "Happiness" },
  { url: "/8.jpg", rotation: 3, caption: "Us" },
];

const weddingEvents = [
  {
    title: "ពិធីចូលស្ដីដណ្ដឹង",
    date: "១៣ មេសា ឆ្នាំ ២០២៦",
    time: "ម៉ោង ០៧:០០ ព្រឹក — ១១:០០ ព្រឹក",
    venue: "ភូមិខ្នារ សង្កាត់ជ្រាវ",
    address: "ក្រុងសៀមរាប ខេត្តសៀមរាប",
    mapUrl: "https://www.google.com/maps?q=13.3418056,103.8930278",
  },
];

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <main className="relative overflow-x-hidden min-h-screen">
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <LandingPage key="landing" onOpen={() => setIsOpen(true)} />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          >
            {/* Floating petals overlay */}
            <PetalFall />

            {/* Music toggle button */}
            <MusicToggle />

            {/* Hero / Cover Section */}
            <Hero
              groomName="រ៉ាន់ សម្បត្តិមេធានុន"
              brideName="វ៉ាន់ ចាន់លីហ្សា"
              date="១៣ មេសា ឆ្នាំ ២០២៦"
              time="ថ្ងៃចន្ទ ១១រោច ខែចេត្រ ឆ្នាំម្សាញ់ សប្ដស័ក ព.ស. ២៥៦៩"
              location="ក្រុងសៀមរាប, ខេត្តសៀមរាប"
            />

            {/* Countdown Timer */}
            <Countdown targetDate="2026-04-13T07:00:00" />

            {/* Our Bride & Groom */}
            <Story
              title="កូនប្រុស & កូនស្រី"
              subtitle="សូមណែនាំ"
              groom={{
                name: "រ៉ាន់ សម្បត្តិមេធានុន",
                photo: "/groom-v2.jpg",
                role: "កូនប្រុស",
                bio: "យុវជនចិត្តល្អ ដែលតែងតែញញឹមស្វាគមន៍រាល់គ្នា។",
              }}
              bride={{
                name: "វ៉ាន់ ចាន់លីហ្សា",
                photo: "/bride-v2.jpg",
                role: "កូនស្រី",
                bio: "នារីដែលមានចរិតស្លូតបូត និងគួរឱ្យស្រឡាញ់។",
              }}
            />

            {/* Photo Gallery */}
            <Gallery photos={galleryPhotos} />

            {/* Event Details */}
            <EventDetails events={weddingEvents} />

            {/* RSVP Form */}
            <RSVPForm />

            {/* Footer */}
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
