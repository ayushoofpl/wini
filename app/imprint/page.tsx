export default function ImprintPage() {
    return (
        <main className="flex min-h-screen flex-col items-center pt-24 bg-white">
            <section className="container px-6 2xl:px-0 py-12">
                <h1 className="font-slogan text-5xl md:text-6xl text-neutral-900 mb-12">
                    Imprint
                </h1>
                <div className="space-y-6 text-neutral-600 font-light">
                    <h2 className="text-xl font-medium text-neutral-900">Legal Information</h2>
                    <p>
                        <strong>WINI Büromöbel Georg Schmidt GmbH & Co. KG</strong><br />
                        Auhagenstraße 79<br />
                        31863 Coppenbrügge<br />
                        Germany
                    </p>
                    <p>
                        <strong>Represented by:</strong><br />
                        Managing Directors: [Name], [Name]
                    </p>
                    <p>
                        <strong>Contact:</strong><br />
                        Phone: +49 (0) 5156 979-0<br />
                        Email: info@wini.de
                    </p>
                    <p>
                        <strong>Register Entry:</strong><br />
                        Entry in the Handelsregister.<br />
                        Registering Court: [Court Name]<br />
                        Registration Number: [Number]
                    </p>
                    <p>
                        <strong>VAT ID:</strong><br />
                        Sales tax identification number according to Sect. 27 a of the Sales Tax Law:<br />
                        DE [Number]
                    </p>
                </div>
            </section>
        </main>
    );
}
