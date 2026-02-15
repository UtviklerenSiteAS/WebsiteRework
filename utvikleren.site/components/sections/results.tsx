"use client";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

const results = [
    {
        metric: "80%",
        label: "Mindre tid på repetitive oppgaver",
        description: "Vi automatiserer det kjedelige slik at du kan fokusere på det som betyr noe.",
        gradient: "from-blue-500 to-cyan-600",
    },
    {
        metric: "24/7",
        label: "Alltid tilgjengelig for kundene",
        description: "Chatboter og smarte systemer som aldri tar ferie eller pauser.",
        gradient: "from-blue-500 to-cyan-500",
    },
    {
        metric: "3x",
        label: "Raskere svar til dine kunder",
        description: "AI svarer umiddelbart — ingen ventetid, ingen frustrerte kunder.",
        gradient: "from-emerald-500 to-teal-500",
    },
    {
        metric: "50%",
        label: "Lavere kostnader på kundestøtte",
        description: "Automatisk håndtering av vanlige henvendelser, uten ekstra ansatte.",
        gradient: "from-amber-500 to-orange-500",
    },
];

const includes = [
    "Gratis oppstartsmøte",
    "Skreddersydd for din bedrift",
    "Norsk support",
    "Kontinuerlig forbedring",
    "Full opplæring inkludert",
    "Ingen bindingstid",
];

export default function Results() {
    return (
        <section className="relative py-24 px-6">
            {/* Top separator */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

            <div className="mx-auto max-w-6xl">
                {/* Header */}
                <div className="text-center mb-16">
                    <p className="text-sm uppercase tracking-[0.2em] text-blue-500 dark:text-blue-400 mb-4">
                        Resultater
                    </p>
                    <h2 className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/50">
                        Hva du faktisk får
                    </h2>
                    <p className="mt-4 max-w-lg mx-auto text-muted-foreground text-lg">
                        Ikke bare fine ord — dette er de faktiske resultatene kundene våre opplever.
                    </p>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
                    {results.map((result) => (
                        <div
                            key={result.label}
                            className="group relative rounded-2xl border border-border bg-muted/30 dark:bg-muted/20 p-6 text-center hover:border-border/80 dark:hover:border-border transition-all duration-500 overflow-hidden"
                        >
                            {/* Hover glow */}
                            <div
                                className={cn(
                                    "absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 bg-gradient-to-br",
                                    result.gradient
                                )}
                            />

                            <p
                                className={cn(
                                    "relative z-10 text-5xl sm:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-br",
                                    result.gradient
                                )}
                            >
                                {result.metric}
                            </p>
                            <p className="relative z-10 text-sm font-semibold text-foreground mt-4 mb-2">
                                {result.label}
                            </p>
                            <p className="relative z-10 text-xs text-muted-foreground leading-relaxed">
                                {result.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* What's included */}
                <div className="rounded-2xl border border-border bg-muted/20 dark:bg-muted/10 p-8 sm:p-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                        <div>
                            <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
                                Alt er inkludert
                            </h3>
                            <p className="text-muted-foreground leading-relaxed">
                                Vi tror på åpenhet og enkelhet. Ingen skjulte kostnader,
                                ingen overraskelser — bare resultater.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {includes.map((item) => (
                                <div
                                    key={item}
                                    className="flex items-center gap-3 rounded-xl bg-background/50 dark:bg-background/30 px-4 py-3 border border-border"
                                >
                                    <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-500/10 flex items-center justify-center">
                                        <Check className="h-3 w-3 text-green-600 dark:text-green-400" />
                                    </div>
                                    <span className="text-sm text-foreground/80">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
