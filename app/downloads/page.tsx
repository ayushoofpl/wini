import { FileText, Download, Box, ArrowRight } from "lucide-react";
import { Hero } from "@/components/home/Hero";
import { ContactTeaser } from "@/components/shared/ContactTeaser";
import { Newsletter } from "@/components/shared/Newsletter";

export default function DownloadsPage() {
    return (
        <main className="flex min-h-screen flex-col items-center bg-white">
            <Hero
                variant="small"
                title="Service & Info."
                subtitle="All information about our products, brochures, pCon data and certificates."
                showButton={false}
                backgroundImage="https://images.unsplash.com/photo-1497215842964-2229243e8a01?auto=format&fit=crop&q=80&w=2000"
            />
            <section className="container px-6 2xl:px-0 py-24">
                <div className="max-w-4xl space-y-8 mb-20">
                    <h2 className="text-4xl md:text-5xl font-light text-neutral-900 tracking-tight">
                        Resources at your <span className="text-primary italic">fingertips.</span>
                    </h2>
                    <p className="text-xl font-light text-neutral-600 leading-relaxed">
                        We provide you with all the necessary documents and data for your planning and information.
                        Always up to date and ready for download.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Download Card 1 */}
                    <div className="group bg-neutral-50 p-10 rounded-3xl hover:bg-neutral-900 transition-all duration-500 cursor-pointer shadow-sm hover:shadow-2xl">
                        <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-primary/20 transition-colors">
                            <FileText className="w-8 h-8 text-primary" />
                        </div>
                        <h3 className="text-xl font-light text-neutral-900 mb-2 group-hover:text-white transition-colors">Product Brochure 2024</h3>
                        <p className="text-neutral-500 font-light mb-8 group-hover:text-white/60 transition-colors">Overview of our complete collection.</p>
                        <span className="text-xs uppercase tracking-widest font-medium text-primary flex items-center gap-2">
                            PDF (12 MB) <Download className="w-4 h-4" />
                        </span>
                    </div>

                    {/* Download Card 2 */}
                    <div className="group bg-neutral-50 p-10 rounded-3xl hover:bg-neutral-900 transition-all duration-500 cursor-pointer shadow-sm hover:shadow-2xl">
                        <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-primary/20 transition-colors">
                            <Box className="w-8 h-8 text-primary" />
                        </div>
                        <h3 className="text-xl font-light text-neutral-900 mb-2 group-hover:text-white transition-colors">pCon.planner Data</h3>
                        <p className="text-neutral-500 font-light mb-8 group-hover:text-white/60 transition-colors">OFML data for professional planning.</p>
                        <span className="text-xs uppercase tracking-widest font-medium text-primary flex items-center gap-2">
                            ZIP (450 MB) <Download className="w-4 h-4" />
                        </span>
                    </div>

                    {/* Download Card 3 */}
                    <div className="group bg-neutral-50 p-10 rounded-3xl hover:bg-neutral-900 transition-all duration-500 cursor-pointer shadow-sm hover:shadow-2xl">
                        <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-primary/20 transition-colors">
                            <FileText className="w-8 h-8 text-primary" />
                        </div>
                        <h3 className="text-xl font-light text-neutral-900 mb-2 group-hover:text-white transition-colors">Sustainability Report</h3>
                        <p className="text-neutral-500 font-light mb-8 group-hover:text-white/60 transition-colors">Our commitment to the environment.</p>
                        <span className="text-xs uppercase tracking-widest font-medium text-primary flex items-center gap-2">
                            PDF (5 MB) <Download className="w-4 h-4" />
                        </span>
                    </div>

                    {/* Download Card 4 */}
                    <div className="group bg-neutral-50 p-10 rounded-3xl hover:bg-neutral-900 transition-all duration-500 cursor-pointer shadow-sm hover:shadow-2xl">
                        <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-primary/20 transition-colors">
                            <FileText className="w-8 h-8 text-primary" />
                        </div>
                        <h3 className="text-xl font-light text-neutral-900 mb-2 group-hover:text-white transition-colors">Manuals</h3>
                        <p className="text-neutral-500 font-light mb-8 group-hover:text-white/60 transition-colors">Operating instructions for systems.</p>
                        <span className="text-xs uppercase tracking-widest font-medium text-primary flex items-center gap-2">
                            View Folder <ArrowRight className="w-4 h-4" />
                        </span>
                    </div>
                </div>
            </section>

            <Newsletter />
            <ContactTeaser />
        </main>
    );
}
