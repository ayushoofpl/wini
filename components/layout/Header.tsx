"use client";

import Link from "next/link";
import { Search, Menu, Globe, ChevronDown, User } from "lucide-react";
import { useState, useEffect } from "react";
import clsx from "clsx";
import { MobileMenu } from "./MobileMenu";
import { SearchOverlay } from "./SearchOverlay";
import { MegaMenu } from "./MegaMenu";

const discoverMenuItems = [
    { label: "Desk systems", href: "/products/desks" },
    { label: "Storage systems", href: "/products/storage" },
    { label: "Meeting / Conference", href: "/products/meeting" },
    { label: "Room-in-room systems", href: "/products/room-in-room" },
    { label: "Room acoustics", href: "/products/acoustics" },
    { label: "Reception", href: "/products/reception" },
    { label: "Seating furniture", href: "/products/seating" },
    { label: "Accessories", href: "/products/accessories" },
];

const discoverMenuCards = [
    {
        title: "WINEA PRO",
        description: "The desk system for everything.",
        image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=800",
        href: "/products/desks/winea-pro"
    },
    {
        title: "WINEA FLOW",
        description: "Focus on movement.",
        image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800",
        href: "/products/desks/winea-flow"
    },
    {
        title: "WINEA MAXX",
        description: "Storage space redefined.",
        image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80&w=800",
        href: "/products/storage/winea-maxx"
    }
];

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [activeMenu, setActiveMenu] = useState<string | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Scrolled state for styling
            setIsScrolled(currentScrollY > 20);

            // Visibility (hide on scroll down, show on scroll up)
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setIsVisible(false);
                setActiveMenu(null);
            } else {
                setIsVisible(true);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    return (
        <>
            <header
                className={clsx(
                    "fixed top-0 left-0 w-full z-[1020] transition-all duration-500 ease-in-out",
                    isVisible ? "translate-y-0" : "-translate-y-full",
                    isScrolled
                        ? "bg-white/95 backdrop-blur-md shadow-sm py-2"
                        : "bg-white py-0",
                    "border-b border-neutral-100"
                )}
                onMouseLeave={() => setActiveMenu(null)}
            >
                <div className="flex flex-col w-full">
                    {/* Meta Navigation (Top Row) */}
                    <div className={clsx(
                        "w-full flex justify-end items-center transition-all duration-300 overflow-hidden bg-white border-b border-neutral-100",
                        isScrolled ? "h-0 opacity-0" : "h-10 opacity-100"
                    )}>
                        <div className="container px-6 2xl:px-0 flex justify-end items-center gap-6 text-[13px] font-normal text-neutral-500">
                            <Link href="/service" className="hover:text-primary transition-colors">Service</Link>
                            <Link href="/showrooms" className="hover:text-primary transition-colors">Showrooms</Link>
                            <Link href="/downloads" className="hover:text-primary transition-colors">Downloads</Link>
                            <Link href="/contact" className="hover:text-primary transition-colors">Contact us</Link>
                            <button
                                onClick={() => setIsSearchOpen(true)}
                                className="hover:text-primary transition-colors flex items-center gap-1.5"
                            >
                                <Search className="w-4 h-4" />
                            </button>
                            <button className="flex items-center gap-1 hover:text-primary transition-colors">
                                <span className="border border-neutral-300 rounded-full px-1 py-0.5 text-[10px]">DE</span>
                            </button>
                        </div>
                    </div>

                    {/* Main Navigation (Bottom Row) */}
                    <div className={clsx(
                        "container flex items-center justify-between px-6 2xl:px-0 transition-all duration-300",
                        isScrolled ? "h-16" : "h-20 lg:h-24"
                    )}>
                        {/* Logo Section */}
                        <div className="flex items-center shrink-0">
                            <Link href="/" className="flex items-center gap-2 group">
                                <span className="text-black font-black text-2xl tracking-tight">WINI</span>
                                {/* Red Triangle Icon */}
                                <div className="w-6 h-6 bg-primary" style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%)" }}></div>
                                <span className="text-neutral-600 font-light tracking-[0.1em] text-lg uppercase ml-1">MEIN BÜRO.</span>
                            </Link>
                        </div>

                        {/* Desktop Menu */}
                        <nav className="hidden lg:flex items-center gap-8 h-full">
                            {[
                                { label: "Discover office furniture", href: "/products", hasMegaMenu: true },
                                { label: "Shaping the world of work", href: "/solutions" },
                                { label: "Be inspired", href: "/references" },
                                { label: "Get to know WINI", href: "/company" }
                            ].map((item) => (
                                <div
                                    key={item.label}
                                    className="h-full flex items-center relative"
                                    onMouseEnter={() => item.hasMegaMenu ? setActiveMenu(item.label) : setActiveMenu(null)}
                                >
                                    <Link
                                        href={item.href}
                                        className={clsx(
                                            "h-full flex items-center text-[17px] font-normal tracking-tight transition-all duration-300 border-b-2 border-transparent",
                                            activeMenu === item.label
                                                ? "text-primary border-primary"
                                                : "text-neutral-500 hover:text-primary"
                                        )}
                                    >
                                        {item.label}
                                        {item.hasMegaMenu && <ChevronDown className={clsx("ml-1.5 w-4 h-4 transition-transform opacity-40", activeMenu === item.label && "rotate-180")} />}
                                    </Link>
                                </div>
                            ))}
                        </nav>

                        {/* Desktop Actions */}
                        <div className="hidden lg:flex items-center gap-8">
                            <Link href="/configurator" className="hidden xl:flex items-center gap-2 text-[15px] font-normal text-neutral-900 hover:text-primary transition-all">
                                <span>3D Configurator</span>
                            </Link>
                            <button className="text-neutral-900 hover:text-primary transition-colors">
                                <User className="w-5 h-5 stroke-[1.5]" />
                            </button>
                        </div>

                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setIsMenuOpen(true)}
                            className="flex lg:hidden items-center p-2 text-neutral-800 hover:text-primary transition-colors"
                        >
                            <Menu className="w-7 h-7" />
                        </button>
                    </div>
                </div>

                {/* Mega Menu Overlay */}
                <MegaMenu
                    isOpen={activeMenu === "Office furniture"}
                    onClose={() => setActiveMenu(null)}
                    items={discoverMenuItems}
                    cards={discoverMenuCards}
                />
            </header>

            {/* Mobile & Search Overlays */}
            <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
            <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </>
    );
}
