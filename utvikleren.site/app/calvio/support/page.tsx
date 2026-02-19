import Navbar from "@/components/navbar";
import RetroGrid from "@/components/ui/retro-grid";
import { Mail, MessageSquare, ShieldCheck, Zap } from "lucide-react";

export default function CalvioSupportPage() {
    return (
        <main className="relative min-h-screen bg-background font-sans">
            <Navbar />

            <div className="relative pt-32 pb-20 px-6">
                <div className="mx-auto max-w-4xl">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-blue-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
                            Calvio Kundeservice
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            Vi er her for å hjelpe deg med å nå dine ernæringsmål. Ta kontakt med oss hvis du har spørsmål eller trenger hjelp.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                        <div className="bg-card/50 backdrop-blur-sm border border-border p-8 rounded-3xl hover:border-blue-500/50 transition-colors">
                            <Mail className="w-12 h-12 text-blue-500 mb-6" />
                            <h3 className="text-2xl font-bold mb-4">E-post støtte</h3>
                            <p className="text-muted-foreground mb-6">
                                Send oss en e-post for teknisk hjelp, spørsmål om abonnement eller tilbakemeldinger.
                            </p>
                            <a
                                href="mailto:post@utvikleren.site"
                                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
                            >
                                Send e-post
                            </a>
                        </div>

                        <div className="bg-card/50 backdrop-blur-sm border border-border p-8 rounded-3xl hover:border-violet-500/50 transition-colors">
                            <MessageSquare className="w-12 h-12 text-violet-500 mb-6" />
                            <h3 className="text-2xl font-bold mb-4">Ofte stilte spørsmål</h3>
                            <p className="text-muted-foreground mb-6">
                                Sjekk våre brukerveiledninger og svar på vanlige spørsmål direkte i appen.
                            </p>
                            <button className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-violet-600 text-white font-medium hover:bg-violet-700 transition-colors">
                                Se FAQ
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                        <div className="p-6">
                            <Zap className="w-8 h-8 text-cyan-500 mx-auto mb-4" />
                            <h4 className="font-bold mb-2">Rask respons</h4>
                            <p className="text-sm text-muted-foreground">Vi svarer vanligvis innen 24 timer på hverdager.</p>
                        </div>
                        <div className="p-6">
                            <ShieldCheck className="w-8 h-8 text-green-500 mx-auto mb-4" />
                            <h4 className="font-bold mb-2">Trygghet</h4>
                            <p className="text-sm text-muted-foreground">Dine data er alltid sikret og kryptert.</p>
                        </div>
                        <div className="p-6">
                            <Mail className="w-8 h-8 text-blue-500 mx-auto mb-4" />
                            <h4 className="font-bold mb-2">Direkte kontakt</h4>
                            <p className="text-sm text-muted-foreground">Du snakker med utviklerne direkte.</p>
                        </div>
                    </div>

                    <div className="mt-20 text-center text-sm text-muted-foreground">
                        <p>© 2026 Utvikleren.site AS. Alle rettigheter reservert.</p>
                        <div className="flex justify-center gap-4 mt-2">
                            <a href="/calvio/privacy" className="hover:text-foreground underline">Personvern</a>
                            <a href="/calvio/terms" className="hover:text-foreground underline">Vilkår</a>
                        </div>
                    </div>
                </div>
            </div>

            <RetroGrid />
        </main>
    );
}
