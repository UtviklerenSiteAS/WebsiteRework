
import React from 'react';

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-[#030303] text-white pt-32 pb-20 px-6 sm:px-10 font-sans">
            <div className="max-w-3xl mx-auto space-y-12">
                <header className="space-y-4 border-b border-white/10 pb-8">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-2">
                        Privacy Policy for <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Calvio</span>
                    </h1>
                    <p className="text-lg text-gray-400">Last Updated: February 1, 2026</p>
                </header>

                <main className="space-y-10 text-gray-300 leading-relaxed">
                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">1. Introduction</h2>
                        <p>
                            Calvio ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our mobile application (the "App").
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">2. Information We Collect</h2>
                        <p className="mb-4">We collect the following types of information:</p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li><strong className="text-white">Personal Information:</strong> Name, email address, and profile pictures provided during account creation.</li>
                            <li><strong className="text-white">Health & Fitness Data:</strong> Weight, height, age, gender, activity levels, and dietary goals to calculate calorie needs.</li>
                            <li><strong className="text-white">User Content:</strong> Photos of food you upload for AI analysis.</li>
                            <li><strong className="text-white">Usage Data:</strong> Logs, interactions, and device information to improve app performance.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">3. How We Use Your Information</h2>
                        <p className="mb-4">We use your data to:</p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>Provide accurate calorie and macronutrient tracking.</li>
                            <li>Analyze food images using AI (e.g., Google Gemini) to estimate nutritional content.</li>
                            <li>Manage your account and subscription (via RevenueCat).</li>
                            <li>Improve the App’s features and user experience.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">4. Data Storage and Sharing</h2>
                        <ul className="list-disc pl-5 space-y-2">
                            <li><strong className="text-white">Storage:</strong> Your data is securely stored using Supabase and other cloud providers.</li>
                            <li><strong className="text-white">Third Parties:</strong> We do not sell your data. We share data only with essential service providers (e.g., for authentication, payments, and AI processing) who adhere to strict data protection standards.</li>
                            <li><strong className="text-white">Legal Requirements:</strong> We may disclose information if required by law.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">5. Medical Disclaimer</h2>
                        <p>
                            The App provides nutritional estimates for informational purposes only. It is not a medical device and does not provide medical advice. Always consult a healthcare professional before making significant diet or lifestyle changes.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">6. Your Rights</h2>
                        <p>
                            Depending on your location (e.g., GDPR in Europe), you have the right to access, correct, or delete your personal data. You can delete your account directly within the App settings.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">7. Contact Us</h2>
                        <p>
                            If you have questions about this policy, please contact us at: <a href="mailto:post@utvikleren.site" className="text-blue-400 hover:text-blue-300 transition-colors">post@utvikleren.site</a>
                        </p>
                    </section>
                </main>
            </div>
        </div>
    );
}
