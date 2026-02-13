"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface CountdownProps {
    targetDate: string;
}

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

function calculateTimeLeft(targetDate: string): TimeLeft & { isPast: boolean } {
    const difference = new Date(targetDate).getTime() - new Date().getTime();

    if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
    }

    return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        isPast: false,
    };
}

function TimeUnit({ value, label }: { value: number; label: string }) {
    return (
        <div className="flex flex-col items-center">
            <div className="flip-card">
                <div className="relative w-[70px] h-[80px] md:w-[90px] md:h-[100px] bg-white rounded-xl shadow-lg border border-rose-light/30 flex items-center justify-center overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white to-transparent opacity-50" />
                    <div className="absolute top-1/2 left-2 right-2 h-[1px] bg-rose-light/20" />
                    <span className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-charcoal font-semibold relative z-10">
                        {String(value).padStart(2, "0")}
                    </span>
                </div>
            </div>
            <span className="font-[family-name:var(--font-siemreap)] text-xs text-charcoal-light tracking-[0.2em] uppercase mt-3">
                {label}
            </span>
        </div>
    );
}

function SkeletonUnit() {
    return (
        <div className="flex flex-col items-center">
            <div className="flip-card">
                <div className="relative w-[70px] h-[80px] md:w-[90px] md:h-[100px] bg-white rounded-xl shadow-lg border border-rose-light/30 flex items-center justify-center overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white to-transparent opacity-50" />
                    <div className="absolute top-1/2 left-2 right-2 h-[1px] bg-rose-light/20" />
                    <span className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-charcoal-light/30 font-semibold relative z-10">
                        --
                    </span>
                </div>
            </div>
            <span className="font-[family-name:var(--font-inter)] text-xs text-charcoal-light/30 tracking-[0.2em] uppercase mt-3">
                &nbsp;
            </span>
        </div>
    );
}

export default function Countdown({ targetDate }: CountdownProps) {
    const [timeLeft, setTimeLeft] = useState<(TimeLeft & { isPast: boolean }) | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        setTimeLeft(calculateTimeLeft(targetDate));

        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft(targetDate));
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    const isPast = timeLeft?.isPast ?? false;

    return (
        <section className="py-20 bg-[#FCF8F4] relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.03]">
                <div className="text-[300px] text-gold font-[family-name:var(--font-playfair)]">
                    ❧
                </div>
            </div>

            <motion.div
                className="relative z-10 max-w-xl mx-auto text-center px-6"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
            >
                {mounted && isPast ? (
                    /* Celebration state — wedding day has passed */
                    <div>
                        <motion.div
                            className="text-5xl mb-4"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", damping: 10 }}
                        >
                            💍
                        </motion.div>
                        <p className="font-[family-name:var(--font-inter)] text-charcoal-light text-sm tracking-[0.3em] uppercase mb-4">
                            We Said &ldquo;I Do&rdquo;
                        </p>
                        <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-charcoal mb-4">
                            Happily Married
                        </h2>
                        <p className="font-[family-name:var(--font-inter)] text-charcoal-light text-sm">
                            November 23, 2025 — The best day of our lives ♥
                        </p>
                    </div>
                ) : (
                    /* Countdown state */
                    <div>
                        <p className="font-[family-name:var(--font-siemreap)] text-charcoal-light text-sm tracking-[0.3em] uppercase mb-4">
                            រាប់ថយក្រោយដល់
                        </p>
                        <h2 className="font-[family-name:var(--font-moul)] text-2xl md:text-3xl text-charcoal mb-10">
                            ថ្ងៃពិសេសរបស់យើង
                        </h2>

                        <div className="flex justify-center gap-3 md:gap-5">
                            {!mounted ? (
                                /* SSR skeleton to avoid hydration mismatch */
                                <>
                                    <SkeletonUnit />
                                    <div className="flex items-center text-gold text-2xl font-bold">:</div>
                                    <SkeletonUnit />
                                    <div className="flex items-center text-gold text-2xl font-bold">:</div>
                                    <SkeletonUnit />
                                    <div className="flex items-center text-gold text-2xl font-bold">:</div>
                                    <SkeletonUnit />
                                </>
                            ) : (
                                <>
                                    <TimeUnit value={timeLeft?.days ?? 0} label="ថ្ងៃ" />
                                    <div className="flex items-center text-gold text-2xl font-bold">:</div>
                                    <TimeUnit value={timeLeft?.hours ?? 0} label="ម៉ោង" />
                                    <div className="flex items-center text-gold text-2xl font-bold">:</div>
                                    <TimeUnit value={timeLeft?.minutes ?? 0} label="នាទី" />
                                    <div className="flex items-center text-gold text-2xl font-bold">:</div>
                                    <TimeUnit value={timeLeft?.seconds ?? 0} label="វិនាទី" />
                                </>
                            )}
                        </div>
                    </div>
                )}
            </motion.div>
        </section>
    );
}
