import { Values } from "@/components/home/Values";

export default function AboutUsPage() {
    return (
        <main className="flex min-h-screen flex-col items-center pt-24 bg-white">
            <section className="container px-6 2xl:px-0 py-12">
                <h1 className="font-slogan text-6xl md:text-7xl text-neutral-900 mb-8">
                    About Us
                </h1>
                <div className="space-y-6 text-lg font-light text-neutral-700 leading-relaxed">
                    <p>
                        WINI Büromöbel is a family-owned company with a long tradition of excellence. Since 1908, we have been developing high-quality office furniture that combines functionality with aesthetic appeal.
                    </p>
                    <p>
                        Our philosophy is simple: we create environments where people love to work. We believe that a well-designed office contributes significantly to the wellbeing and productivity of employees.
                    </p>
                    <p>
                        Operating from our headquarters in Coppenbrügge, Germany, we serve clients worldwide, providing customized solutions that meet the highest standards of quality and sustainability.
                    </p>
                </div>
            </section>
            <Values />
        </main>
    );
}
