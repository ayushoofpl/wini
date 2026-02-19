import { MapPin, Phone, Mail } from "lucide-react";
import { Hero } from "@/components/home/Hero";

export default function ContactPage() {
    return (
        <main className="flex min-h-screen flex-col items-center bg-white">
            <Hero
                variant="small"
                title="Contact"
                subtitle="We are here for you. Get in touch with us."
                showButton={false}
                backgroundImage="/assets/images/hero-contact.jpg"
            />
            <section className="container px-6 2xl:px-0 py-20">


                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    <div className="space-y-8">
                        <h3 className="text-2xl font-normal text-neutral-900">Get in touch</h3>
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <MapPin className="w-6 h-6 text-primary mt-1" />
                                <div className="text-neutral-600 font-light">
                                    <p className="font-medium text-neutral-900 mb-1">WINI Büromöbel Georg Schmidt GmbH & Co. KG</p>
                                    <p>Auhagenstraße 79</p>
                                    <p>31863 Coppenbrügge</p>
                                    <p>Germany</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <Phone className="w-6 h-6 text-primary" />
                                <a href="tel:+49012345678" className="text-neutral-600 font-light hover:text-primary transition-colors">
                                    +49 (0) 5156 979-0
                                </a>
                            </div>

                            <div className="flex items-center gap-4">
                                <Mail className="w-6 h-6 text-primary" />
                                <a href="mailto:info@wini.de" className="text-neutral-600 font-light hover:text-primary transition-colors">
                                    info@wini.de
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="bg-neutral-50 p-8 border border-neutral-100">
                        <form className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-2">Name</label>
                                <input type="text" className="w-full px-4 py-3 bg-white border border-neutral-200 focus:border-primary outline-none transition-colors" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-2">Email</label>
                                <input type="email" className="w-full px-4 py-3 bg-white border border-neutral-200 focus:border-primary outline-none transition-colors" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-2">Message</label>
                                <textarea rows={4} className="w-full px-4 py-3 bg-white border border-neutral-200 focus:border-primary outline-none transition-colors" />
                            </div>
                            <button type="submit" className="bg-primary text-white px-8 py-3 uppercase tracking-wide text-sm font-medium hover:bg-neutral-900 transition-colors w-full md:w-auto">
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </main>
    );
}
