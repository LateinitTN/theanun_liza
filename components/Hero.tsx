"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { HiChevronDown } from "react-icons/hi2";
import JoinTracker from "./JoinTracker";

interface HeroProps {
    groomName: string;
    brideName: string;
    date: string;
    time: string;
    location: string;
}

export default function Hero({
    groomName,
    brideName,
    date,
    time,
    location,
}: HeroProps) {
    return (
        <section
            id="hero"
            className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#FCF8F4]"
        >
            {/* Background Image - Smooth & Beautiful */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/main_view.jpg"
                    alt="Background"
                    fill
                    className="object-cover object-[center_75%] opacity-20"
                    priority
                />
                {/* Gradient Overlay for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#FCF8F4]/30 via-transparent to-[#FCF8F4]/80" />
            </div>

            {/* Background subtle pattern (Optional overlay) */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, #D4AF37 1px, transparent 0)`,
                    backgroundSize: '40px 40px',
                }}
            />

            {/* Elegant Corner Ornaments (Positive Floral Style) */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                <Image
                    src="/gold-corner-positive.png"
                    alt=""
                    width={250}
                    height={250}
                    className="absolute -top-4 -left-4 w-40 md:-top-10 md:-left-10 md:w-56 -scale-y-100"
                />
                <Image
                    src="/gold-corner-positive.png"
                    alt=""
                    width={250}
                    height={250}
                    className="absolute -top-4 -right-4 w-40 md:-top-10 md:-right-10 md:w-56 rotate-180"
                />
                <Image
                    src="/gold-corner-positive.png"
                    alt=""
                    width={250}
                    height={250}
                    className="absolute -bottom-4 -left-4 w-40 md:-bottom-10 md:-left-10 md:w-56"
                />
                <Image
                    src="/gold-corner-positive.png"
                    alt=""
                    width={250}
                    height={250}
                    className="absolute -bottom-4 -right-4 w-40 md:-bottom-10 md:-right-10 md:w-56 -scale-x-100"
                />
            </div>

            {/* Small floating petals */}
            {[...Array(5)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute text-rose/30 text-2xl z-0"
                    style={{
                        left: `${15 + i * 18}%`,
                        top: `${20 + (i % 3) * 25}%`,
                    }}
                    animate={{
                        y: [0, -20, 0],
                        rotate: [0, 10, -5, 0],
                        opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                        duration: 5 + i,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.7,
                    }}
                >
                    ✿
                </motion.div>
            ))}

            {/* Main content */}
            <div className="relative z-10 text-center px-6 max-w-2xl">
                <motion.p
                    className="font-[family-name:var(--font-siemreap)] text-charcoal-light text-sm uppercase mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                >
                    ពិធីចូលស្ដីដណ្ដឹង
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.7 }}
                >
                    <h1 className="relative font-kasaet font-bold text-3xl md:text-5xl lg:text-6xl text-charcoal leading-relaxed py-4 drop-shadow-sm">
                        <span className="block text-charcoal transform hover:scale-105 transition-transform duration-500 cursor-default whitespace-nowrap">
                            {groomName}
                        </span>
                        <span className="text-gold-shimmer text-xl md:text-2xl lg:text-3xl my-3 md:my-5 block font-[family-name:var(--font-playfair)] italic font-light opacity-80">
                            &amp;
                        </span>
                        <span className="block text-charcoal transform hover:scale-105 transition-transform duration-500 cursor-default whitespace-nowrap">
                            {brideName}
                        </span>
                    </h1>
                </motion.div>

                {/* Ornamental divider */}
                <motion.div
                    className="ornament-divider my-8 max-w-xs mx-auto"
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 1.2 }}
                >
                    <span className="text-gold text-xl">♦</span>
                </motion.div>

                <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.4 }}
                >
                    <p className="font-[family-name:var(--font-siemreap)] text-xl md:text-2xl text-charcoal">
                        {date}
                    </p>
                    <p className="font-[family-name:var(--font-siemreap)] text-charcoal-light text-base mt-2">
                        {time}
                    </p>
                    <p className="font-[family-name:var(--font-siemreap)] text-charcoal-light text-sm mt-2">
                        {location}
                    </p>

                    <div className="pt-6">
                        <JoinTracker />
                    </div>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
            >

                <HiChevronDown className="text-gold text-2xl animate-bounce-soft" />
            </motion.div>
        </section>
    );
}
