"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function ContactTeaser() {
    return (
        <section className="w-full bg-neutral-900 py-24 text-center">
            <div className="container px-6 2xl:px-0">
                <h2 className="font-slogan text-5xl md:text-6xl text-white mb-6">
                    Have any questions?
                </h2>
                <p className="text-xl text-neutral-400 font-light mb-10 max-w-2xl mx-auto">
                    We are happy to help you with your office planning.
                    Contact us for a personal consultation.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button
                        asChild
                        variant="primary"
                        className="bg-white text-neutral-900 hover:bg-neutral-200 px-8 py-6 text-lg"
                    >
                        <Link href="/contact">
                            Contact Us
                        </Link>
                    </Button>
                    <Button
                        asChild
                        variant="link"
                        className="text-white hover:text-primary px-8 py-6 text-lg"
                    >
                        <Link href="/support-ivr" className="flex items-center gap-2">
                            Go to Support <ArrowRight className="w-5 h-5" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
