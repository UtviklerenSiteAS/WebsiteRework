import Navbar from "@/components/navbar";
import { RetroGrid } from "@/components/ui/retro-grid";

export default function CalvioTermsPage() {
    return (
        <main className="relative min-h-screen bg-background font-sans">
            <Navbar />

            <div className="relative pt-32 pb-20 px-6">
                <div className="mx-auto max-w-3xl">
                    <h1 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
                        Brukervilkår for Calvio
                    </h1>

                    <div className="prose prose-invert max-w-none space-y-8 text-muted-foreground leading-relaxed">
                        <section>
                            <h2 className="text-2xl font-semibold text-foreground mb-4">1. Aksept av vilkår</h2>
                            <p>
                                Ved å laste ned og bruke Calvio, aksepterer du disse brukervilkårene. Calvio er en tjeneste levert
                                av Utvikleren.site AS. Dersom du ikke er enig i vilkårene, må du avstå fra å bruke applikasjonen.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-foreground mb-4">2. Bruk av tjenesten</h2>
                            <p>
                                Calvio er et verktøy for å logge måltider og overvåke kaloriinntak. Tjenesten skal kun brukes til
                                lovlige formål. Du er selv ansvarlig for informasjonen du legger inn i appen.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-foreground mb-4">3. Medisinsk ansvarsfraskrivelse</h2>
                            <p className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-lg text-yellow-200">
                                <strong>VIKTIG:</strong> Calvio er ikke en medisinsk tjeneste. Informasjonen i appen skal ikke
                                erstatte profesjonell medisinsk rådgivning eller veiledning fra ernæringsekspert. Rådfør deg alltid
                                med lege før du gjør store endringer i kostholdet ditt.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-foreground mb-4">4. Abonnement og betaling</h2>
                            <p>
                                Calvio tilbyr premium-funksjoner via abonnement. Betalinger håndteres sikkert gjennom Stripe.
                                Du kan når som helst si opp ditt abonnement via din brukerkonto.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-foreground mb-4">5. Ansvarsbegrensning</h2>
                            <p>
                                Utvikleren.site AS kan ikke holdes ansvarlig for feil i ernæringsdata generert av AI eller
                                tredjepartstjenester. Vi garanterer ikke at tjenesten vil være uavbrutt eller feilfri til enhver tid.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-foreground mb-4">6. Endringer i vilkår</h2>
                            <p>
                                Vi forbeholder oss retten til å endre disse vilkårene ved behov. Ved vesentlige endringer vil du
                                bli varslet i appen eller via e-post.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-foreground mb-4">7. Kontakt</h2>
                            <p>
                                Spørsmål angående brukervilkår kan rettes til: <br />
                                <a href="mailto:post@utvikleren.site" className="text-violet-500 hover:underline">post@utvikleren.site</a>
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
