"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import PetalFall from "./PetalFall";

interface LandingPageProps {
    onOpen: () => void;
    guestName?: string;
}

export default function LandingPage({ onOpen, guestName = "MRS. LIM CHARKYA & HUSBAND" }: LandingPageProps) {
    const [isOpening, setIsOpening] = useState(false);

    const handleOpen = () => {
        setIsOpening(true);
        setTimeout(onOpen, 1000); // Cross-fade duration
    };

    return (
        <AnimatePresence>
            {!isOpening && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-[#FCF8F4] overflow-hidden"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                >
                    {/* Flow Drop Animation */}
                    <PetalFall />

                    {/* Main Background Image */}
                    <div className="absolute inset-0 z-0">
                        <Image
                            src="/main_view.jpg"
                            alt="Background"
                            fill
                            className="object-cover"
                            priority
                        />
                        <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px]"></div>
                    </div>

                    {/* Smooth Radial Gradient Background Overlay */}
                    <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#FCF8F4_80%)] opacity-60" />

                    {/* Elegant Corner Ornaments (Positive Floral Style) */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
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

                    {/* Content Container */}
                    <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-lg">
                        {/* Refined Text Monogram */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                            className="mb-8"
                        >
                            {/* Ceremony Title */}
                            <h2 className="font-[family-name:var(--font-moul)] text-2xl md:text-3xl text-[#5D4037] mb-6 drop-shadow-sm whitespace-nowrap">
                                ពិធីចូលស្ដីដណ្ដឹង
                            </h2>

                            {/* Names */}
                            <h1 className="font-kasaet font-bold text-5xl md:text-7xl text-gold-shimmer drop-shadow-sm select-none leading-tight">
                                ធានុន <span className="text-3xl md:text-5xl align-middle text-gold/80">&</span> លីហ្សា
                            </h1>
                            <div className="h-[1px] w-32 bg-gradient-to-r from-transparent via-gold/40 to-transparent mx-auto mt-6" />
                        </motion.div>

                        {/* Full Invitation Message */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 0.8 }}
                            className="mb-10 text-charcoal"
                        >
                            <h3 className="font-[family-name:var(--font-moul)] text-lg md:text-xl mb-4">
                                សូមគោរពអញ្ជើញ
                            </h3>
                            <p className="font-[family-name:var(--font-siemreap)] text-base md:text-lg leading-relaxed max-w-lg font-medium">
                                បងប្អូន អ៊ំពូមីង និងមិត្តភ័ក្តិជិតដិតទាំងអស់ ចូលរួមផ្តល់ជាកម្លាំងចិត្ត និងផ្តល់ភាពកក់ក្តៅដល់រូបខ្ញុំ/យើងខ្ញុំ ក្នុងកម្មវិធី កុំបីខាន។
                            </p>
                        </motion.div>

                        {/* Elegant Open Button */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 1.5 }}
                            className="relative"
                        >
                            {/* Subtle outer glow pulse */}
                            <motion.div
                                className="absolute inset-0 bg-gold/20 rounded-lg blur-xl"
                                animate={{
                                    opacity: [0.2, 0.4, 0.2],
                                    scale: [1, 1.1, 1],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            />

                            <motion.button
                                onClick={handleOpen}
                                whileHover={{ scale: 1.05, backgroundColor: "#4E342E" }}
                                whileTap={{ scale: 0.98 }}
                                className="relative z-10 bg-[#5D4037] text-white font-[family-name:var(--font-siemreap)] py-3.5 px-10 rounded-lg text-lg md:text-xl shadow-2xl transition-all duration-500 overflow-hidden group"
                            >
                                <span className="relative z-10">បើកលិខិតអញ្ជើញ</span>

                                {/* Shine effect on hover */}
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full transition-transform duration-1000 group-hover:translate-x-full"
                                />
                            </motion.button>

                            {/* Animated Hand (Overlapping Button) */}
                            <motion.div
                                className="absolute left-1/2 -translate-x-1/2 -bottom-6 md:-bottom-8 pointer-events-none z-30"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{
                                    opacity: 1,
                                    y: [0, -10, 0],
                                    scale: [1, 0.9, 1],
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: 2,
                                }}
                            >
                                <Image
                                    src="/hand-icon-final.png"
                                    alt="Click to open"
                                    width={60}
                                    height={60}
                                    className="w-12 h-12 md:w-16 md:h-16 drop-shadow-md -rotate-45"
                                />
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* Subtle floating bottom text or details */}
                    <motion.div
                        className="absolute bottom-8 left-0 right-0 text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2, duration: 1 }}
                    >
                        <p className="font-[family-name:var(--font-inter)] text-[10px] text-charcoal-light/60 tracking-[0.5em] uppercase">
                            Theanun & Liza • 2026
                        </p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
