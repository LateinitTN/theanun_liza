"use client";

import { motion } from "framer-motion";

export default function Footer() {
    return (
        <footer className="relative py-12 bg-gradient-to-b from-[#FCF8F4] to-[#F5EDE5] overflow-hidden">
            <div className="relative z-10 text-center px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <p className="font-[family-name:var(--font-siemreap)] text-charcoal-light text-xs uppercase mb-4">
                        ដោយក្តីស្រឡាញ់
                    </p>

                    <h2 className="font-[family-name:var(--font-moul)] text-xl md:text-2xl text-charcoal mb-3 leading-relaxed flex flex-col items-center gap-1 md:gap-2">
                        <span>រ៉ាន់ សម្បត្តិមេធានុន</span>
                        <span className="text-gold text-2xl">&</span>
                        <span>វ៉ាន់ ចាន់លីហ្សា</span>
                    </h2>

                    <div className="ornament-divider max-w-[100px] mx-auto my-6 opacity-60">
                        <span className="text-gold text-lg">♥</span>
                    </div>

                    <p className="font-[family-name:var(--font-siemreap)] text-charcoal text-sm font-medium mb-8">
                        ១៣ មេសា ២០២៦
                    </p>

                    <div className="flex flex-col items-center gap-1 mt-8 opacity-50 hover:opacity-100 transition-opacity">
                        <p className="font-[family-name:var(--font-siemreap)] text-charcoal-light text-[10px] tracking-wider">
                            Made with ❤️ for our special day
                        </p>
                        <p className="font-[family-name:var(--font-inter)] text-charcoal-light text-[10px]">
                            © 2026 — All Rights Reserved
                        </p>
                    </div>
                </motion.div>
            </div>
        </footer>
    );
}
