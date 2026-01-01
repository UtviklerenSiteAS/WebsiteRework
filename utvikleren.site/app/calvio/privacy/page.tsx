"use client";

import { motion } from "framer-motion";
import Navbar from "../../components/Navbar";

export default function CalvioPrivacyPage() {
    return (
        <div className="bg-black text-white min-h-screen font-sans selection:bg-white selection:text-black">
            <Navbar />

            <main className="pt-40 pb-24 px-6">
                <div className="max-w-[800px] mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-12"
                    >
                        <header className="border-b border-white/20 pb-10">
                            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4">Privacy Policy</h1>
                            <p className="text-gray-400 text-xl font-light">Last updated: January 1, 2026</p>
                        </header>

                        <section className="space-y-6">
                            <h2 className="text-3xl font-semibold">1. Information We Collect</h2>
                            <p className="text-gray-400 leading-relaxed">
                                Calvio collects information necessary to provide you with personalized AI-powered meal analysis and health tracking. This includes:
                            </p>
                            <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
                                <li><strong>Personal Data:</strong> Name, age, and gender.</li>
                                <li><strong>Health Metrics:</strong> Current weight and weight goal.</li>
                                <li><strong>Meal Data:</strong> Photos and descriptions of meals you submit for analysis.</li>
                            </ul>
                        </section>

                        <section className="space-y-6">
                            <h2 className="text-3xl font-semibold">2. How We Use Your Data</h2>
                            <p className="text-gray-400 leading-relaxed">
                                Your data is used exclusively to:
                            </p>
                            <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
                                <li>Provide accurate nutritional analysis of your meals using the Gemini API.</li>
                                <li>Track your progress towards your weight goals.</li>
                                <li>Personalize your experience within the Calvio app.</li>
                            </ul>
                        </section>

                        <section className="space-y-6">
                            <h2 className="text-3xl font-semibold">3. Data Analysis and AI</h2>
                            <p className="text-gray-400 leading-relaxed">
                                Calvio uses the Gemini API (Google) to analyze meal photos and text descriptions. When you submit a meal, relevant data is processed by Gemini to provide nutritional information. We do not use your personal health metrics (like weight) in a way that identifies you to third-party AI providers.
                            </p>
                        </section>

                        <section className="space-y-6">
                            <h2 className="text-3xl font-semibold">4. Payments and Subscriptions</h2>
                            <p className="text-gray-400 leading-relaxed">
                                All financial transactions are handled securely through <strong>Apple Subscriptions</strong>. Calvio does not store or have access to your credit card information or banking details. Please refer to Apple's privacy policy for details on how they manage payment data.
                            </p>
                        </section>

                        <section className="space-y-6">
                            <h2 className="text-3xl font-semibold">5. Data Retention</h2>
                            <p className="text-gray-400 leading-relaxed">
                                We retain your personal data only as long as you maintain an active account with Calvio. You can request the deletion of your data at any time through the app settings or by contacting our support team.
                            </p>
                        </section>

                        <section className="space-y-6 border-t border-white/10 pt-10">
                            <h2 className="text-3xl font-semibold">Contact Us</h2>
                            <p className="text-gray-400 leading-relaxed">
                                If you have any questions about this Privacy Policy, please contact us at:
                                <br />
                                <span className="text-white mt-2 block">post@utvikleren.site</span>
                            </p>
                        </section>
                    </motion.div>
                </div>
            </main>
        </div>
    );
}

