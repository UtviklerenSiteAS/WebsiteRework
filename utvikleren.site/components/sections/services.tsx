"use client";

import { cn } from "@/lib/utils";
import { BorderBeam } from "@/components/ui/border-beam";
import { Meteors } from "@/components/ui/meteors";
import { Bot, Globe, Cpu, Database, ArrowRight, Layout } from "lucide-react";

const services = [
    {
        title: "Nettsider & Apper",
        description: "Moderne, lynraske og skreddersydde løsninger.",
        icon: Layout,
        gradient: "from-blue-500/20 to-cyan-500/20",
        border: "border-blue-500/20",
        span: "md:col-span-2 md:row-span-2",
        showBeam: true,
    },
    {
        title: "Moderne Webplattformer",
        description:
            "Lynraskt webapplikasjoner bygget med Next.js, React og Tailwind. Optimalisert for ytelse og brukeropplevelse.",
        icon: Globe,
        gradient: "from-blue-500/20 to-cyan-500/20",
        border: "border-blue-500/20",
        span: "md:col-span-1",
        showBeam: false,
    },
    {
        title: "System- & API-Integrasjon",
        description:
            "Kobler sammen dine systemer med moderne APIer. Vi bygger broene mellom dine data og applikasjoner.",
        icon: Database,
        gradient: "from-emerald-500/20 to-teal-500/20",
        border: "border-emerald-500/20",
        span: "md:col-span-1",
        showBeam: false,
    },
    {
        title: "Teknisk Rådgivning",
        description:
            "Strategisk veiledning for teknologivalg, arkitektur og AI-implementering. Vi hjelper deg med å ta de riktige beslutningene.",
        icon: Cpu,
        gradient: "from-amber-500/20 to-orange-500/20",
        border: "border-amber-500/20",
        span: "md:col-span-2",
        showMeteors: true,
    },
];

function ServiceCard({
    title,
    description,
    icon: Icon,
    gradient,
    border,
    span,
    showBeam,
    showMeteors,
}: (typeof services)[0] & { showMeteors?: boolean }) {
    return (
        <div
            className={cn(
                "group relative overflow-hidden rounded-2xl border bg-zinc-900/50 p-8 transition-all duration-500",
                "hover:bg-zinc-900/80 hover:border-white/10",
                border,
                span
            )}
        >
            {/* Gradient background blob */}
            <div
                className={cn(
                    "absolute -top-24 -right-24 h-56 w-56 rounded-full bg-gradient-to-br opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100",
                    gradient
                )}
            />

            {/* Beam on featured card */}
            {showBeam && (
                <BorderBeam
                    size={250}
                    duration={12}
                    colorFrom="#8b5cf6"
                    colorTo="#3b82f6"
                    delay={0}
                />
            )}

            {/* Meteors on consulting card */}
            {showMeteors && <Meteors number={12} />}

            {/* Content */}
            <div className="relative z-10">
                <div
                    className={cn(
                        "mb-6 inline-flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-br",
                        gradient
                    )}
                >
                    <Icon className="h-6 w-6 text-white" />
                </div>

                <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
                <p className="text-zinc-400 leading-relaxed mb-6">{description}</p>

                <a
                    href="/booking"
                    className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-white transition-colors group/link"
                >
                    Les mer
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-1" />
                </a>
            </div>
        </div>
    );
}

export default function Services() {
    return (
        <section id="tjenester" className="relative py-24 px-6">
            <div className="mx-auto max-w-6xl">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <p className="text-sm uppercase tracking-[0.2em] text-violet-400 mb-4">
                        Tjenester
                    </p>
                    <h2 className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-400">
                        Det vi gjør best
                    </h2>
                    <p className="mt-4 max-w-xl mx-auto text-zinc-400 text-lg">
                        Fra idé til produksjon — vi dekker hele den tekniske reisen din.
                    </p>
                </div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {services.map((service) => (
                        <ServiceCard key={service.title} {...service} />
                    ))}
                </div>
            </div>
        </section>
    );
}
