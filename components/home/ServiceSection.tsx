"use client";

import { Check, Fingerprint, Leaf } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/shared/Reveal";

const SERVICES = [
    {
        title: "Customizing from WINI",
        description: "We build customized office furniture. In series. Talk to us about WINI customizing.",
        icon: Fingerprint,
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200",
        bgColor: "bg-[#EAE6E1]", // Beige
        buttonText: "Learn more",
        link: "/customizing",
    },
    {
        title: "Design & quality made in Germany",
        description: "We live quality you can touch. High-quality, well thought-out, safe and flexible.",
        icon: Check,
        image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1200",
        bgColor: "bg-[#ECECEC]", // Light Gray
        buttonText: "Discover WINI quality",
        link: "/quality",
    },
    {
        title: "Sustainably produced",
        description: "We think & act sustainably. Since 1908.",
        icon: Leaf,
        image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1200",
        bgColor: "bg-[#E4EBD9]", // Light Green
        buttonText: "More about WINI sustainability",
        link: "/sustainability",
    },
];

export function ServiceSection() {
    return (
        <section className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-3">
                {SERVICES.map((service, index) => (
                    <Reveal key={index} delay={index * 0.1} width="100%">
                        <div className={`flex flex-col h-full ${service.bgColor}`}>
                            {/* Image Section */}
                            <div className="relative h-64 md:h-80 w-full overflow-hidden">
                                <img
                                    src={service.image}
                                    alt={service.title}
                                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                                />

                                {/* Icon Badge */}
                                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg z-10">
                                    <service.icon className="w-10 h-10 text-neutral-400 stroke-[1.5]" />
                                </div>
                            </div>

                            {/* Content Section */}
                            <div className="flex flex-col items-center text-center px-8 pt-16 pb-12 flex-grow">
                                <h3 className="text-2xl font-light text-neutral-900 mb-6">
                                    {service.title}
                                </h3>
                                <p className="text-neutral-600 font-light leading-relaxed mb-10 max-w-sm">
                                    {service.description}
                                </p>
                                <div className="mt-auto">
                                    <Link
                                        href={service.link}
                                        className="inline-flex items-center justify-center px-8 py-3 rounded-full border border-neutral-900 text-neutral-900 text-sm font-medium transition-all duration-300 hover:bg-neutral-900 hover:text-white uppercase tracking-wider"
                                    >
                                        {service.buttonText}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                ))}
            </div>
        </section>
    );
}
