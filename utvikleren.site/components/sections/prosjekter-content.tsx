"use client";

import { ExternalLink, Globe, Palette, Sparkles } from "lucide-react";
import { Safari } from "@/registry/magicui/safari";
import { Iphone } from "@/registry/magicui/iphone";
import { Highlighter } from "@/registry/magicui/highlighter";

const projects = [
    {
        id: 1,
        client: "Provence Reiser",
        url: "provencereiser.com",
        fullUrl: "https://www.provencereiser.com/",
        description:
            "Onepager nettside og logo for en reiseoperatør som spesialiserer seg på turer til Sør-Frankrike. Vi leverte en komplett digital tilstedeværelse fra bunnen av.",
        deliverables: [
            { icon: Palette, label: "Logo-design", detail: "Profesjonell logo tilpasset merkevaren" },
            { icon: Globe, label: "Onepager nettside", detail: "Responsiv, rask og konverteringsfokusert" },
        ],
        price: "3 990 kr",
        priceNote: "eks. mva.",
        category: "Nettside + Logo",
        tags: ["Next.js", "Logo", "Onepager"],
    },
    {
        id: 2,
        client: "AI Awards 2026",
        url: "aiawards.no",
        fullUrl: "https://aiawards.no/",
        description:
            "Prisplattform for AI-prosjekter med fokus på bærekraft og originalitet — levert på to uker. En komplett flersidig applikasjon med lag- og prosjektstyring, FAQ og moderne mørk design med gradientestetikk.",
        deliverables: [
            { icon: Globe, label: "Flersidig nettapplikasjon", detail: "Lag, prosjekter og FAQ — Next.js App Router" },
            { icon: Sparkles, label: "AI-prisplattform", detail: "Komplett løsning fra idé til lansering på 2 uker" },
        ],
        price: "På forespørsel",
        priceNote: "",
        category: "Webapplikasjon",
        tags: ["Next.js", "Tailwind CSS", "SSR"],
    },
];

export default function ProsjekterContent() {
    return (
        <main className="relative min-h-screen overflow-hidden pt-32 pb-24 px-6">
            {/* Background */}
            <div className="absolute inset-0 -z-10">
                <div
                    className="absolute inset-0 opacity-[0.03] dark:opacity-[0.04]"
                    style={{
                        backgroundImage: `radial-gradient(circle, currentColor 1px, transparent 1px)`,
                        backgroundSize: "24px 24px",
                    }}
                />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,var(--color-background)_70%)]" />
            </div>
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-blue-500/8 dark:bg-blue-500/12 blur-[120px] -z-10" />

            <div className="mx-auto max-w-6xl">
                {/* Header */}
                <div className="text-center mb-20">
                    <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/40 px-4 py-1.5 text-xs text-muted-foreground mb-6">
                        <Sparkles className="h-3 w-3 text-blue-500" />
                        Levert med stolthet
                    </div>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
                        Prosjektene vi{" "}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-500 dark:from-blue-400 dark:via-sky-400 dark:to-cyan-400">
                            har levert
                        </span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground leading-relaxed">
                        Her er et utvalg av{" "}
                        <Highlighter action="underline" color="#3b82f6">
                            reelle prosjekter
                        </Highlighter>{" "}
                        vi har bygget for kunder — fra logo til ferdig nettside,{" "}
                        <Highlighter action="highlight" color="rgba(59,130,246,0.15)">
                            levert raskt og til fast pris.
                        </Highlighter>
                    </p>
                </div>

                {/* Projects */}
                <div className="space-y-32">
                    {projects.map((project) => (
                        <article key={project.id} className="space-y-8">

                            {/* Info row */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
                                {/* Left: title + description */}
                                <div className="flex flex-col gap-5">
                                    <div className="flex items-center gap-3 flex-wrap">
                                        <span className="inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-600 dark:text-blue-400">
                                            {project.category}
                                        </span>
                                        {project.tags.map((tag) => (
                                            <span key={tag} className="inline-flex items-center rounded-full border border-border bg-muted/40 px-2.5 py-0.5 text-xs text-muted-foreground">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <div>
                                        <h2 className="text-3xl font-bold text-foreground mb-1">{project.client}</h2>
                                        <a href={project.fullUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-blue-500 transition-colors">
                                            {project.url}
                                            <ExternalLink className="h-3 w-3" />
                                        </a>
                                    </div>
                                    <p className="text-muted-foreground leading-relaxed">{project.description}</p>
                                </div>

                                {/* Right: deliverables + price */}
                                <div className="flex flex-col gap-5">
                                    <div className="space-y-3">
                                        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Leveranser</h3>
                                        {project.deliverables.map(({ icon: Icon, label, detail }) => (
                                            <div key={label} className="flex items-start gap-3 rounded-lg border border-border bg-muted/20 p-3">
                                                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-blue-500/10">
                                                    <Icon className="h-3.5 w-3.5 text-blue-500" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-foreground">{label}</p>
                                                    <p className="text-xs text-muted-foreground">{detail}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex items-baseline gap-2 rounded-xl border border-border bg-muted/20 px-5 py-4 w-fit">
                                        <span className="text-3xl font-bold text-foreground">{project.price}</span>
                                        <span className="text-sm text-muted-foreground">{project.priceNote}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Device mockups row — iPhone (mobile) + Safari (desktop) */}
                            <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-6 items-end">

                                {/* Mobile preview */}
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                        <span className="h-1.5 w-1.5 rounded-full bg-blue-500 shrink-0" />
                                        Mobilvisning
                                    </div>
                                    <div className="mx-auto lg:mx-0 w-[160px] drop-shadow-2xl">
                                        <Iphone iframeSrc={project.fullUrl} />
                                    </div>
                                </div>

                                {/* Desktop preview */}
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                        <span className="h-1.5 w-1.5 rounded-full bg-cyan-500 shrink-0" />
                                        Desktopvisning
                                    </div>
                                    <Safari
                                        url={project.url}
                                        iframeSrc={project.fullUrl}
                                        className="rounded-xl border border-border shadow-2xl shadow-blue-500/10"
                                    />
                                </div>
                            </div>

                        </article>
                    ))}
                </div>

                {/* CTA banner */}
                <div className="mt-28 relative overflow-hidden rounded-3xl border border-border bg-muted/30 p-12 text-center">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
                        Vil du bli{" "}
                        <Highlighter action="underline" color="#06b6d4">
                            neste prosjekt?
                        </Highlighter>
                    </h2>
                    <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                        Book et gratis møte og fortell oss hva du trenger — vi gir deg et fast pristilbud.
                    </p>
                    <a
                        href="/booking"
                        className="inline-flex items-center gap-2 h-12 px-8 text-sm font-semibold rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105 transition-all duration-300"
                    >
                        Book et gratis møte
                    </a>
                </div>
            </div>
        </main>
    );
}
