"use client";

import { useRef, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";

import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

interface VideoSectionProps {
    videoSrc?: string;
    posterSrc?: string;
    title: string;
    description: string;
    lightMode?: boolean; // If true, use dark text on light background, else white text on dark/video
    buttonText?: string;
    buttonLink?: string;
}

export function VideoSection({
    videoSrc,
    posterSrc,
    title,
    description,
    lightMode = false,
    buttonText = "Discover More",
    buttonLink = "/products"
}: VideoSectionProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;

        if (container) {
            Fancybox.bind(container, "[data-fancybox]", {});
        }

        return () => {
            if (container) {
                Fancybox.unbind(container);
                Fancybox.close();
            }
        };
    }, []);

    return (
        <section ref={containerRef} className={`relative w-full py-24 md:py-32 overflow-hidden ${lightMode ? 'bg-neutral-100' : 'bg-neutral-900'}`}>
            {/* Background Video or Image */}
            <div className="absolute inset-0 z-0">
                {videoSrc ? (
                    <>
                        <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover opacity-60 pointer-events-none"
                            poster={posterSrc}
                        >
                            <source src={videoSrc} type="video/mp4" />
                        </video>

                        {/* Lightbox Trigger Overlay */}
                        <a
                            href={videoSrc}
                            data-fancybox
                            className="absolute inset-0 z-20 flex items-center justify-center group cursor-pointer"
                            aria-label="Play Video"
                        >
                            <div className={`w-20 h-20 flex items-center justify-center rounded-full border-2 transition-all duration-300 transform group-hover:scale-110 ${lightMode ? 'border-neutral-900 bg-white/20 hover:bg-neutral-900 text-neutral-900 hover:text-white' : 'border-white bg-white/20 hover:bg-white text-white hover:text-neutral-900'}`}>
                                <Play className="w-8 h-8 fill-current" />
                            </div>
                        </a>
                    </>
                ) : (
                    /* Fallback generic background if no video is provided yet */
                    <div className={`w-full h-full ${lightMode ? 'bg-neutral-200' : 'bg-neutral-800'} animate-pulse`} />
                )}
                {/* Overlay Gradient */}
                <div className={`absolute inset-0 ${lightMode ? 'bg-white/80' : 'bg-black/40'}`} />
            </div>

            <div className="container relative z-10 px-6 2xl:px-0 h-full flex flex-col justify-center pointer-events-none">
                <div className="max-w-2xl space-y-6 pointer-events-auto">
                    <h2 className={`font-slogan text-5xl md:text-6xl ${lightMode ? 'text-neutral-900' : 'text-white'}`}>
                        {title}
                    </h2>
                    <p className={`text-xl font-light leading-relaxed ${lightMode ? 'text-neutral-600' : 'text-neutral-200'}`}>
                        {description}
                    </p>

                    <Button
                        asChild
                        size="lg"
                        variant={lightMode ? "outline" : "primary"}
                        className={lightMode ? "border-neutral-900 text-neutral-900 hover:bg-neutral-900 hover:text-white" : "bg-white text-neutral-900 hover:bg-neutral-200"}
                    >
                        <Link href={buttonLink} className="flex items-center gap-2">
                            {buttonText}
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
