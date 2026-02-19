import { Hero } from "@/components/home/Hero";
import { Newsletter } from "@/components/shared/Newsletter";
import { ContactTeaser } from "@/components/shared/ContactTeaser";
import { Configurator } from "@/components/configurator/Configurator";
import { PRODUCTS } from "@/data/products";
import { Download } from "lucide-react";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/shared/Reveal";
import { ParallaxGallery } from "@/components/product/ParallaxGallery";

export async function generateStaticParams() {
    return PRODUCTS.map((product) => ({
        category: product.category,
        product: product.id,
    }));
}

export default async function ProductDetailPage({ params }: { params: Promise<{ category: string, product: string }> }) {
    const { product: productId } = await params;

    // Find Product Data
    const product = PRODUCTS.find(p => p.id === productId);

    if (!product) {
        return notFound();
    }

    return (
        <main className="flex min-h-screen flex-col bg-white">
            {/* 1. Immersive Hero */}
            <Hero
                variant="cinema"
                title={<span className="uppercase">{product.name}</span>}
                subtitle={product.slogan}
                backgroundImage={product.gallery[0]}
                showButton={false}
            />

            <div className="flex flex-col lg:flex-row container px-6 2xl:px-0 py-24 gap-20 relative">
                {/* 2. Sticky Sidebar Navigation */}
                <aside className="w-full lg:w-1/4 hidden lg:block h-full">
                    <div className="sticky top-32 space-y-8">
                        <nav className="flex flex-col gap-4 text-sm uppercase tracking-widest text-neutral-500">
                            <a href="#overview" className="hover:text-primary transition-colors text-neutral-900 font-medium">Overview</a>
                            <a href="#features" className="hover:text-primary transition-colors">Features</a>
                            <a href="#gallery" className="hover:text-primary transition-colors">Gallery</a>
                            <a href="#configuration" className="hover:text-primary transition-colors">Configuration</a>
                            <a href="#technical" className="hover:text-primary transition-colors">Technical Data</a>
                        </nav>
                        <div className="pt-8 border-t border-neutral-100">
                            <button className="block w-full text-center bg-primary text-white py-4 font-medium uppercase tracking-wide hover:bg-neutral-900 transition-colors">
                                Request Quote
                            </button>
                            <button className="flex items-center justify-center w-full gap-2 mt-4 text-sm text-neutral-500 hover:text-primary transition-colors">
                                <Download className="w-4 h-4" /> Download Brochure
                            </button>
                        </div>
                    </div>
                </aside>

                {/* 3. Main Content Content */}
                <div className="w-full lg:w-3/4 space-y-32">

                    {/* Overview */}
                    <section id="overview" className="space-y-8">
                        <Reveal>
                            <h2 className="text-4xl md:text-5xl font-slogan leading-none text-neutral-900">
                                Diversity in <span className="text-primary italic">Unity.</span>
                            </h2>
                        </Reveal>
                        <Reveal delay={0.3}>
                            <p className="text-xl md:text-2xl text-neutral-600 font-light leading-relaxed">
                                {product.description}
                            </p>
                        </Reveal>
                    </section>

                    {/* Features Grid */}
                    <section id="features" className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {product.features.map((feature, i) => (
                            <Reveal key={i} delay={0.1 * i}>
                                <div className="p-8 bg-neutral-50 border border-neutral-100 hover:shadow-lg transition-shadow duration-300 group">
                                    <feature.icon className="w-10 h-10 text-primary mb-6 group-hover:scale-110 transition-transform" />
                                    <h3 className="text-xl font-medium mb-3">{feature.title}</h3>
                                    <p className="text-neutral-500 font-light">{feature.text}</p>
                                </div>
                            </Reveal>
                        ))}
                    </section>

                    {/* Gallery (Parallax Effect) */}
                    <ParallaxGallery
                        image={product.gallery[1] || product.gallery[0]}
                        caption="Open Space Berlin"
                    />

                    {/* Configuration */}
                    <section id="configuration" className="space-y-12">
                        <div className="space-y-4">
                            <Reveal>
                                <h2 className="text-4xl font-slogan text-neutral-900">Configure your <span className="text-primary italic">Model.</span></h2>
                            </Reveal>
                            <p className="text-neutral-500 font-light max-w-2xl">Adapt {product.name} to your specific needs. Choose sizes, materials, and colors directly in our 3D configurator.</p>
                        </div>
                        <div className="bg-neutral-50 p-8 md:p-12 rounded-none border border-neutral-200">
                            <Configurator />
                        </div>
                    </section>

                    {/* Technical Details Accordion (Simplified) */}
                    <section id="technical" className="space-y-8">
                        <h2 className="text-3xl font-light text-neutral-900">Technical Details</h2>
                        <div className="divide-y divide-neutral-200 border-y border-neutral-200">
                            {product.specs.map((spec, i) => (
                                <Reveal key={i} delay={0.05 * i}>
                                    <div className="py-6 flex justify-between items-center group cursor-pointer hover:bg-neutral-50 transition-colors px-4">
                                        <span className="text-lg font-medium text-neutral-700">{spec.label}</span>
                                        <span className="text-neutral-500 font-light">{spec.value}</span>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </section>

                </div>
            </div>

            <Newsletter />
            <ContactTeaser />
        </main>
    );
}
