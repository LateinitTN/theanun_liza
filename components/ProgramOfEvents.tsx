"use client";

import { motion } from "framer-motion";
import { HiClock } from "react-icons/hi2";

const programItems = [
    {
        time: "០៨:៣០ – ០៩:០០",
        activity: "ទទួលភ្ញៀវ និងសំណេះសំណាល",
    },
    {
        time: "០៩:០០ – ០៩:១០",
        activity: "អង្គុយជាផ្លូវការ",
    },
    {
        time: "០៩:១០ – ០៩:២៥",
        activity: "ពាក្យសម្ដីខាងប្រុស (ស្ដីដណ្ដឹង)",
    },
    {
        time: "០៩:២៥ – ០៩:៣៥",
        activity: "ពាក្យសម្ដីខាងស្រី (ទទួលយល់ព្រម)",
    },
    {
        time: "០៩:៣៥ – ០៩:៤៥",
        activity: "ពិភាក្សាសង្ខេប",
    },
    {
        time: "០៩:៤៥ – ១០:៣០",
        activity: "អាហារសាមញ្ញ និងថតរូប",
    },
];

export default function ProgramOfEvents() {
    return (
        <motion.div
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-rose-light/20 hover:shadow-xl transition-shadow duration-300 h-full"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
        >
            <div className="text-center mb-6">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-br from-rose-light/40 to-rose/20 flex items-center justify-center">
                    <span className="text-gold text-xl">📜</span>
                </div>
                <h3 className="font-[family-name:var(--font-moul)] text-lg text-charcoal">
                    កម្មវិធីពិធី
                </h3>
            </div>

            <div className="space-y-4 relative before:absolute before:inset-0 before:ml-4 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-rose-light/30 before:to-transparent">
                {programItems.map((item, index) => (
                    <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                        {/* Icon/Dot */}
                        <div className="flex items-center justify-center w-8 h-8 rounded-full border border-white bg-rose-light/20 group-hover:bg-gold-light/20 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                            <HiClock className="text-gold text-xs" />
                        </div>
                        {/* Content */}
                        <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2rem)] p-3 rounded-xl border border-rose-light/10 bg-white/50 hover:bg-white/80 transition-colors shadow-sm">
                            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                                <span className="font-[family-name:var(--font-siemreap)] text-sm font-bold text-gold">
                                    {item.time}
                                </span>
                            </div>
                            <div className="text-charcoal-light font-[family-name:var(--font-siemreap)] text-sm mt-1">
                                {item.activity}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-6 text-center">
                <p className="font-[family-name:var(--font-siemreap)] text-xs text-charcoal-light italic">
                    រយៈពេល៖ ប្រហែល ១–១.៥ ម៉ោង
                </p>
            </div>
        </motion.div>
    );
}
