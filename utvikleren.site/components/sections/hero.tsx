"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import WordRotate from "@/components/ui/word-rotate";
import TypingAnimation from "@/components/ui/typing-animation";
import { ArrowRight, ChevronRight } from "lucide-react";
import { BorderBeam } from "@/components/ui/border-beam";

export default function Hero() {
    return (
        <section className="relative flex flex-col items-center justify-center min-h-[90vh] overflow-hidden px-6 pt-24">
            {/* ── Background grid pattern ── */}
            <div className="absolute inset-0 -z-10">
                {/* Dot grid */}
                <div
                    className="absolute inset-0 opacity-[0.03] dark:opacity-[0.04]"
                    style={{
                        backgroundImage: `radial-gradient(circle, currentColor 1px, transparent 1px)`,
                        backgroundSize: "24px 24px",
                    }}
                />
                {/* Gradient fade at edges */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,var(--color-background)_70%)]" />
            </div>

            {/* ── Gradient glows ── */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-blue-500/10 dark:bg-blue-500/15 blur-[120px] -z-10" />
            <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] rounded-full bg-cyan-500/10 dark:bg-cyan-500/10 blur-[100px] -z-10" />

            {/* ── Content ── */}
            <div className="relative z-10 flex flex-col items-center text-center max-w-4xl">

                {/* Main headline */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
                    Bygger fremtiden med{' '}
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-500 dark:from-blue-400 dark:via-sky-400 dark:to-cyan-400">
                        kunstig intelligens
                    </span>
                </h1>

                {/* Animated subheadline */}
                <div className="mt-6">
                    <WordRotate
                        words={[
                            "— sparer deg tid",
                            "— øker inntektene",
                            "— jobber for deg 24/7",
                            "— gjør kundene fornøyde",
                        ]}
                        duration={2500}
                        className="text-xl sm:text-2xl md:text-3xl font-medium bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-400"
                    />
                </div>

                {/* Subheadline */}
                <p className="mt-8 max-w-2xl text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
                    Vi bygger nettsider, apper og smarte AI-systemer som gjør
                    hverdagen enklere for din bedrift. Ingen tech-snakk, bare resultater.
                </p>

                {/* CTA Buttons */}
                <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
                    <a
                        href="/booking"
                        className="group h-12 px-8 flex items-center gap-2 text-sm font-semibold rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105 transition-all duration-300"
                    >
                        Book et gratis møte
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </a>

                    <a
                        href="#showcase"
                        className="h-12 px-8 flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground border border-border rounded-full hover:bg-accent transition-all duration-300"
                    >
                        Se hva vi lager
                        <ChevronRight className="h-4 w-4" />
                    </a>
                </div>
            </div>

            {/* ── Hero image / dashboard preview ── */}
            <div className="relative mt-16 w-full max-w-5xl">
                <div className="relative overflow-hidden rounded-xl border border-border bg-background shadow-2xl shadow-blue-500/10">
                    <BorderBeam size={300} duration={12} colorFrom="#3b82f6" colorTo="#06b6d4" />

                    {/* Fake browser chrome */}
                    <div className="flex items-center gap-2 border-b border-border px-4 py-3 bg-muted/30">
                        <div className="flex gap-1.5">
                            <div className="h-3 w-3 rounded-full bg-red-400/60 dark:bg-red-400/40" />
                            <div className="h-3 w-3 rounded-full bg-yellow-400/60 dark:bg-yellow-400/40" />
                            <div className="h-3 w-3 rounded-full bg-green-400/60 dark:bg-green-400/40" />
                        </div>
                        <div className="flex-1 flex justify-center">
                            <div className="flex items-center gap-2 rounded-lg bg-muted/50 px-4 py-1 text-xs text-muted-foreground min-w-[200px] justify-center">
                                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                                dashboard.dinbedrift.no
                            </div>
                        </div>
                    </div>

                    {/* Dashboard content */}
                    <div className="p-6 bg-background">
                        {/* Dashboard header */}
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className="text-sm font-semibold text-foreground">Kontrollpanel</h3>
                                <p className="text-xs text-muted-foreground">Oversikt over din AI-assistent</p>
                            </div>
                            <div className="flex gap-2">
                                <div className="h-8 w-8 rounded-full bg-muted animate-pulse" />
                                <div className="h-8 w-8 rounded-full bg-muted animate-pulse" />
                            </div>
                        </div>

                        {/* Charts / Data simulation */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Card 1 */}
                            <div className="p-4 rounded-lg border border-border bg-muted/20">
                                <div className="text-xs text-muted-foreground mb-1">Besparelser (i år)</div>
                                <div className="text-2xl font-bold text-foreground">124.500 kr</div>
                                <div className="mt-2 h-1.5 w-full bg-muted rounded-full overflow-hidden">
                                    <div className="h-full bg-blue-500 w-[70%]" />
                                </div>
                            </div>
                            {/* Card 2 */}
                            <div className="p-4 rounded-lg border border-border bg-muted/20">
                                <div className="text-xs text-muted-foreground mb-1">Tid spart (timer)</div>
                                <div className="text-2xl font-bold text-foreground">320 t</div>
                                <div className="mt-2 h-1.5 w-full bg-muted rounded-full overflow-hidden">
                                    <div className="h-full bg-cyan-500 w-[85%]" />
                                </div>
                            </div>
                            {/* Card 3 */}
                            <div className="p-4 rounded-lg border border-border bg-muted/20">
                                <div className="text-xs text-muted-foreground mb-1">Kundetilfredshet</div>
                                <div className="text-2xl font-bold text-foreground">98%</div>
                                <div className="mt-2 h-1.5 w-full bg-muted rounded-full overflow-hidden">
                                    <div className="h-full bg-emerald-500 w-[98%]" />
                                </div>
                            </div>
                        </div>

                        {/* Big Chart Area */}
                        <div className="mt-4 h-48 rounded-lg border border-border bg-muted/10 p-4 flex gap-2">
                            {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95].map((h, i) => (
                                <div key={i} className="flex-1 h-full flex items-end group relative">
                                    <div
                                        className="w-full rounded-t-sm bg-gradient-to-t from-blue-600/80 to-cyan-400/60 dark:from-blue-500/80 dark:to-cyan-400/40 transition-all duration-500"
                                        style={{ height: `${h}%` }}
                                    />
                                    <div className="absolute top-0 opacity-0 group-hover:opacity-100 transition-opacity bg-foreground text-background text-[10px] px-1 rounded -translate-y-full left-1/2 -translate-x-1/2 whitespace-nowrap">
                                        {h * 10} leads
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Recent Activity */}
                        <div className="mt-4 rounded-lg border border-border bg-muted/20 p-3">
                            <h4 className="text-xs font-semibold text-foreground mb-2">Nylig aktivitet</h4>
                            <div className="space-y-2">
                                {[
                                    { text: "Ny bestilling #1023", time: "2 min siden", amount: "+1 450 kr" },
                                    { text: "Kundemelding: Ola N.", time: "5 min siden", amount: "" },
                                    { text: "Serverstatus OK", time: "10 min siden", amount: "" },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center justify-between text-xs">
                                        <div>
                                            <span className="text-foreground font-medium">{item.text}</span>
                                            <span className="text-muted-foreground ml-2">{item.time}</span>
                                        </div>
                                        {item.amount && <span className="text-emerald-500 font-bold dark:text-emerald-400">{item.amount}</span>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </section>
    );
}
