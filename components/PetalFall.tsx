"use client";

import { useEffect, useState } from "react";

interface Petal {
    id: number;
    left: string;
    size: number;
    duration: number;
    delay: number;
    opacity: number;
    type: "petal" | "heart" | "dot";
}

export default function PetalFall() {
    const [petals, setPetals] = useState<Petal[]>([]);

    useEffect(() => {
        const petalTypes: Petal["type"][] = ["petal", "petal", "petal", "heart", "dot"];
        const generated: Petal[] = Array.from({ length: 20 }, (_, i) => ({
            id: i,
            left: `${Math.random() * 100}%`,
            size: 8 + Math.random() * 14,
            duration: 8 + Math.random() * 12,
            delay: Math.random() * 15,
            opacity: 0.15 + Math.random() * 0.35,
            type: petalTypes[Math.floor(Math.random() * petalTypes.length)],
        }));
        setPetals(generated);
    }, []);

    const getEmoji = (type: Petal["type"]) => {
        switch (type) {
            case "petal":
                return "🌸";
            case "heart":
                return "♥";
            case "dot":
                return "✿";
        }
    };

    return (
        <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
            {petals.map((petal) => (
                <span
                    key={petal.id}
                    className="absolute animate-petal-fall"
                    style={{
                        left: petal.left,
                        fontSize: `${petal.size}px`,
                        animationDuration: `${petal.duration}s`,
                        animationDelay: `${petal.delay}s`,
                        opacity: petal.opacity,
                        color:
                            petal.type === "heart"
                                ? "#D4A3A3"
                                : petal.type === "dot"
                                    ? "#D4AF37"
                                    : undefined,
                    }}
                >
                    {getEmoji(petal.type)}
                </span>
            ))}
        </div>
    );
}
