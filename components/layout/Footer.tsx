"use client";

import Link from "next/link";

export function Footer() {
    return (
        <footer className="w-full bg-neutral-50 text-neutral-500 py-16 lg:py-24 font-sans text-base lg:text-xl border-t border-neutral-200">
            <div className="container px-6 2xl:px-0">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-8">
                    {/* Brand Column */}
                    <div className="space-y-8 lg:col-span-1 border-r border-neutral-100 pr-8">
                        <Link href="/" className="block">
                            <img
                                src="/assets/images/wini-logo.svg"
                                alt="WINI"
                                className="w-[239px] lg:w-[308px] h-auto grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                            />
                        </Link>
                        <div className="space-y-2 text-sm lg:text-base font-light">
                            <p className="font-semibold text-neutral-900 uppercase tracking-wider">Our Headquarters</p>
                            <p>
                                WINI Büromöbel Georg Schmidt GmbH & Co. KG <br />
                                Auhagenstraße 79 <br />
                                31863 Coppenbrügge, Germany
                            </p>
                        </div>
                    </div>

                    {/* Navigation Columns */}
                    <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-8">
                        {/* Products */}
                        <div className="space-y-6">
                            <p className="text-xl lg:text-2xl font-semibold text-neutral-900">Products</p>
                            <ul className="flex flex-col gap-3 text-sm lg:text-lg font-light">
                                <li><Link href="/products" className="hover:text-primary transition-colors">All Products</Link></li>
                                <li><Link href="/products/working" className="hover:text-primary transition-colors">Working</Link></li>
                                <li><Link href="/products/collaboration" className="hover:text-primary transition-colors">Collaboration</Link></li>
                                <li><Link href="/products/communicating" className="hover:text-primary transition-colors">Communicating</Link></li>
                                <li><Link href="/configurator" className="hover:text-primary transition-colors text-primary font-medium italic">3D Configurator</Link></li>
                            </ul>
                        </div>

                        {/* Company */}
                        <div className="space-y-6">
                            <p className="text-xl lg:text-2xl font-semibold text-neutral-900">WINI</p>
                            <ul className="flex flex-col gap-3 text-sm lg:text-lg font-light">
                                <li><Link href="/company" className="hover:text-primary transition-colors">About Us</Link></li>
                                <li><Link href="/sustainability" className="hover:text-primary transition-colors">Sustainability</Link></li>
                                <li>
                                    <Link href="/career" className="relative hover:text-primary transition-colors inline-block">
                                        Career
                                        <span className="absolute -top-1 -right-2 w-1.5 h-1.5 bg-red-600 rounded-full" />
                                    </Link>
                                </li>
                                <li><Link href="/references" className="hover:text-primary transition-colors">References</Link></li>
                                <li><Link href="/news" className="hover:text-primary transition-colors">News</Link></li>
                            </ul>
                        </div>

                        {/* Service */}
                        <div className="space-y-6">
                            <p className="text-xl lg:text-2xl font-semibold text-neutral-900">Service</p>
                            <ul className="flex flex-col gap-3 text-sm lg:text-lg font-light">
                                <li><Link href="/downloads" className="hover:text-primary transition-colors">Downloads</Link></li>
                                <li><Link href="/planning" className="hover:text-primary transition-colors">Planning Service</Link></li>
                                <li><Link href="/showrooms" className="hover:text-primary transition-colors">Showrooms</Link></li>
                                <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
                                <li><Link href="/tracking" className="hover:text-primary transition-colors">Order Tracking</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-20 pt-8 border-t border-neutral-200 flex flex-col md:flex-row justify-between items-center gap-6 text-sm lg:text-base font-light text-neutral-400">
                    <div className="flex gap-6 lg:gap-12 flex-wrap justify-center">
                        <Link href="/imprint" className="hover:text-neutral-900 transition-colors">Imprint</Link>
                        <Link href="/privacy" className="hover:text-neutral-900 transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-neutral-900 transition-colors">Terms & Conditions</Link>
                    </div>
                    <div>
                        &copy; {new Date().getFullYear()} WINI Büromöbel. All rights reserved.
                    </div>
                </div>
            </div>
        </footer>
    );
}
