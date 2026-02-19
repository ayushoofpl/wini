import { Hero } from "@/components/home/Hero";
import { Newsletter } from "@/components/shared/Newsletter";
import { ContactTeaser } from "@/components/shared/ContactTeaser";
import { PRODUCTS, CATEGORIES } from "@/data/products";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/shared/Reveal";

export async function generateStaticParams() {
    return CATEGORIES.map((category) => ({
        category: category.id,
    }));
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
    const { category } = await params;

    // Find Category Info
    const catInfo = CATEGORIES.find(c => c.id === category);

    // Filter Products
    const products = PRODUCTS.filter(p => p.category === category);

    if (!catInfo) {
        return notFound();
    }

    return (
        <main className="flex min-h-screen flex-col items-center bg-white">
            <Hero
                variant="small"
                title={catInfo.title}
                subtitle={`Explore our collection of ${catInfo.title.toLowerCase()}.`}
                showButton={false}
                backgroundImage={catInfo.image}
            />

            <section className="container px-6 2xl:px-0 py-24">
                <Reveal>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {products.map((product) => (
                            <Link
                                key={product.id}
                                href={`/products/${category}/${product.id}`}
                                className="group block"
                            >
                                <div className="aspect-[4/3] overflow-hidden mb-6 bg-neutral-100 relative">
                                    <img
                                        src={product.gallery[0]}
                                        alt={product.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" // Zoom on hover
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-light text-neutral-900 group-hover:text-primary transition-colors">
                                        {product.name}
                                    </h3>
                                    <p className="text-neutral-500 font-light line-clamp-2">
                                        {product.slogan}
                                    </p>
                                    <div className="flex items-center gap-2 text-sm uppercase tracking-widest text-neutral-900 font-medium mt-4 group-hover:translate-x-2 transition-transform">
                                        View Details <ArrowRight className="w-4 h-4" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </Reveal>

                {products.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-xl text-neutral-500">Coming Soon.</p>
                        <Link href="/products" className="text-primary hover:underline mt-4 inline-block">
                            Back to all categories
                        </Link>
                    </div>
                )}
            </section>

            <Newsletter />
            <ContactTeaser />
        </main>
    );
}
