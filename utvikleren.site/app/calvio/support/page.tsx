
import React from 'react';
import { Mail, MessageSquare, ShieldCheck, FileText } from 'lucide-react';
import Link from 'next/link';

export default function SupportPage() {
    return (
        <div className="min-h-screen bg-[#030303] text-white pt-32 pb-20 px-6 sm:px-10 font-sans">
            <div className="max-w-4xl mx-auto space-y-16">

                {/* Header Section */}
                <header className="text-center space-y-6">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white">
                        Support for <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">Calvio</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
                        We're here to help you get the most out of your calorie tracking journey. If you have any questions or issues, please don't hesitate to reach out.
                    </p>
                </header>

                {/* Contact Options Grid */}
                <div className="grid md:grid-cols-2 gap-8">

                    {/* Email Support Card */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors duration-300 flex flex-col items-start gap-4">
                        <div className="p-3 bg-blue-500/20 rounded-lg text-blue-400">
                            <Mail className="w-8 h-8" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-semibold mb-2">Email Support</h2>
                            <p className="text-gray-400 mb-6">
                                Directly contact our development team. We typically respond within 24-48 hours.
                            </p>
                            <a
                                href="mailto:post@utvikleren.site"
                                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-white text-black font-medium hover:scale-105 transition-transform duration-200"
                            >
                                Output Email
                            </a>
                        </div>
                    </div>

                    {/* Quick Links Card */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors duration-300 flex flex-col items-start gap-4">
                        <div className="p-3 bg-purple-500/20 rounded-lg text-purple-400">
                            <FileText className="w-8 h-8" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-semibold mb-2">Legal & Privacy</h2>
                            <p className="text-gray-400 mb-6">
                                Review our policies regarding your data and usage terms.
                            </p>
                            <div className="flex gap-4">
                                <Link
                                    href="/calvio/privacy"
                                    className="text-white hover:text-purple-400 underline underline-offset-4 transition-colors"
                                >
                                    Privacy Policy
                                </Link>
                                <Link
                                    href="/calvio/terms"
                                    className="text-white hover:text-purple-400 underline underline-offset-4 transition-colors"
                                >
                                    Terms of Service
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* FAQ Section */}
                <section className="space-y-8">
                    <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>

                    <div className="grid gap-6">
                        <FaqItem
                            question="How do I cancel my subscription?"
                            answer="Subscriptions are managed directly through your device's app store. Go to your Apple ID settings (iOS) or Google Play Store (Android) subscriptions menu to cancel or modify your plan."
                        />
                        <FaqItem
                            question="How accurate is the AI calorie tracking?"
                            answer="Our AI analyzes your food photos to estimate nutritional content. While highly advanced, these are estimates intended for guidance. For strict medical diets, please consult a professional."
                        />
                        <FaqItem
                            question="Can I delete my account and data?"
                            answer="Yes. You can delete your account and all associated data directly within the Calvio app settings. This action is permanent and cannot be undone."
                        />
                        <FaqItem
                            question="I found a bug, how can I report it?"
                            answer="We appreciate your help in improving Calvio! Please email us at post@utvikleren.site with a description of the issue and any screenshots if possible."
                        />
                    </div>
                </section>

            </div>
        </div>
    );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
    return (
        <div className="p-6 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-all duration-200">
            <h3 className="text-xl font-semibold text-white mb-2">{question}</h3>
            <p className="text-gray-400 leading-relaxed">
                {answer}
            </p>
        </div>
    );
}
