"use client";

import { X, ChevronRight, Globe, Search } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

type MobileMenuProps = {
    isOpen: boolean;
    onClose: () => void;
};

const MAIN_LINKS = [
    { label: "Products", href: "/products" },
    { label: "Solutions", href: "/solutions" },
    { label: "References", href: "/references" },
    { label: "Company", href: "/company" },
];

const SECONDARY_LINKS = [
    { label: "Configurator", href: "/configurator" },
    { label: "Support & Contact", href: "/support-ivr" },
    { label: "Sustainability", href: "/sustainability" },
    { label: "Downloads", href: "/downloads" },
    { label: "Careers", href: "/career" },
];

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, x: "100%" }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: "100%" }}
                    transition={{ type: "tween", duration: 0.3, ease: "circOut" }}
                    className="fixed inset-0 bg-white z-[1100] flex flex-col font-sans overflow-hidden"
                >
                    {/* Header with Close */}
                    <div className="flex items-center justify-between px-6 h-20 border-b border-neutral-100 shrink-0">
                        <div className="w-24 h-8 bg-primary flex items-center justify-center text-white font-bold text-xl tracking-tighter">
                            WINI
                        </div>
                        <button
                            onClick={onClose}
                            className="w-10 h-10 flex items-center justify-center bg-neutral-100 hover:bg-neutral-200 rounded-full transition-colors"
                        >
                            <X className="w-6 h-6 text-neutral-900" />
                        </button>
                    </div>

                    {/* Scrollable Content */}
                    <div className="flex-1 overflow-y-auto bg-white">
                        <div className="flex flex-col min-h-full">

                            {/* Search Bar */}
                            <div className="px-6 py-8">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        className="w-full h-12 pl-12 pr-4 bg-neutral-50 border border-neutral-200 rounded-none focus:outline-none focus:border-primary text-lg"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                                </div>
                            </div>

                            {/* Main Navigation */}
                            <nav className="px-6 pb-8">
                                <ul className="space-y-4">
                                    {MAIN_LINKS.map((link, idx) => (
                                        <motion.li
                                            key={link.href}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.1 + idx * 0.05 }}
                                        >
                                            <Link
                                                href={link.href}
                                                onClick={onClose}
                                                className="flex items-center justify-between group py-2"
                                            >
                                                <span className="text-3xl md:text-4xl font-light text-neutral-900 group-hover:text-primary transition-colors">
                                                    {link.label}
                                                </span>
                                                <ChevronRight className="w-6 h-6 text-neutral-300 group-hover:text-primary transition-colors" />
                                            </Link>
                                        </motion.li>
                                    ))}
                                </ul>
                            </nav>

                            {/* Divider with Logo Mark background idea if needed, otherwise simplified */}
                            <div className="h-px bg-neutral-100 mx-6 mb-8" />

                            {/* Secondary Navigation */}
                            <nav className="px-6 pb-12">
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                                    {SECONDARY_LINKS.map((link, idx) => (
                                        <motion.li
                                            key={link.href}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.3 + idx * 0.05 }}
                                        >
                                            <Link
                                                href={link.href}
                                                onClick={onClose}
                                                className="text-lg text-neutral-500 hover:text-neutral-900 transition-colors flex items-center gap-2"
                                            >
                                                {link.label}
                                            </Link>
                                        </motion.li>
                                    ))}
                                </ul>
                            </nav>
                        </div>
                    </div>

                    {/* Footer / Meta Actions */}
                    <div className="bg-neutral-50 p-6 border-t border-neutral-100 shrink-0">
                        <div className="flex items-center justify-between">
                            <div className="flex gap-6">
                                <button className="flex items-center gap-2 text-neutral-600 hover:text-primary">
                                    <Globe className="w-5 h-5" />
                                    <span className="font-medium">EN</span>
                                </button>
                                <Link href="/contact" className="text-neutral-600 hover:text-primary font-medium">
                                    Contact
                                </Link>
                            </div>
                            <div className="text-xs text-neutral-400">
                                © {new Date().getFullYear()} WINI
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
