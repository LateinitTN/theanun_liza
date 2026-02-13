"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Guest {
    name: string;
    guests: number;
    attending: string;
    message: string;
    timestamp: string;
}

export default function GuestList() {
    const [guests, setGuests] = useState<Guest[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/join")
            .then((res) => res.json())
            .then((data) => {
                setGuests(data.guests || []);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Failed to load guests", err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#FCF8F4]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold"></div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-[#FCF8F4]">
            {/* Header / Hero Section */}
            <div className="relative h-[40vh] min-h-[300px] w-full overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: "url('/main_view.jpg')" }}
                >
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
                </div>

                <div className="relative h-full flex flex-col items-center justify-center text-white px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center"
                    >
                        <p className="font-[family-name:var(--font-siemreap)] text-white/90 text-sm tracking-[0.2em] uppercase mb-4">
                            សូមស្វាគមន៍
                        </p>
                        <h1 className="font-[family-name:var(--font-moul)] text-4xl md:text-5xl lg:text-6xl mb-4 drop-shadow-md">
                            បញ្ជីភ្ញៀវ
                        </h1>
                        <div className="ornament-divider mt-4 max-w-xs mx-auto opacity-80">
                            <span className="text-gold text-xl">✦</span>
                        </div>
                        <p className="mt-4 font-[family-name:var(--font-siemreap)] text-white/90">
                            ចំនួនភ្ញៀវសរុប: <span className="font-bold text-gold-light text-xl ml-2">{guests.length}</span>
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-4xl mx-auto py-12 px-4 md:px-8 -mt-10 relative z-10">
                <div className="grid gap-6 md:grid-cols-2">
                    {guests.slice().reverse().map((guest, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 + 0.3 }}
                            className="bg-white p-6 rounded-2xl shadow-md border border-rose-light/20 hover:shadow-lg transition-shadow duration-300"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="font-[family-name:var(--font-siemreap)] text-lg font-bold text-charcoal">
                                        {guest.name}
                                    </h3>
                                    <p className="text-xs text-charcoal-light mt-1">
                                        {new Date(guest.timestamp).toLocaleString("km-KH")}
                                    </p>
                                </div>
                                <div className={`px-3 py-1 rounded-full text-xs font-bold ${guest.attending === 'yes'
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-red-100 text-red-700'
                                    }`}>
                                    {guest.attending === 'yes' ? 'ចូលរួម' : 'មិនចូលរួម'}
                                </div>
                            </div>

                            <div className="flex items-center gap-2 mb-3 text-sm text-charcoal-light">
                                <span>ចំនួនភ្ញៀវ:</span>
                                <span className="font-bold text-charcoal">{guest.guests} នាក់</span>
                            </div>

                            {guest.message && (
                                <div className="mt-4 pt-4 border-t border-rose-light/10">
                                    <p className="font-[family-name:var(--font-siemreap)] text-charcoal-light italic text-sm">
                                        "{guest.message}"
                                    </p>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>

                {guests.length === 0 && (
                    <div className="text-center text-charcoal-light py-12 bg-white rounded-2xl shadow-sm border border-rose-light/10">
                        មិនទាន់មានភ្ញៀវឆ្លើយតបនៅឡើយទេ
                    </div>
                )}
            </div>
        </main>
    );
}
