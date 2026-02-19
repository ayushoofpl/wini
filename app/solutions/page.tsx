import { Hero } from "@/components/home/Hero";
import { Newsletter } from "@/components/shared/Newsletter";
import { ContactTeaser } from "@/components/shared/ContactTeaser";
import { ContentBlock } from "@/components/shared/ContentBlock";
import { Reveal } from "@/components/shared/Reveal";

export default function SolutionsPage() {
    return (
        <main className="flex min-h-screen flex-col items-center bg-white">
            <Hero
                variant="cinema"
                title={<>Shaping the <br /><span className="text-primary italic">Future</span> of work.</>}
                subtitle="We don't just supply furniture. We develop holistic concepts for modern, healthy, and productive working environments."
                showButton={false}
                backgroundImage="https://images.unsplash.com/photo-1497215842964-2229243e8a01?auto=format&fit=crop&q=80&w=2000"
            />

            <section className="container px-6 2xl:px-0 py-32">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div className="space-y-8">
                        <Reveal>
                            <h2 className="text-5xl md:text-7xl font-slogan text-neutral-900 leading-[0.9] tracking-tight">
                                More than <br />just <span className="text-primary italic">Furniture.</span>
                            </h2>
                        </Reveal>
                        <Reveal delay={0.4}>
                            <p className="text-xl md:text-2xl font-light text-neutral-500 leading-relaxed">
                                Whether it's an agile project room, a concentration zone, or a representative conference room - we create space for your success. Our approach is holistic, combining ergonomics, acoustics, and modularity.
                            </p>
                        </Reveal>
                    </div>
                    <div className="relative group">
                        <img
                            src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=1200"
                            alt="Office Atmosphere"
                            className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-1000 shadow-2xl"
                        />
                        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/10 -z-10 group-hover:translate-x-4 group-hover:translate-y-4 transition-transform duration-700" />
                    </div>
                </div>
            </section>

            <section className="w-full bg-neutral-900 py-32">
                <div className="container px-6 2xl:px-0">
                    <Reveal>
                        <h2 className="text-4xl md:text-6xl font-slogan text-white mb-20">The WINI <span className="text-primary italic">Process.</span></h2>
                    </Reveal>
                </div>

                <ContentBlock
                    title="Analysis & Strategy."
                    subtitle="Step 01"
                    description="We understand your organization. Our workplace experts analyze your workflows, communication structures, and acoustic requirements to create a solid foundation for your new office."
                    imageSrc="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=2000"
                    align="left"
                    linkText="Book Consultation"
                    linkHref="/contact"
                />

                <ContentBlock
                    title="Holistic Planning."
                    subtitle="Step 02"
                    description="Visualizing the future. We create detailed 3D plans, lighting concepts, and acoustic simulations. You'll see exactly how your new office will look and feel before a single piece of furniture is moved."
                    imageSrc="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=2000"
                    align="right"
                    linkText="View References"
                    linkHref="/references"
                />

                <ContentBlock
                    title="Realization & Service."
                    subtitle="Step 03"
                    description="Precision in execution. Our certified assembly teams ensure everything is installed perfectly. And we stay by your side long after the project is done, with maintenance services and future adaptations."
                    imageSrc="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=2000"
                    align="left"
                    linkText="Contact Service"
                    linkHref="/service"
                />
            </section>

            <section className="w-full py-32 bg-white">
                <div className="container px-6 2xl:px-0 text-center space-y-12">
                    <Reveal>
                        <h2 className="text-5xl md:text-7xl font-slogan text-neutral-900 leading-none">Ready to <span className="text-primary italic">transform?</span></h2>
                    </Reveal>
                    <p className="text-xl md:text-2xl text-neutral-500 font-light max-w-2xl mx-auto">
                        Join hundreds of companies that have created inspiring workplaces with WINI.
                    </p>
                    <div className="pt-8">
                        <a href="/contact" className="px-12 py-6 bg-neutral-900 text-white hover:bg-primary transition-all uppercase tracking-widest font-bold inline-block">
                            Start your Project
                        </a>
                    </div>
                </div>
            </section>

            <Newsletter />
            <ContactTeaser />
        </main>
    );
}
