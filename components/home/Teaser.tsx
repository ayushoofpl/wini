"use client";

import Link from "next/link";
import { Reveal } from "@/components/shared/Reveal";
import { cn } from "@/lib/utils";

interface TeaserProps {
    title: string;
    subtitle?: string;
    description?: string;
    linkText?: string;
    linkUrl?: string;
    imageSrc?: string;
    videoSrc?: string;
    imageAlt?: string;
    reversed?: boolean;
    lightMode?: boolean;
}

export function Teaser({
    title,
    subtitle,
    description,
    linkText = "Read more",
    linkUrl = "#",
    imageSrc,
    videoSrc,
    imageAlt = "Teaser image",
    reversed = false,
    lightMode = false,
    className,
}: TeaserProps & { className?: string }) {
    return (
        <section className={cn("w-full py-24 md:py-32", lightMode ? "bg-white text-neutral-900" : "bg-neutral-900 text-white", className)}>
            <div className="container px-6 2xl:px-0">
                <div className={cn("flex flex-col gap-16 items-center", reversed ? "md:flex-row-reverse" : "md:flex-row")}>

                    {/* Content */}
                    <div className="w-full md:w-1/2 space-y-8">
                        {subtitle && (
                            <Reveal>
                                <span className={cn("text-sm font-medium tracking-widest uppercase", lightMode ? "text-primary" : "text-primary")}>
                                    {subtitle}
                                </span>
                            </Reveal>
                        )}

                        <Reveal delay={0.1}>
                            <h2 className="text-[40px] md:text-[50px] font-light leading-[1.1] tracking-tight">
                                {title}
                            </h2>
                        </Reveal>

                        {description && (
                            <Reveal delay={0.2}>
                                <p className={cn("text-xl font-light leading-relaxed max-w-xl", lightMode ? "text-neutral-600" : "text-neutral-300")}>
                                    {description}
                                </p>
                            </Reveal>
                        )}

                        <Reveal delay={0.3}>
                            <Link
                                href={linkUrl}
                                className={cn(
                                    "inline-flex items-center gap-2 border-b pb-1 transition-colors text-lg uppercase tracking-widest mt-4",
                                    lightMode ? "text-neutral-900 border-neutral-900 hover:text-primary hover:border-primary" : "text-white border-white hover:text-primary hover:border-primary"
                                )}
                            >
                                {linkText} <span className="text-2xl">→</span>
                            </Link>
                        </Reveal>
                    </div>

                    {/* Visual */}
                    <div className="w-full md:w-1/2">
                        <Reveal delay={0.2} width="100%">
                            <div className="aspect-[4/3] rounded-sm overflow-hidden relative group">
                                {videoSrc ? (
                                    <video
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000"
                                    >
                                        <source src={videoSrc} type="video/mp4" />
                                    </video>
                                ) : (
                                    <img
                                        src={imageSrc}
                                        alt={imageAlt}
                                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000"
                                    />
                                )}
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
                            </div>
                        </Reveal>
                    </div>

                </div>
            </div>
        </section>
    );
}
