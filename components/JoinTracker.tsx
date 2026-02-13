"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiUserGroup, HiHeart } from "react-icons/hi2";

export default function JoinTracker() {
    const [count, setCount] = useState<number | null>(null);
    const [hasJoined, setHasJoined] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const fetchCount = () => {
        fetch("/api/join")
            .then((res) => res.json())
            .then((data) => {
                setCount(data.count ?? 0);
                setIsLoading(false);
            })
            .catch((err) => {
                console.error("Failed to fetch join count", err);
                setIsLoading(false);
            });
    };

    useEffect(() => {
        // Check local storage & update count
        const checkStatus = () => {
            const joined = localStorage.getItem("has_joined_event");
            if (joined) setHasJoined(true);
            fetchCount();
        };

        checkStatus();
        window.addEventListener("storage", checkStatus);

        return () => window.removeEventListener("storage", checkStatus);
    }, []);

    const handleScrollToRSVP = () => {
        const rsvpSection = document.getElementById("rsvp");
        if (rsvpSection) {
            rsvpSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    if (isLoading) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="flex flex-col items-center justify-center mt-8 mb-4 z-10 relative"
        >
            <div className="flex items-center gap-3 bg-white/80 backdrop-blur-md px-5 py-2 rounded-full shadow-sm border border-rose-light/20">
                <div className="flex items-center gap-2 text-charcoal-light">
                    <HiUserGroup className="text-gold" />
                    <span className="font-[family-name:var(--font-siemreap)] text-sm font-medium">
                        {count?.toLocaleString()} នាក់បានចូលរួម
                    </span>
                </div>

                <div className="h-4 w-px bg-rose-light/30 mx-1"></div>

                <AnimatePresence mode="wait">
                    {hasJoined ? (
                        <motion.div
                            key="joined"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="flex items-center gap-1 text-rose-deep font-[family-name:var(--font-siemreap)] text-xs font-bold"
                        >
                            <HiHeart className="text-rose-deep" />
                            <span>បានចូលរួម</span>
                        </motion.div>
                    ) : (
                        <motion.button
                            key="join-btn"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleScrollToRSVP}
                            className="px-3 py-1 bg-gradient-to-r from-gold to-gold-light text-white text-xs font-[family-name:var(--font-siemreap)] rounded-full shadow-sm hover:shadow-md transition-all"
                        >
                            ចូលរួម
                        </motion.button>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}
