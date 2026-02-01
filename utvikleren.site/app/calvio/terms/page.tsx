
import React from 'react';

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-[#030303] text-white pt-32 pb-20 px-6 sm:px-10 font-sans">
            <div className="max-w-3xl mx-auto space-y-12">
                <header className="space-y-4 border-b border-white/10 pb-8">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-2">
                        Terms of Service for <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Calvio</span>
                    </h1>
                    <p className="text-lg text-gray-400">Last Updated: February 1, 2026</p>
                </header>

                <main className="space-y-10 text-gray-300 leading-relaxed">
                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">1. Acceptance of Terms</h2>
                        <p>
                            By downloading or using the Calvio app, you agree to these Terms of Service. If you do not agree, please do not use the App.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">2. Services Provided</h2>
                        <p>
                            Calvio offers AI-powered calorie tracking and nutritional analysis. We use artificial intelligence to estimate food content from images. While we strive for accuracy, <strong className="text-white">these are estimates only</strong> and may not be 100% precise.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">3. No Medical Advice</h2>
                        <p className="p-4 bg-white/5 border-l-4 border-red-500 rounded-r-lg">
                            <strong className="text-white block mb-2">Calvio is not a substitute for professional medical advice, diagnosis, or treatment.</strong>
                            You use the App at your own risk. We are not liable for any health issues resulting from your use of the App or reliance on its data.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">4. User Accounts</h2>
                        <p>
                            You are responsible for maintaining the confidentiality of your login credentials. You agree to notify us immediately of any unauthorized use of your account.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">5. Subscriptions and Refunds</h2>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>Premium features are available via subscription (Daily Credits, etc.).</li>
                            <li>Payments are processed through the Apple App Store or Google Play Store.</li>
                            <li>Subscriptions automatically renew unless canceled at least 24 hours before the end of the current period.</li>
                            <li>Refund requests must be directed to the respective app store (Apple or Google).</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">6. Prohibited Conduct</h2>
                        <p className="mb-4">You agree not to:</p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>Use the App for any illegal purpose.</li>
                            <li>Reverse engineer or attempt to extract the source code.</li>
                            <li>Upload inappropriate or illegal content.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">7. Limitation of Liability</h2>
                        <p>
                            To the fullest extent permitted by law, Calvio and its developers shall not be liable for any indirect, incidental, or consequential damages arising from your use of the App.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">8. Governing Law</h2>
                        <p>
                            These Terms are governed by the laws of Norway.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">9. Contact</h2>
                        <p>
                            For support or questions, please contact: <a href="mailto:post@utvikleren.site" className="text-purple-400 hover:text-purple-300 transition-colors">post@utvikleren.site</a>
                        </p>
                    </section>
                </main>
            </div>
        </div>
    );
}
