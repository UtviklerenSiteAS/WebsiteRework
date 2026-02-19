import Navbar from "@/components/navbar";
import RetroGrid from "@/components/ui/retro-grid";

export default function CalvioPrivacyPage() {
    return (
        <main className="relative min-h-screen bg-background font-sans">
            <Navbar />

            <div className="relative pt-32 pb-20 px-6">
                <div className="mx-auto max-w-3xl">
                    <h1 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                        Personvernerklæring for Calvio
                    </h1>

                    <div className="prose prose-invert max-w-none space-y-8 text-muted-foreground leading-relaxed">
                        <section>
                            <h2 className="text-2xl font-semibold text-foreground mb-4">1. Introduksjon</h2>
                            <p>
                                Calvio er en applikasjon utviklet og driftet av Utvikleren.site AS ("vi", "oss", eller "vår").
                                Din trygghet og personvern er viktig for oss. Denne personvernerklæringen forklarer hvordan vi
                                samler inn, bruker og beskytter dine personopplysninger når du bruker Calvio.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-foreground mb-4">2. Informasjon vi samler inn</h2>
                            <p>For å kunne tilby våre tjenester samler vi inn følgende informasjon:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li><strong>Brukerkonto:</strong> E-postadresse og navn ved registrering via Supabase Auth.</li>
                                <li><strong>Helsedata:</strong> Informasjon om måltider, kalorier og ernæring som du selv legger inn i appen.</li>
                                <li><strong>Bruksmønster:</strong> Aggregert informasjon om hvordan appen brukes for å forbedre brukeropplevelsen.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-foreground mb-4">3. Hvordan vi bruker informasjonen</h2>
                            <p>Vi bruker den innsamlede informasjonen til å:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Tilby og vedlikeholde Calvio-tjenesten.</li>
                                <li>Analysere måltider ved bruk av AI (Google Gemini) for å gi deg nøyaktig ernæringsinformasjon.</li>
                                <li>Sende viktige varsler og påminnelser via Firebase Cloud Messaging.</li>
                                <li>Behandle abonnementer og transaksjoner via Stripe.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-foreground mb-4">4. Underleverandører og deling av data</h2>
                            <p>Vi deler kun nødvendige data med våre troverdige partnere for å drifte tjenesten:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li><strong>Supabase:</strong> Database og autentisering.</li>
                                <li><strong>Google Cloud (Gemini & Firebase):</strong> AI-analyse og varslinger.</li>
                                <li><strong>Stripe:</strong> Betalingsbehandling.</li>
                            </ul>
                            <p className="mt-4">Vi selger aldri dine personopplysninger til tredjeparter.</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-foreground mb-4">5. Dine rettigheter</h2>
                            <p>
                                Du har rett til innsyn i egne personopplysninger, samt rett til å be om retting eller sletting
                                av opplysninger som er lagret hos oss. Du kan når som helst slette din brukerkonto direkte i appen,
                                noe som vil fjerne alle dine lagrede data.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-foreground mb-4">6. Kontakt oss</h2>
                            <p>
                                Har du spørsmål om vårt personvern? Kontakt oss på: <br />
                                <a href="mailto:post@utvikleren.site" className="text-blue-500 hover:underline">post@utvikleren.site</a>
                            </p>
                        </section>

                        <p className="text-sm border-t border-border pt-8 mt-12 italic">
                            Sist oppdatert: 19. februar 2026
                        </p>
                    </div>
                </div>
            </div>

            <RetroGrid />
        </main>
    );
}
