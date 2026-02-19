"use client";

import { motion } from "framer-motion";

const PARTNERS = [
    { name: "Partner 1", logo: "Logo 1" },
    { name: "Partner 2", logo: "Logo 2" },
    { name: "Partner 3", logo: "Logo 3" },
    { name: "Partner 4", logo: "Logo 4" },
    { name: "Partner 5", logo: "Logo 5" },
    { name: "Partner 6", logo: "Logo 6" },
];

export function Partners() {
    return (
        <section className="w-full py-16 bg-white border-y border-neutral-100">
            <div className="container px-6 2xl:px-0">
                <div className="flex flex-wrap justify-between items-center gap-12 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
                    {PARTNERS.map((partner, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="text-2xl font-bold text-neutral-400 tracking-tighter"
                        >
                            {partner.name}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
