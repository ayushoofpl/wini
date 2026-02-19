"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface ParallaxGalleryProps {
    image: string;
    caption?: string;
}

export function ParallaxGallery({ image, caption }: ParallaxGalleryProps) {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });
    const y = useTransform(scrollYProgress, [0, 1], [0, 200]);

    return (
        <section id="gallery" ref={sectionRef} className="relative h-[60vh] md:h-[80vh] overflow-hidden w-full">
            <motion.div style={{ y }} className="absolute inset-0 w-full h-[120%]">
                <img
                    src={image}
                    alt="Gallery Image"
                    className="w-full h-full object-cover"
                />
            </motion.div>
            {caption && (
                <div className="absolute bottom-10 left-10 text-white z-10">
                    <p className="text-sm uppercase tracking-widest mb-2 opacity-80">Reference</p>
                    <h3 className="text-3xl font-light">{caption}</h3>
                </div>
            )}
        </section>
    );
}
