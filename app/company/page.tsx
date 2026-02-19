import { Values } from "@/components/home/Values";
import { Hero } from "@/components/home/Hero";
import { StatsSection } from "@/components/home/StatsSection";
import { Newsletter } from "@/components/shared/Newsletter";
import { ContactTeaser } from "@/components/shared/ContactTeaser";

export default function CompanyPage() {
    return (
        <main className="flex min-h-screen flex-col items-center bg-white">
            <Hero
                variant="small"
                title="Company Profile"
                subtitle="A family business with tradition and a vision for the future of work."
                showButton={false}
                backgroundImage="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000"
            />

            <section className="container px-6 2xl:px-0 py-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8">
                        <h2 className="text-4xl md:text-5xl font-light text-neutral-900 leading-tight">
                            Quality made in <span className="text-primary italic">Germany.</span>
                        </h2>
                        <p className="text-xl font-light text-neutral-600 leading-relaxed">
                            WINI Büromöbel is a medium-sized family business with over 100 years of history.
                            We stand for high-quality office furniture and holistic furnishing concepts that adapt to people - not the other way around.
                        </p>
                        <p className="text-lg font-light text-neutral-500 leading-relaxed">
                            Based in Coppenbrügge, we combine traditional craftsmanship with state-of-the-art production technologies.
                            Our modular systems offer maximum flexibility for the ever-changing requirements of the modern working world.
                        </p>
                    </div>
                    <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
                        <img
                            src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1000"
                            alt="WINI Production"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </section>

            <Values />

            <section className="w-full bg-neutral-900 text-white py-24">
                <div className="container px-6 2xl:px-0">
                    <div className="max-w-3xl space-y-8">
                        <h2 className="text-4xl font-light">Our Philosophy</h2>
                        <p className="text-xl font-light text-white/70 leading-relaxed">
                            We don't just sell furniture; we create spaces where people feel comfortable and can work productively.
                            Sustainability, ergonomics, and design are the cornerstones of our development process.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 text-white/60">
                            <div className="space-y-4">
                                <h4 className="text-white font-medium text-lg italic underline decoration-primary underline-offset-8">Human-Centric</h4>
                                <p>Every product is designed with the user's wellbeing and productivity in mind.</p>
                            </div>
                            <div className="space-y-4">
                                <h4 className="text-white font-medium text-lg italic underline decoration-primary underline-offset-8">Future-Proof</h4>
                                <p>Modular systems that can grow and change with your organization.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <StatsSection
                title="Our History. Your Security."
                subtitle="From a local joinery to a specialist in ergonomic desk systems. We are proud of our roots and our innovation."
                stats={[
                    { value: "1908", label: "Year founded" },
                    { value: "4th", label: "Generation Family-run" },
                    { value: "120k", label: "Sqm Production Area" },
                    { value: "Red Dot", label: "Design Awards" }
                ]}
            />

            <Newsletter />

            <ContactTeaser />
        </main>
    );
}
