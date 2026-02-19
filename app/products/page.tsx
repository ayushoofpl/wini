import { CategoryGrid } from "@/components/home/CategoryGrid";
import { Hero } from "@/components/home/Hero";
import { Newsletter } from "@/components/shared/Newsletter";
import { ContactTeaser } from "@/components/shared/ContactTeaser";

export default function ProductsPage() {
    return (
        <main className="flex min-h-screen flex-col items-center bg-white">
            <Hero
                variant="small"
                title="Product Worlds"
                subtitle="Ergonomic, functional, and aesthetic office furniture for your specific needs."
                showButton={false}
                backgroundImage="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000"
            />

            <section className="container px-6 2xl:px-0 py-24">
                <div className="max-w-4xl space-y-8 mb-20">
                    <h2 className="text-4xl md:text-5xl font-light text-neutral-900 tracking-tight">
                        Form follows <span className="text-primary italic">Function.</span>
                    </h2>
                    <p className="text-xl md:text-2xl font-light text-neutral-600 leading-relaxed">
                        Our furniture is more than just objects in a room.
                        They are tools for productivity, symbols of corporate culture, and companions for your daily work.
                    </p>
                </div>

                <CategoryGrid />
            </section>

            <section className="w-full bg-neutral-50 py-24 border-y border-neutral-200">
                <div className="container px-6 2xl:px-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl">
                            <img
                                src="https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&q=80&w=1000"
                                alt="Ergonomics"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="space-y-8">
                            <h3 className="text-3xl font-light text-neutral-900">Health and Productivity.</h3>
                            <p className="text-lg text-neutral-500 font-light leading-relaxed">
                                Ergonomics is at the heart of everything we do. From height-adjustable desks to supportive seating,
                                our products are designed to keep you moving and feeling your best throughout the workday.
                            </p>
                            <ul className="space-y-4">
                                {[
                                    "Stepless height adjustment for ergonomic sitting and standing.",
                                    "Acoustic shielding options for focused work.",
                                    "Modular storage solutions for organized workflows.",
                                    "Sustainable materials and durable construction made in Germany."
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-neutral-700 text-lg">
                                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2.5 shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Highlight Section - New */}
            <section className="w-full py-32 bg-neutral-900 text-white overflow-hidden relative">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
                <div className="container px-6 2xl:px-0 relative z-10 flex flex-col md:flex-row items-center gap-16">
                    <div className="w-full md:w-1/2">
                        <img
                            src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=1200"
                            alt="WINEA PRO Detail"
                            className="rounded-none shadow-2xl w-full h-auto object-cover"
                        />
                    </div>
                    <div className="w-full md:w-1/2 space-y-8">
                        <div className="inline-block px-3 py-1 border border-white/20 text-xs uppercase tracking-widest text-white/60 mb-4">
                            Spotlight
                        </div>
                        <h2 className="text-5xl md:text-6xl font-slogan leading-none tracking-tight">
                            WINEA <span className="text-primary italic">PRO.</span>
                        </h2>
                        <p className="text-xl text-neutral-400 font-light leading-relaxed">
                            The desk system that adapts to you. Whether singular workstation or team bench – WINEA PRO offers the perfect solution for every requirement.
                        </p>
                        <a href="/products/desks/winea-pro" className="inline-flex items-center gap-2 text-white border-b border-white hover:border-primary hover:text-primary transition-colors text-lg uppercase tracking-widest mt-8 pb-1">
                            Discover WINEA PRO <span className="text-2xl">→</span>
                        </a>
                    </div>
                </div>
            </section>

            <Newsletter />
            <ContactTeaser />
        </main>
    );
}
