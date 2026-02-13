"use client";

import { motion } from "framer-motion";
import { HiMapPin, HiClock, HiCalendar } from "react-icons/hi2";
import ProgramOfEvents from "./ProgramOfEvents";

interface EventInfo {
    title: string;
    date: string;
    time: string;
    venue: string;
    address: string;
    mapUrl: string;
    icon?: React.ReactNode;
}

interface EventDetailsProps {
    events: EventInfo[];
}

export default function EventDetails({ events }: EventDetailsProps) {
    return (
        <section
            id="event"
            className="py-24 relative overflow-hidden"
            style={{
                background: "linear-gradient(180deg, #FCF8F4 0%, #F5EDE5 50%, #FCF8F4 100%)",
            }}
        >
            <div className="max-w-4xl mx-auto px-6">
                {/* Title */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8 }}
                >
                    <p className="font-[family-name:var(--font-siemreap)] text-charcoal-light text-sm tracking-[0.3em] uppercase mb-4">
                        ចូលរួមជាមួយពួកយើង
                    </p>
                    <h2 className="font-[family-name:var(--font-moul)] text-3xl md:text-5xl text-charcoal">
                        ព័ត៌មានរោងពិធី
                    </h2>
                    <div className="ornament-divider mt-6 max-w-xs mx-auto">
                        <span className="text-gold text-lg">✦</span>
                    </div>
                </motion.div>

                {/* Events */}
                <div className="grid md:grid-cols-2 gap-8">
                    {events.map((event, index) => (
                        <motion.div
                            key={index}
                            className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-rose-light/20 hover:shadow-xl transition-shadow duration-300"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-30px" }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                        >
                            <div className="text-center">
                                {/* Event icon */}
                                <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-gradient-to-br from-rose-light/40 to-rose/20 flex items-center justify-center">
                                    <span className="text-gold text-2xl">
                                        {index === 0 ? "💍" : "🥂"}
                                    </span>
                                </div>

                                <h3 className="font-[family-name:var(--font-moul)] text-xl text-charcoal mb-6">
                                    {event.title}
                                </h3>

                                <div className="space-y-4">
                                    <div className="flex items-center justify-center gap-3 text-charcoal-light">
                                        <HiCalendar className="text-gold text-lg flex-shrink-0" />
                                        <span className="font-[family-name:var(--font-siemreap)] text-sm">
                                            {event.date}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-center gap-3 text-charcoal-light">
                                        <HiClock className="text-gold text-lg flex-shrink-0" />
                                        <span className="font-[family-name:var(--font-siemreap)] text-sm">
                                            {event.time}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-center gap-3 text-charcoal-light">
                                        <HiMapPin className="text-gold text-lg flex-shrink-0" />
                                        <div className="text-left">
                                            <span className="font-[family-name:var(--font-siemreap)] text-sm font-medium text-charcoal block">
                                                {event.venue}
                                            </span>
                                            <span className="font-[family-name:var(--font-siemreap)] text-xs text-charcoal-light">
                                                {event.address}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Get Directions button */}
                                <a
                                    href={event.mapUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-gradient-to-r from-gold to-gold-light text-white text-sm font-[family-name:var(--font-siemreap)] font-medium rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 tracking-wide"
                                >
                                    <HiMapPin className="text-base" />
                                    មើលទីតាំង
                                </a>
                            </div>
                        </motion.div>
                    ))}
                    <ProgramOfEvents />
                </div>

                {/* Map embed */}
                {/* Map Section */}
                <motion.div
                    className="mt-16"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                    <div className="relative bg-white p-4 md:p-6 rounded-3xl shadow-xl border border-rose-light/20 overflow-hidden">
                        {/* Decorative header */}
                        <div className="text-center mb-6">
                            <h3 className="font-[family-name:var(--font-moul)] text-2xl text-charcoal mb-2">
                                ទីតាំងកម្មវិធី
                            </h3>
                            <p className="font-[family-name:var(--font-siemreap)] text-charcoal-light text-sm">
                                សូមអញ្ជើញចូលរួមតាមការគួរ
                            </p>
                            <div className="ornament-divider mt-4 max-w-[150px] mx-auto opacity-60">
                                <span className="text-gold text-lg">✦</span>
                            </div>
                        </div>

                        {/* Map Frame */}
                        <div className="relative rounded-2xl overflow-hidden border-4 border-white shadow-inner bg-gray-100 h-[300px] md:h-[400px]">
                            <iframe
                                src="https://maps.google.com/maps?q=13.3418056,103.8930278&hl=km&z=19&output=embed"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="w-full h-full grayscale-[20%] hover:grayscale-0 transition-all duration-700"
                            />

                            {/* Overlay generic location label if needed, or keep clean */}
                        </div>

                        {/* Footer / Address */}
                        <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4 px-2">
                            <div className="flex items-center gap-3 text-left">
                                <div className="w-10 h-10 rounded-full bg-rose-light/20 flex items-center justify-center shrink-0">
                                    <HiMapPin className="text-gold text-xl" />
                                </div>
                                <div>
                                    <p className="font-[family-name:var(--font-moul)] text-sm text-charcoal">
                                        គេហដ្ឋានខាងស្រី
                                    </p>
                                    <p className="font-[family-name:var(--font-siemreap)] text-sm text-charcoal-light">
                                        ភូមិខ្នារ សង្កាត់ជ្រាវ ក្រុងសៀមរាប
                                    </p>
                                </div>
                            </div>

                            <a
                                href="https://maps.google.com/maps?q=13.3418056,103.8930278"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-charcoal text-white text-sm font-[family-name:var(--font-siemreap)] rounded-full hover:bg-gold transition-colors duration-300 shadow-md group"
                            >
                                <span>បើកផែនទី</span>
                                <HiMapPin className="group-hover:rotate-12 transition-transform" />
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
