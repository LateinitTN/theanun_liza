"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface PersonInfo {
    name: string;
    photo: string;
    role: string;
    bio?: string;
}

interface StoryProps {
    title: string;
    subtitle?: string;
    groom: PersonInfo;
    bride: PersonInfo;
    mainPhoto?: string;
}

function PersonCard({ person, delay }: { person: PersonInfo; delay: number }) {
    return (
        <motion.div
            className="flex flex-col items-center text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay }}
        >
            <div className="relative w-48 h-48 md:w-56 md:h-56 mb-6 group">
                {/* Decorative ring */}
                <div className="absolute -inset-3 rounded-full border-2 border-gold/30 group-hover:border-gold/60 transition-colors duration-500" />
                <div className="absolute -inset-1 rounded-full border border-rose-light/40" />
                <div className="w-full h-full rounded-full overflow-hidden shadow-xl">
                    <Image
                        src={person.photo}
                        alt={person.name}
                        width={224}
                        height={224}
                        className="w-full h-full object-cover dreamy-filter group-hover:scale-110 transition-transform duration-700"
                    />
                </div>
            </div>
            <p className="font-[family-name:var(--font-siemreap)] text-xs tracking-[0.3em] uppercase text-gold mb-2">
                {person.role}
            </p>
            <h3 className="font-[family-name:var(--font-moul)] text-xl md:text-2xl text-charcoal mb-3">
                {person.name}
            </h3>
            {person.bio && (
                <p className="font-[family-name:var(--font-siemreap)] text-charcoal-light text-sm leading-relaxed max-w-xs">
                    {person.bio}
                </p>
            )}
        </motion.div>
    );
}

export default function Story({
    title,
    subtitle,
    groom,
    bride,
}: StoryProps) {
    return (
        <section id="story" className="relative py-24 overflow-hidden">
            {/* Parallax background */}
            <div
                className="absolute inset-0 bg-gradient-to-b from-cream-dark/50 via-cream to-cream-dark/50"
                style={{
                    backgroundAttachment: "fixed",
                }}
            />

            {/* Decorative pattern */}
            <div className="absolute inset-0 opacity-[0.02]">
                <div
                    className="w-full h-full"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-6">
                {/* Title */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8 }}
                >
                    {subtitle && (
                        <p className="font-[family-name:var(--font-siemreap)] text-charcoal-light text-sm tracking-[0.3em] uppercase mb-4">
                            {subtitle}
                        </p>
                    )}
                    <h2 className="font-[family-name:var(--font-moul)] text-3xl md:text-4xl text-charcoal">
                        {title}
                    </h2>
                    <div className="ornament-divider mt-6 max-w-xs mx-auto">
                        <span className="text-gold text-lg">✦</span>
                    </div>
                </motion.div>

                {/* Couple cards */}
                <div className="grid md:grid-cols-2 gap-16 md:gap-20 items-start">
                    <PersonCard person={groom} delay={0.2} />
                    <PersonCard person={bride} delay={0.4} />
                </div>

                {/* Heart connector */}
                <motion.div
                    className="flex justify-center mt-12"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                >
                    <div className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center border border-rose-light/30">
                        <span className="text-rose text-xl">♥</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
