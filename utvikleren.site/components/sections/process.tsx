"use client";

import { cn } from "@/lib/utils";
import { Coffee, PenTool, Wrench, PartyPopper, Search } from "lucide-react";

const steps = [
    {
        number: "01",
        title: "Strategi & Analyse",
        description: "Vi starter med å forstå din bedrift. Hva er målene? Hvor er flaskehalsene? Vi legger en slagplan.",
        icon: Search,
        color: "text-blue-600 dark:text-blue-400",
        bg: "bg-blue-500/10",
        border: "border-blue-500/20",
    },
    {
        number: "2",
        title: "Vi lager en plan",
        description:
            "Du får en klar plan med hva vi bygger, tidsramme og pris. Ingen overraskelser.",
        icon: PenTool,
        color: "text-blue-600 dark:text-blue-400",
        bg: "bg-blue-500/10",
        border: "border-blue-500/20",
    },
    {
        number: "3",
        title: "Vi bygger løsningen",
        description:
            "Vi holder deg oppdatert underveis. Du ser fremgangen og kan gi tilbakemeldinger.",
        icon: Wrench,
        color: "text-cyan-600 dark:text-cyan-400",
        bg: "bg-cyan-500/10",
        border: "border-cyan-500/20",
    },
    {
        number: "4",
        title: "Du er live!",
        description:
            "Alt er klart og satt i drift. Vi sørger for at alt fungerer og gir deg full opplæring.",
        icon: PartyPopper,
        color: "text-emerald-600 dark:text-emerald-400",
        bg: "bg-emerald-500/10",
        border: "border-emerald-500/20",
    },
];

export default function Process() {
    return (
        <section id="prosess" className="relative py-24 px-6">
            {/* Top separator */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

            <div className="mx-auto max-w-6xl">
                {/* Header */}
                <div className="text-center mb-16">
                    <p className="text-sm uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400 mb-4">
                        Prosess
                    </p>
                    <h2 className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/50">
                        Enkelt i 4 steg
                    </h2>
                    <p className="mt-4 max-w-lg mx-auto text-muted-foreground text-lg">
                        Fra første samtale til ferdig løsning — vi gjør det enkelt for deg.
                    </p>
                </div>

                {/* Steps */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {steps.map((step, i) => (
                        <div
                            key={step.number}
                            className={cn(
                                "group relative rounded-2xl border bg-muted/20 dark:bg-muted/10 p-8 transition-all duration-500 hover:bg-muted/40 dark:hover:bg-muted/20 hover:shadow-lg",
                                step.border
                            )}
                        >
                            {/* Step Number */}
                            <div
                                className={cn(
                                    "h-12 w-12 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110",
                                    step.bg
                                )}
                            >
                                <step.icon className={cn("h-6 w-6", step.color)} />
                            </div>

                            {/* Content */}
                            <h3 className="text-lg font-bold text-foreground mb-2">
                                <span className={cn("mr-2", step.color)}>{step.number}.</span>
                                {step.title}
                            </h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                {step.description}
                            </p>

                            {/* Arrow connector */}
                            {i < steps.length - 1 && (
                                <div className="hidden lg:flex absolute top-1/2 -right-4 z-10 h-8 w-8 items-center justify-center rounded-full bg-background border border-border text-muted-foreground text-sm">
                                    →
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
