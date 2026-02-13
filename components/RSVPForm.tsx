"use client";

import { useState, useEffect, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface RSVPFormProps {
    onSubmit?: (data: RSVPData) => void;
}

interface RSVPData {
    name: string;
    guests: number;
    attending: "yes" | "no" | "";
    message: string;
}

export default function RSVPForm({ onSubmit }: RSVPFormProps) {
    const [formData, setFormData] = useState<RSVPData>({
        name: "",
        guests: 1,
        attending: "",
        message: "",
    });
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<Partial<Record<keyof RSVPData, string>>>({});

    useEffect(() => {
        const joined = localStorage.getItem("has_joined_event");
        if (joined) {
            setSubmitted(true);
        }
    }, []);

    const validate = (): boolean => {
        const newErrors: Partial<Record<keyof RSVPData, string>> = {};
        if (!formData.name.trim()) newErrors.name = "សូមបញ្ចូលឈ្មោះរបស់អ្នក";
        if (!formData.attending) newErrors.attending = "សូមបញ្ជាក់ថាតើអ្នកអាចចូលរួមបានដែរឬទេ";
        if (formData.attending !== "no" && (formData.guests < 1 || formData.guests > 10)) newErrors.guests = "សូមបញ្ចូលចំនួនត្រឹមត្រូវ (១-១០)";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setIsSubmitting(true);

        // Store in localStorage as demo
        const existing = JSON.parse(localStorage.getItem("rsvp_responses") || "[]");
        existing.push({ ...formData, timestamp: new Date().toISOString() });
        localStorage.setItem("rsvp_responses", JSON.stringify(existing));

        // Increment global join count and mark as joined
        try {
            await fetch("/api/join", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });
        } catch (err) {
            console.error("Failed to count join", err);
        }

        localStorage.setItem("has_joined_event", "true");
        // Dispatch event to update accessible JoinTracker components immediately
        window.dispatchEvent(new Event("storage"));

        onSubmit?.(formData);

        // Small delay to show the loading state briefly if the API is too fast
        await new Promise(resolve => setTimeout(resolve, 800));

        setIsSubmitting(false);
        setSubmitted(true);
    };

    return (
        <section id="rsvp" className="py-24 bg-[#FCF8F4] relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
                <div
                    className="w-full h-full"
                    style={{
                        backgroundImage: `radial-gradient(circle at 1px 1px, #D4AF37 1px, transparent 0)`,
                        backgroundSize: "50px 50px",
                    }}
                />
            </div>

            <div className="max-w-lg mx-auto px-6 relative z-10">
                {/* Title */}
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8 }}
                >
                    <p className="font-[family-name:var(--font-siemreap)] text-charcoal-light text-sm tracking-[0.3em] uppercase mb-4">
                        សូមអញ្ជើញចូលរួម
                    </p>
                    <h2 className="font-[family-name:var(--font-moul)] text-3xl md:text-5xl text-charcoal">
                        ការឆ្លើយតប
                    </h2>
                    <div className="ornament-divider mt-6 max-w-xs mx-auto">
                        <span className="text-gold text-lg">✦</span>
                    </div>
                    <p className="font-[family-name:var(--font-siemreap)] text-charcoal-light text-sm mt-6">
                        សូមមេត្តាឆ្លើយតបត្រឹមថ្ងៃទី ១៣ មីនា ២០២៦
                    </p>
                </motion.div>

                <AnimatePresence mode="wait">
                    {!submitted ? (
                        <motion.form
                            key="form"
                            onSubmit={handleSubmit}
                            className="space-y-6"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -30 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            {/* Name */}
                            <div>
                                <label className="block font-[family-name:var(--font-siemreap)] text-sm text-charcoal mb-2 font-medium">
                                    ឈ្មោះរបស់អ្នក
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="សូមបញ្ចូលឈ្មោះរបស់អ្នក"
                                    className="w-full px-4 py-3 bg-white border border-rose-light/30 rounded-xl font-[family-name:var(--font-siemreap)] text-sm text-charcoal placeholder-charcoal-light/50 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all duration-300"
                                />
                                {errors.name && (
                                    <p className="text-rose-deep text-xs mt-1 font-[family-name:var(--font-siemreap)]">
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            {/* Attending */}
                            <div>
                                <label className="block font-[family-name:var(--font-siemreap)] text-sm text-charcoal mb-3 font-medium">
                                    តើអ្នកនឹងអញ្ជើញចូលរួមដែរឬទេ?
                                </label>
                                <div className="flex gap-4">
                                    {(["yes", "no"] as const).map((option) => (
                                        <button
                                            key={option}
                                            type="button"
                                            onClick={() => setFormData({ ...formData, attending: option })}
                                            className={`flex-1 py-3 px-4 rounded-xl border-2 font-[family-name:var(--font-siemreap)] text-sm font-medium transition-all duration-300 ${formData.attending === option
                                                ? "border-gold bg-gold/10 text-gold"
                                                : "border-rose-light/30 bg-white text-charcoal-light hover:border-rose-light"
                                                }`}
                                        >
                                            {option === "yes" ? "ចូលរួម" : "មិនអាចចូលរួម"}
                                        </button>
                                    ))}
                                </div>
                                {errors.attending && (
                                    <p className="text-rose-deep text-xs mt-1 font-[family-name:var(--font-siemreap)]">
                                        {errors.attending}
                                    </p>
                                )}
                            </div>

                            {/* Number of guests */}
                            {formData.attending !== "no" && (
                                <div>
                                    <label className="block font-[family-name:var(--font-siemreap)] text-sm text-charcoal mb-2 font-medium">
                                        ចំនួនភ្ញៀវ
                                    </label>
                                    <select
                                        value={formData.guests}
                                        onChange={(e) => setFormData({ ...formData, guests: parseInt(e.target.value) })}
                                        className="w-full px-4 py-3 bg-white border border-rose-light/30 rounded-xl font-[family-name:var(--font-siemreap)] text-sm text-charcoal focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all duration-300 appearance-none cursor-pointer"
                                    >
                                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                                            <option key={n} value={n}>
                                                {n} នាក់
                                            </option>
                                        ))}
                                    </select>
                                    {errors.guests && (
                                        <p className="text-rose-deep text-xs mt-1 font-[family-name:var(--font-siemreap)]">
                                            {errors.guests}
                                        </p>
                                    )}
                                </div>
                            )}

                            {/* Message */}
                            <div>
                                <label className="block font-[family-name:var(--font-siemreap)] text-sm text-charcoal mb-2 font-medium">
                                    សាររបស់អ្នក (ប្រសិនបើមាន)
                                </label>
                                <textarea
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    placeholder="សូមសរសេរពាក្យជូនពរនៅទីនេះ..."
                                    rows={4}
                                    className="w-full px-4 py-3 bg-white border border-rose-light/30 rounded-xl font-[family-name:var(--font-siemreap)] text-sm text-charcoal placeholder-charcoal-light/50 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all duration-300 resize-none"
                                />
                            </div>

                            {/* Submit */}
                            <motion.button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-4 bg-gradient-to-r from-gold to-gold-light text-white font-[family-name:var(--font-siemreap)] font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 tracking-wider text-sm uppercase flex justify-center items-center gap-2 disabled:opacity-80 disabled:cursor-not-allowed"
                                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                            >
                                {isSubmitting ? (
                                    <>
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                            className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                                        />
                                        <span>កំពុងរក្សាទុក...</span>
                                    </>
                                ) : (
                                    "ផ្ញើការឆ្លើយតប"
                                )}
                            </motion.button>
                        </motion.form>
                    ) : (
                        <motion.div
                            key="success"
                            className="text-center py-16"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ type: "spring", damping: 20 }}
                        >
                            <motion.div
                                className="text-6xl mb-6"
                                initial={{ rotate: -180, scale: 0 }}
                                animate={{ rotate: 0, scale: 1 }}
                                transition={{ type: "spring", damping: 10, delay: 0.2 }}
                            >
                                💌
                            </motion.div>
                            <h3 className="font-[family-name:var(--font-moul)] text-2xl text-charcoal mb-3">
                                អរគុណ!
                            </h3>
                            <p className="font-[family-name:var(--font-siemreap)] text-charcoal-light text-sm">
                                ការឆ្លើយតបរបស់អ្នកត្រូវបានទទួល។ យើងខ្ញុំទន្ទឹងរង់ចាំជួបអ្នក!
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}
