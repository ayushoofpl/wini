import { Users, Briefcase, Smile } from "lucide-react";
import { JobCard } from "@/components/career/JobCard";
import { Button } from "@/components/ui/Button";
import { Hero } from "@/components/home/Hero";
import { Newsletter } from "@/components/shared/Newsletter";
import { ContactTeaser } from "@/components/shared/ContactTeaser";

const JOBS = [
    {
        title: "Area Sales Manager (m/f/d)",
        department: "Sales",
        location: "Region: South Germany",
    },
    {
        title: "Product Designer (m/f/d)",
        department: "R&D",
        location: "Coppenbrügge",
    },
    {
        title: "Carpenter / Wood Mechanic (m/f/d)",
        department: "Production",
        location: "Coppenbrügge",
    },
];

export default function CareerPage() {
    return (
        <main className="flex min-h-screen flex-col items-center bg-white">
            {/* Hero */}
            <Hero
                variant="small"
                title="Work at WINI."
                subtitle="Become part of our team and help shape the office worlds of tomorrow."
                showButton={false}
                backgroundImage="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2000"
            />

            <section className="container px-6 2xl:px-0 py-24">
                <div className="max-w-4xl space-y-8 mb-24">
                    <h2 className="text-4xl md:text-5xl font-light text-neutral-900 tracking-tight">
                        Shape your <span className="text-primary italic">future.</span>
                    </h2>
                    <p className="text-xl md:text-2xl font-light text-neutral-600 leading-relaxed">
                        At WINI, we combine tradition with innovation. We are looking for people who want to change the world of work with us.
                        Become part of our success story.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="p-10 bg-neutral-50 rounded-3xl hover:bg-white border border-transparent hover:border-neutral-200 transition-all duration-500 group">
                        <Users className="w-12 h-12 text-primary mb-8 transition-transform group-hover:scale-110" />
                        <h3 className="text-2xl font-light text-neutral-900 mb-4">Family Spirit.</h3>
                        <p className="text-neutral-500 font-light leading-relaxed">Short decision paths, a supportive team, and a family-run business culture where every voice counts.</p>
                    </div>
                    <div className="p-10 bg-neutral-50 rounded-3xl hover:bg-white border border-transparent hover:border-neutral-200 transition-all duration-500 group">
                        <Briefcase className="w-12 h-12 text-primary mb-8 transition-transform group-hover:scale-110" />
                        <h3 className="text-2xl font-light text-neutral-900 mb-4">Development.</h3>
                        <p className="text-neutral-500 font-light leading-relaxed">We invest in your future through continuous training, development programs, and clear paths for growth.</p>
                    </div>
                    <div className="p-10 bg-neutral-50 rounded-3xl hover:bg-white border border-transparent hover:border-neutral-200 transition-all duration-500 group">
                        <Smile className="w-12 h-12 text-primary mb-8 transition-transform group-hover:scale-110" />
                        <h3 className="text-2xl font-light text-neutral-900 mb-4">Balance.</h3>
                        <p className="text-neutral-500 font-light leading-relaxed">Flexible working models, health benefits, and a culture that respects your private life and wellbeing.</p>
                    </div>
                </div>
            </section>

            {/* Open Positions */}
            <section className="w-full bg-neutral-50 py-24 border-y border-neutral-200">
                <div className="container px-6 2xl:px-0">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8 text-center md:text-left">
                            <h2 className="text-3xl font-light text-neutral-900">Current Opportunities</h2>
                            <p className="text-neutral-500 font-light pb-1">3 positions currently available</p>
                        </div>

                        <div className="space-y-6">
                            {JOBS.map((job, idx) => (
                                <JobCard
                                    key={idx}
                                    title={job.title}
                                    department={job.department}
                                    location={job.location}
                                />
                            ))}
                        </div>

                        <div className="mt-20 p-12 bg-white rounded-3xl border border-neutral-200 text-center space-y-6">
                            <h3 className="text-2xl font-light">Can't find what you're looking for?</h3>
                            <p className="text-neutral-500 font-light max-w-xl mx-auto">
                                We are always looking for talented individuals to join our team. Send us an unsolicited application and tell us how you can contribute to WINI.
                            </p>
                            <Button
                                variant="link"
                                className="text-primary hover:text-red-800 text-lg italic p-0 h-auto"
                                asChild
                            >
                                <a href="mailto:karriere@wini.de">karriere@wini.de</a>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            <Newsletter />
            <ContactTeaser />
        </main>
    );
}
