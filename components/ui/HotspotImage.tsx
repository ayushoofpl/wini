"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface Hotspot {
    id: string;
    x: number; // Percentage 0-100
    y: number; // Percentage 0-100
    title?: string;
    description: string;
}

interface HotspotImageProps {
    src: string;
    alt: string;
    hotspots: Hotspot[];
}

export function HotspotImage({ src, alt, hotspots }: HotspotImageProps) {
    const [activeId, setActiveId] = useState<string | null>(null);

    return (
        <div className="relative w-full h-[600px] bg-neutral-100 overflow-hidden group">
            <Image
                src={src}
                alt={alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {hotspots.map((hotspot) => (
                <div
                    key={hotspot.id}
                    className="absolute"
                    style={{ top: `${hotspot.y}%`, left: `${hotspot.x}%` }}
                >
                    {/* Pulse Effect */}
                    <span className="absolute -inset-2 rounded-full bg-white/30 animate-ping" />

                    <button
                        onClick={() => setActiveId(activeId === hotspot.id ? null : hotspot.id)}
                        className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center transition-colors shadow-lg ${activeId === hotspot.id ? "bg-primary text-white" : "bg-white text-primary hover:bg-neutral-100"
                            }`}
                    >
                        <Plus
                            className={`w-5 h-5 transition-transform duration-300 ${activeId === hotspot.id ? "rotate-45" : ""
                                }`}
                        />
                    </button>

                    {/* Tooltip / Popover */}
                    <AnimatePresence>
                        {activeId === hotspot.id && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                className="absolute left-1/2 -translate-x-1/2 bottom-12 w-64 bg-white p-4 shadow-xl z-20 pointer-events-auto text-left"
                            >
                                {hotspot.title && (
                                    <h4 className="font-sans font-medium text-lg mb-1">{hotspot.title}</h4>
                                )}
                                <p className="text-sm text-neutral-600 font-light leading-relaxed">
                                    {hotspot.description}
                                </p>
                                {/* Little triangle arrow */}
                                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white transform rotate-45" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ))}
        </div>
    );
}
