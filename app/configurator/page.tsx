import { Configurator } from "@/components/configurator/Configurator";
import { Hero } from "@/components/home/Hero";
import { ContactTeaser } from "@/components/shared/ContactTeaser";

export default function ConfiguratorPage() {
    return (
        <main className="flex min-h-screen flex-col items-center bg-white">
            <Hero
                variant="small"
                title="3D Configurator"
                subtitle="Design your perfect workstation. Choose materials, colors and options."
                showButton={false}
                backgroundImage="/assets/images/hero-home.jpg"
            />
            <section className="container px-6 2xl:px-0 py-12 md:py-20">
                <Configurator />
            </section>
            <ContactTeaser />
        </main>
    );
}
