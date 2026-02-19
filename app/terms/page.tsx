export default function TermsPage() {
    return (
        <main className="flex min-h-screen flex-col items-center pt-24 bg-white">
            <section className="container px-6 2xl:px-0 py-12">
                <h1 className="font-slogan text-5xl md:text-6xl text-neutral-900 mb-12">
                    Terms & Conditions
                </h1>
                <div className="space-y-6 text-neutral-600 font-light">
                    <h2 className="text-xl font-medium text-neutral-900">General Terms and Conditions</h2>
                    <p>
                        (This is a placeholder for the full terms and conditions text.)
                    </p>
                    <p>
                        <strong>1. Scope</strong><br />
                        These terms and conditions apply to all business relationships between us and our customers.
                    </p>
                    <p>
                        <strong>2. Conclusion of Contract</strong><br />
                        The presentation of products in our online shop does not constitute a legally binding offer, but a non-binding online catalog.
                    </p>
                </div>
            </section>
        </main>
    );
}
