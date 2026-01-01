"use client";

import { motion } from "framer-motion";
import { Mail, HelpCircle, MessageSquare, AlertCircle } from "lucide-react";
import Navbar from "../../components/Navbar";

export default function CalvioSupportPage() {
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
                            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4">Calvio Support</h1>
                            <p className="text-gray-400 text-xl font-light">How can we help you today?</p>
                        </header>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <SupportCard 
                                icon={Mail}
                                title="Email Support"
                                description="Got a technical issue or a question about your subscription?"
                                contact="post@utvikleren.site"
                            />
                            <SupportCard 
                                icon={MessageSquare}
                                title="Feedback"
                                description="Suggestions for new features or improvements for Calvio?"
                                contact="Feedback in-app"
                            />
                        </div>

                        <section className="space-y-8 pt-12">
                            <h2 className="text-3xl font-semibold">Frequently Asked Questions</h2>
                            
                            <div className="space-y-6">
                                <FAQItem 
                                    question="How does the AI meal analysis work?"
                                    answer="Calvio uses advanced AI (Gemini API) to recognize food items in your photos or descriptions and calculates estimated calories and macronutrients based on standard nutritional databases."
                                />
                                <FAQItem 
                                    question="How do I manage my subscription?"
                                    answer="Since we use Apple Subscriptions, you can manage, pause, or cancel your subscription directly through your Apple ID settings on your iPhone or iPad."
                                />
                                <FAQItem 
                                    question="Is my data shared with anyone?"
                                    answer="Your personal health metrics are never sold. Meal data is processed anonymously by the Gemini API to provide you with nutritional insights."
                                />
                            </div>
                        </section>

                        <footer className="mt-20 p-8 bg-white/5 rounded-3xl border border-white/10 flex items-center gap-6">
                            <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">
                                <AlertCircle size={24} />
                            </div>
                            <div>
                                <p className="text-white font-medium">Need immediate assistance?</p>
                                <p className="text-gray-400 text-sm">Our typical response time is within 24 hours.</p>
                            </div>
                        </footer>
                    </motion.div>
                </div>
            </main>
        </div>
    );
}

function SupportCard({ icon: Icon, title, description, contact }: any) {
    return (
        <div className="p-8 bg-white/[0.03] border border-white/10 rounded-3xl hover:bg-white/[0.05] transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6">
                <Icon size={24} className="text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">{description}</p>
            <p className="text-white font-medium font-mono text-sm">{contact}</p>
        </div>
    );
}

function FAQItem({ question, answer }: { question: string, answer: string }) {
    return (
        <div className="space-y-2">
            <h4 className="text-xl font-medium text-white flex items-center gap-3">
                <HelpCircle size={18} className="text-gray-500" />
                {question}
            </h4>
            <p className="text-gray-400 leading-relaxed ml-7 font-light">
                {answer}
            </p>
        </div>
    );
}

