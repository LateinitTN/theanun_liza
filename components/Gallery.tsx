"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { HiXMark } from "react-icons/hi2";

interface Photo {
    url: string;
    rotation: number;
    caption?: string;
}

interface GalleryProps {
    photos: Photo[];
}

export default function Gallery({ photos }: GalleryProps) {
    const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

    return (
        <section id="gallery" className="py-24 bg-[#FCF8F4] relative overflow-hidden">
            <div className="max-w-6xl mx-auto px-6">
                {/* Title */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8 }}
                >
                    <p className="font-[family-name:var(--font-inter)] text-charcoal-light text-sm tracking-[0.3em] uppercase mb-4">
                        Precious Moments
                    </p>
                    <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl text-charcoal">
                        Our Gallery
                    </h2>
                    <div className="ornament-divider mt-6 max-w-xs mx-auto">
                        <span className="text-gold text-lg">✦</span>
                    </div>
                </motion.div>

                {/* Polaroid grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                    {photos.map((photo, index) => (
                        <motion.div
                            key={index}
                            className="polaroid-card cursor-pointer"
                            style={{ transform: `rotate(${photo.rotation}deg)` }}
                            initial={{ opacity: 0, y: 40, rotate: photo.rotation }}
                            whileInView={{ opacity: 1, y: 0, rotate: photo.rotation }}
                            viewport={{ once: true, margin: "-30px" }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            onClick={() => setSelectedPhoto(photo)}
                        >
                            <div className="bg-white p-3 pb-12 rounded-sm shadow-md hover:shadow-2xl transition-shadow duration-300">
                                <div className="relative aspect-square overflow-hidden">
                                    <Image
                                        src={photo.url}
                                        alt={photo.caption || `Memory ${index + 1}`}
                                        fill
                                        className="object-cover dreamy-filter"
                                        sizes="(max-width: 768px) 50vw, 25vw"
                                    />
                                </div>
                                {photo.caption && (
                                    <p className="font-[family-name:var(--font-playfair)] text-charcoal text-sm text-center mt-3 italic">
                                        {photo.caption}
                                    </p>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {selectedPhoto && (
                    <motion.div
                        className="lightbox-overlay fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedPhoto(null)}
                    >
                        <motion.div
                            className="relative max-w-3xl w-full bg-white p-4 pb-16 rounded-sm shadow-2xl"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ type: "spring", damping: 25 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setSelectedPhoto(null)}
                                className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-md hover:bg-white transition-colors"
                            >
                                <HiXMark className="text-charcoal text-xl" />
                            </button>
                            <div className="relative aspect-[4/3] overflow-hidden">
                                <Image
                                    src={selectedPhoto.url}
                                    alt={selectedPhoto.caption || "Photo"}
                                    fill
                                    className="object-cover dreamy-filter"
                                    sizes="(max-width: 768px) 90vw, 60vw"
                                />
                            </div>
                            {selectedPhoto.caption && (
                                <p className="font-[family-name:var(--font-playfair)] text-charcoal text-lg text-center mt-4 italic">
                                    {selectedPhoto.caption}
                                </p>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
