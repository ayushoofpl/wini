"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { motion, useScroll, useTransform, Variants } from "framer-motion";

export interface HeroProps {
    title?: React.ReactNode;
    subtitle?: string;
    variant?: "default" | "small" | "cinema";
    backgroundImage?: string;
    videoBackground?: string;
    showButton?: boolean;
}

const titleVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 1.2,
            ease: [0.22, 1, 0.36, 1]
        }
    }
};

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.3
        }
    }
};

export function Hero({
    title,
    subtitle,
    variant = "default",
    backgroundImage,
    videoBackground,
    showButton = true
}: HeroProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const yParallax = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const opacityFade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

    const isSmall = variant === "small";
    const isCinema = variant === "cinema";

    const getHeightClass = () => {
        if (isSmall) return "h-[50vh] min-h-[500px]";
        if (isCinema) return "h-[85vh] md:h-[90vh]";
        return "h-[90vh] md:h-screen";
    };

    return (
        <section
            ref={containerRef}
            className={`relative w-full overflow-hidden group bg-neutral-900 ${getHeightClass()}`}
        >
            {/* Parallax Background */}
            <motion.div
                style={{ y: yParallax, opacity: opacityFade }}
                className="absolute inset-0 w-full h-[130%] -top-[15%]"
            >
                {videoBackground ? (
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover scale-105"
                    >
                        <source src={videoBackground} type="video/mp4" />
                    </video>
                ) : backgroundImage ? (
                    <img
                        src={backgroundImage}
                        alt="Hero Background"
                        className="w-full h-full object-cover scale-105"
                    />
                ) : (
                    <div className="w-full h-full bg-neutral-800" />
                )}

                {/* Overlays */}
                <div className="absolute inset-0 bg-neutral-900/40" />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-neutral-900/30" />
            </motion.div>

            {/* Content Container */}
            <div className="absolute inset-0 z-10 flex flex-col justify-end">
                <div className="container px-6 2xl:px-0 pb-20 md:pb-32">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="max-w-6xl space-y-6"
                    >
                        <motion.div variants={titleVariants} className="overflow-hidden">
                            <h1 className={`${isSmall ? "text-2xl md:text-4xl" : "text-3xl md:text-5xl lg:text-6xl xl:text-[4.5rem]"} font-slogan text-white leading-[1.1] tracking-tight`}>
                                {title || (
                                    <>
                                        Pure <br />
                                        <span className="text-primary italic">Precision.</span>
                                    </>
                                )}
                            </h1>
                        </motion.div>

                        {subtitle && (
                            <motion.p
                                variants={titleVariants}
                                className="text-sm md:text-base lg:text-lg text-neutral-200 max-w-2xl font-light leading-relaxed"
                            >
                                {subtitle}
                            </motion.p>
                        )}

                        {showButton && (
                            <motion.div variants={titleVariants} className="pt-6">
                                <Link
                                    href="/products"
                                    className="inline-flex items-center justify-center px-8 py-3 rounded-full border border-white text-white text-[15px] font-medium transition-all duration-300 hover:bg-white hover:text-neutral-900"
                                >
                                    Discover office furniture
                                </Link>
                            </motion.div>
                        )}
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="absolute bottom-10 right-10 hidden lg:flex flex-col items-center gap-4 z-20"
            >
                <div className="w-px h-20 bg-white/20 relative overflow-hidden">
                    <motion.div
                        animate={{ y: ["-100%", "100%"] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 w-full h-1/2 bg-primary"
                    />
                </div>
                <span className="text-[10px] uppercase tracking-[0.4em] text-white/50 origin-center rotate-90 translate-y-8">Scroll</span>
            </motion.div>
        </section>
    );
}
