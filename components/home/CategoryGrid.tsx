"use client";

import Link from "next/link";
import { Reveal } from "@/components/shared/Reveal";

const CATEGORIES = [
    {
        id: "desks",
        name: "Home Office",
        image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=1200",
        desc: "Ergonomic desk systems for focused work."
    },
    {
        id: "working",
        name: "Working",
        image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1200",
        desc: "Flexible solutions for the modern office."
    },
    {
        id: "collaboration",
        name: "Collaboration",
        image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1200",
        desc: "Spaces for teamwork and creativity."
    },
    {
        id: "communicating",
        name: "Communicating",
        image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=1200",
        desc: "Meeting and conference room systems."
    },
    {
        id: "organization",
        name: "Organization",
        image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80&w=1200",
        desc: "Intelligent storage and filing systems."
    },
    {
        id: "acoustics",
        name: "Acoustics",
        image: "https://images.unsplash.com/photo-1519642918688-7e43b19245d8?auto=format&fit=crop&q=80&w=1200",
        desc: "Optimized room acoustics for focus."
    }
];

export function CategoryGrid() {
    return (
        <section className="w-full bg-white pb-24">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-neutral-100">
                {CATEGORIES.map((category, idx) => (
                    <Link
                        key={category.id}
                        href={`/products/${category.id}`}
                        className="group relative aspect-square overflow-hidden bg-white border-r border-b border-neutral-100"
                    >
                        {/* Image Container */}
                        <div className="absolute inset-0 transition-transform duration-[1500ms] ease-out group-hover:scale-105">
                            <img
                                src={category.image}
                                alt={category.name}
                                className="w-full h-full object-cover opacity-90 transition-all duration-700"
                            />
                        </div>

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-neutral-900/0 group-hover:bg-neutral-900/5 transition-colors duration-700" />

                        {/* Content Overlay */}
                        <div className="absolute inset-0 p-12 flex flex-col justify-end z-10">
                            <div className="space-y-4">
                                <Reveal delay={0.1}>
                                    <h3 className="text-3xl md:text-4xl font-light text-neutral-900 group-hover:text-primary transition-colors">
                                        {category.name}
                                    </h3>
                                </Reveal>
                                <div className="overflow-hidden">
                                    <p className="text-neutral-500 font-light translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 delay-100">
                                        {category.desc}
                                    </p>
                                </div>
                                <div className="flex items-center gap-3 text-primary text-xs uppercase tracking-[0.3em] font-bold translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 delay-200">
                                    Discover Collection <span>→</span>
                                </div>
                            </div>
                        </div>

                        {/* Visual Accent */}
                        <div className="absolute top-12 left-12 w-8 h-px bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
                    </Link>
                ))}
            </div>
        </section>
    );
}
