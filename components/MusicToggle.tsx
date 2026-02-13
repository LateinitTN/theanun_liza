"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { HiMusicalNote, HiPause } from "react-icons/hi2";

export default function MusicToggle() {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        // Create an audio element with a royalty-free ambient track
        // Using a silent audio placeholder — replace with actual wedding music URL
        audioRef.current = new Audio();
        audioRef.current.loop = true;
        audioRef.current.volume = 0.3;
        // Set the audio source to the file in public folder
        audioRef.current.src = "/song.mp3";

        // Attempt to play automatically
        const playPromise = audioRef.current.play();

        if (playPromise !== undefined) {
            playPromise
                .then(() => {
                    // Autoplay started!
                    setIsPlaying(true);
                })
                .catch((error) => {
                    // Auto-play was prevented
                    // Show a UI element to let the user manually start playback
                    console.log("Autoplay prevented:", error);
                    setIsPlaying(false);
                });
        }

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    const toggleMusic = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch((e) => {
                console.error("Playback failed:", e);
            });
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <motion.button
            onClick={toggleMusic}
            className="fixed bottom-8 right-8 z-40 w-14 h-14 rounded-full bg-white/90 backdrop-blur-md shadow-lg border border-rose-light/30 flex items-center justify-center group hover:bg-white hover:shadow-xl transition-all duration-300"
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 2, type: "spring", damping: 15 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label={isPlaying ? "Pause music" : "Play music"}
        >
            {/* Vinyl record animation ring */}
            <div
                className={`absolute inset-1 rounded-full border-2 border-dashed border-gold/40 ${isPlaying ? "animate-spin-slow" : ""
                    }`}
            />
            {isPlaying ? (
                <HiPause className="text-gold text-xl relative z-10" />
            ) : (
                <HiMusicalNote className="text-gold text-xl relative z-10" />
            )}

            {/* Pulse effect when playing */}
            {isPlaying && (
                <>
                    <span className="absolute inset-0 rounded-full bg-gold/10 animate-ping" />
                </>
            )}
        </motion.button>
    );
}
