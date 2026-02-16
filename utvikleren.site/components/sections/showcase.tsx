"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { BorderBeam } from "@/components/ui/border-beam";
import { Safari } from "@/components/ui/device-mockups";
import { AnimatedList } from "@/components/ui/animated-list";
import {
    Terminal,
    AnimatedSpan,
    TerminalTypingAnimation,
} from "@/components/ui/terminal";
import {
    Send,
    Bot,
    Sparkles,
    ShoppingCart,
    Users,
    TrendingUp,
    Clock,
    ArrowRight,
    Phone,
    PhoneIncoming,
    PhoneOff,
    CalendarPlus,
    FileText,
    Mic,
    CheckCircle2,
    Mail,
    MailOpen,
    Reply,
    Star,
    Globe,
    Search,
    Heart,
} from "lucide-react";

import ReceptionistDemo from "@/components/showcase/receptionist-demo";
import ChatbotDemo from "@/components/showcase/chatbot-demo";
import EmailDemo from "@/components/showcase/email-demo";

import { AnimatedTabs } from "@/components/ui/animated-tabs";

/* ═══════════════════════════════════════════════
   DEMO 3: Live Notification Feed (AnimatedList)
   ═══════════════════════════════════════════════ */
interface NotificationItem {
    name: string;
    description: string;
    icon: string;
    color: string;
    time: string;
}

const baseNotifications: NotificationItem[] = [
    { name: "Ny bestilling", description: "Bluetooth-høyttaler x2", time: "Akkurat nå", icon: "🛒", color: "#8b5cf6" },
    { name: "Betaling mottatt", description: "1 598 kr fra Ola N.", time: "2 min siden", icon: "💳", color: "#10b981" },
    { name: "Kunde registrert", description: "kari@gmail.com", time: "5 min siden", icon: "👤", color: "#f59e0b" },
    { name: "E-post sendt", description: "Ordrebekreftelse", time: "5 min siden", icon: "✉️", color: "#3b82f6" },
    { name: "5-stjernes anmeldelse", description: "«Fantastisk service!»", time: "12 min", icon: "⭐", color: "#eab308" },
    { name: "Lager oppdatert", description: "42 enheter igjen", time: "20 min", icon: "📦", color: "#06b6d4" },
];
const notifications = Array.from({ length: 5 }, () => baseNotifications).flat();

function Notification({ name, description, icon, color, time }: NotificationItem) {
    return (
        <figure className="relative mx-auto min-h-fit w-full max-w-[400px] cursor-pointer overflow-hidden rounded-2xl p-4 transition-all duration-200 ease-in-out hover:scale-[103%] transform-gpu bg-transparent backdrop-blur-md border border-border shadow-lg">
            <div className="flex flex-row items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl" style={{ backgroundColor: color }}>
                    <span className="text-lg">{icon}</span>
                </div>
                <div className="flex flex-col overflow-hidden">
                    <figcaption className="flex flex-row items-center text-sm font-medium text-foreground whitespace-pre">
                        <span>{name}</span>
                        <span className="mx-1 text-muted-foreground/50">·</span>
                        <span className="text-xs text-muted-foreground">{time}</span>
                    </figcaption>
                    <p className="text-xs text-muted-foreground">{description}</p>
                </div>
            </div>
        </figure>
    );
}

function NotificationDemo() {
    return (
        <Safari url="dashboard.dinbedrift.no">
            <div className="relative flex h-[530px] w-full flex-col overflow-hidden p-4">
                <div className="flex items-center justify-between mb-4 px-1">
                    <div>
                        <p className="text-sm font-medium text-foreground">Aktivitetsfeed</p>
                        <p className="text-xs text-muted-foreground">Sanntids-hendelser</p>
                    </div>
                    <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20">
                        <span className="h-1.5 w-1.5 rounded-full bg-green-600 dark:bg-green-400 animate-pulse" />
                        <span className="text-xs text-green-600 dark:text-green-400">Live</span>
                    </div>
                </div>
                <AnimatedList delay={2000}>
                    {notifications.map((item, idx) => (
                        <Notification {...item} key={idx} />
                    ))}
                </AnimatedList>
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background to-transparent" />
            </div>
        </Safari>
    );
}

/* ═══════════════════════════════════════════════
   DEMO 4: Dashboard with Stats
   ═══════════════════════════════════════════════ */
function DashboardDemo() {
    const stats = [
        { label: "Kunder", value: "2,847", change: "+12%", icon: Users, color: "text-blue-400" },
        { label: "Omsetning", value: "1.2M", change: "+23%", icon: TrendingUp, color: "text-green-400" },
        { label: "Bestillinger", value: "384", change: "+8%", icon: ShoppingCart, color: "text-violet-400" },
        { label: "Responstid", value: "1.2s", change: "-40%", icon: Clock, color: "text-cyan-400" },
    ];

    return (
        <Safari url="dashboard.dinbedrift.no">
            <div className="flex flex-col h-[530px]">
                <div className="flex items-center justify-between px-5 py-3 border-b border-border">
                    <div>
                        <p className="text-sm font-medium text-foreground">Kontrollpanel</p>
                        <p className="text-xs text-muted-foreground">Siste 30 dager</p>
                    </div>
                    <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20">
                        <span className="h-1.5 w-1.5 rounded-full bg-green-600 dark:bg-green-400" />
                        <span className="text-xs text-green-600 dark:text-green-400">Live</span>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3 p-4">
                    {stats.map((stat) => (
                        <div key={stat.label} className="rounded-xl bg-muted/30 dark:bg-white/[0.03] border border-border p-4">
                            <div className="flex items-center justify-between mb-2">
                                <stat.icon className={cn("h-4 w-4", stat.color)} />
                                <span className={cn("text-xs font-medium", stat.change.startsWith("+") ? "text-green-600 dark:text-green-400" : "text-cyan-600 dark:text-cyan-400")}>{stat.change}</span>
                            </div>
                            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                            <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                        </div>
                    ))}
                </div>
                <div className="px-4 pb-4 mt-auto">
                    <div className="rounded-xl bg-muted/30 dark:bg-white/[0.03] border border-border p-4">
                        <p className="text-xs text-muted-foreground mb-3">Ukentlig vekst</p>
                        <div className="flex items-end gap-1.5 h-20">
                            {[35, 50, 40, 58, 65, 60, 75, 70, 85, 80, 92, 100].map((h, i) => (
                                <div key={i} className="flex-1 rounded-sm bg-gradient-to-t from-violet-600/80 to-blue-500/60 hover:from-violet-500 hover:to-blue-400 transition-all duration-500" style={{ height: `${h}%` }} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Safari>
    );
}



/* ═══════════════════════════════════════════════
   DEMO 6: Live Website Builder Simulation
   ═══════════════════════════════════════════════ */

/* Animation keyframes for the cursor and actions.
   Positions are % of the 420px content area.
   Layout: nav ~0-10% | hero center ~35-65% | stats ~88-100% */
const builderSteps = [
    // step 0: cursor at logo square (px-6 = ~24px from left, centered in nav row at ~5%)
    { cursorX: 8, cursorY: 5, target: "logo", click: true },
    // step 1: cursor at headline text (centered horizontally, ~40% down)
    { cursorX: 50, cursorY: 40, target: "headline", click: true },
    // step 2: cursor at primary CTA button (left of center pair, ~62% down)
    { cursorX: 44, cursorY: 64, target: "cta", click: true },
    // step 3: cursor at secondary button (right of center pair)
    { cursorX: 58, cursorY: 64, target: "secondary", click: true },
    // step 4: cursor at middle stat in bottom bar (~93% down)
    { cursorX: 50, cursorY: 93, target: "stats", click: true },
    // step 5: cursor at subtitle text (between headline and CTA, ~54% down)
    { cursorX: 50, cursorY: 54, target: "subtitle", click: true },
];

const logoGradients = [
    "from-violet-500 to-blue-500",
    "from-rose-500 to-orange-500",
    "from-emerald-500 to-cyan-500",
    "from-amber-500 to-red-500",
];

const headlines = [
    "Vi gjør drømmer\ntil virkelighet",
    "Bygg fremtiden\nmed oss",
    "Digital vekst\nstarter her",
    "Neste nivå for\ndin bedrift",
];

const subtitles = [
    "Norges ledende byrå for digital innovasjon.",
    "Skreddersydde løsninger for din bransje.",
    "Fra idé til lansering — vi tar deg dit.",
    "Teknologi som gir deg et forsprang.",
];

const ctaTexts = ["Kom i gang", "Start nå", "Book møte", "Prøv gratis"];
const ctaStyles = [
    "from-violet-600 to-blue-600",
    "from-rose-600 to-pink-600",
    "from-emerald-600 to-teal-600",
    "from-amber-600 to-orange-600",
];

function WebsiteDemo() {
    const [step, setStep] = useState(0);
    const [clicking, setClicking] = useState(false);

    // Track accumulated state for each element
    const [logoIdx, setLogoIdx] = useState(0);
    const [headlineIdx, setHeadlineIdx] = useState(0);
    const [subtitleIdx, setSubtitleIdx] = useState(0);
    const [ctaIdx, setCtaIdx] = useState(0);
    const [secBtnRounded, setSecBtnRounded] = useState(false);
    const [statsAccent, setStatsAccent] = useState(0);

    useEffect(() => {
        const totalSteps = builderSteps.length;
        const interval = setInterval(() => {
            // Click animation
            setClicking(true);
            setTimeout(() => {
                setClicking(false);
                // Apply the change based on current step
                const current = builderSteps[step % totalSteps];
                switch (current.target) {
                    case "logo":
                        setLogoIdx((i) => (i + 1) % logoGradients.length);
                        break;
                    case "headline":
                        setHeadlineIdx((i) => (i + 1) % headlines.length);
                        break;
                    case "cta":
                        setCtaIdx((i) => (i + 1) % ctaTexts.length);
                        break;
                    case "secondary":
                        setSecBtnRounded((r) => !r);
                        break;
                    case "stats":
                        setStatsAccent((i) => (i + 1) % logoGradients.length);
                        break;
                    case "subtitle":
                        setSubtitleIdx((i) => (i + 1) % subtitles.length);
                        break;
                }
                // Move to next step
                setStep((s) => (s + 1) % totalSteps);
            }, 400);
        }, 2200);

        return () => clearInterval(interval);
    }, [step]);

    const currentStep = builderSteps[step % builderSteps.length];

    return (
        <Safari url="builder.utvikleren.site">
            <div className="relative flex flex-col h-[530px] bg-zinc-950 select-none overflow-hidden">
                {/* ── Animated Cursor ── */}
                <div
                    className="absolute z-50 pointer-events-none transition-all duration-700 ease-in-out"
                    style={{
                        left: `${currentStep.cursorX}%`,
                        top: `${currentStep.cursorY}%`,
                    }}
                >
                    {/* Cursor SVG — tip is at top-left (0,0) of this element */}
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="drop-shadow-lg">
                        <path
                            d="M3 2l16 9.5L11 14l-2.5 8L3 2z"
                            fill="white"
                            stroke="black"
                            strokeWidth="1.5"
                        />
                    </svg>
                    {/* Click Ripple — positioned at cursor tip (0,0) */}
                    {clicking && (
                        <div className="absolute -top-2 -left-2">
                            <div className="h-5 w-5 rounded-full bg-violet-400/50 animate-ping" />
                            <div className="absolute inset-0 h-5 w-5 rounded-full bg-violet-400/25" />
                        </div>
                    )}
                </div>

                {/* ── Mini Nav ── */}
                <div className="flex items-center justify-between px-6 py-3 border-b border-white/5">
                    <div className="flex items-center gap-2">
                        <div
                            className={cn(
                                "h-6 w-6 rounded-md bg-gradient-to-br transition-all duration-700",
                                logoGradients[logoIdx]
                            )}
                        />
                        <span className="text-sm font-semibold text-white">DinBedrift</span>
                    </div>
                    <div className="hidden sm:flex items-center gap-4 text-xs text-zinc-500">
                        <span>Hjem</span>
                        <span>Tjenester</span>
                        <span>Om oss</span>
                        <span
                            className={cn(
                                "px-3 py-1 text-white cursor-pointer text-[11px] bg-gradient-to-r transition-all duration-700",
                                ctaStyles[ctaIdx],
                                secBtnRounded ? "rounded-md" : "rounded-full"
                            )}
                        >
                            Kontakt
                        </span>
                    </div>
                </div>

                {/* ── Hero Area ── */}
                <div className="flex-1 flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">
                    {/* Glow that changes color */}
                    <div
                        className={cn(
                            "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full blur-[60px] transition-colors duration-1000",
                            ctaIdx === 0 ? "bg-violet-600/20" :
                                ctaIdx === 1 ? "bg-rose-600/20" :
                                    ctaIdx === 2 ? "bg-emerald-600/20" :
                                        "bg-amber-600/20"
                        )}
                    />

                    <div className="relative z-10">
                        {/* Subtitle label */}
                        <p
                            className={cn(
                                "text-xs uppercase tracking-[0.2em] mb-3 transition-colors duration-700",
                                ctaIdx === 0 ? "text-violet-400" :
                                    ctaIdx === 1 ? "text-rose-400" :
                                        ctaIdx === 2 ? "text-emerald-400" :
                                            "text-amber-400"
                            )}
                        >
                            Velkommen
                        </p>

                        {/* Headline */}
                        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-snug transition-all duration-500 whitespace-pre-line">
                            {headlines[headlineIdx]}
                        </h2>

                        {/* Description */}
                        <p className="text-xs text-zinc-500 max-w-[250px] mx-auto mb-5 leading-relaxed transition-all duration-500">
                            {subtitles[subtitleIdx]}
                        </p>

                        {/* Buttons */}
                        <div className="flex items-center justify-center gap-2">
                            <button
                                className={cn(
                                    "px-4 py-1.5 text-white text-xs font-medium bg-gradient-to-r transition-all duration-700",
                                    ctaStyles[ctaIdx],
                                    secBtnRounded ? "rounded-md" : "rounded-full"
                                )}
                            >
                                {ctaTexts[ctaIdx]}
                            </button>
                            <button
                                className={cn(
                                    "px-4 py-1.5 border border-white/10 text-xs text-zinc-400 transition-all duration-700",
                                    secBtnRounded ? "rounded-md" : "rounded-full"
                                )}
                            >
                                Les mer
                            </button>
                        </div>
                    </div>
                </div>

                {/* ── Stats Bar ── */}
                <div className="grid grid-cols-3 gap-px bg-white/5">
                    {[
                        { label: "Prosjekter", value: "120+" },
                        { label: "Kunder", value: "85+" },
                        { label: "Fornøydhet", value: "99%" },
                    ].map((s, i) => (
                        <div key={s.label} className="text-center py-3 bg-zinc-950">
                            <p
                                className={cn(
                                    "text-lg font-bold transition-colors duration-700",
                                    i === statsAccent
                                        ? (ctaIdx === 0 ? "text-violet-400" :
                                            ctaIdx === 1 ? "text-rose-400" :
                                                ctaIdx === 2 ? "text-emerald-400" :
                                                    "text-amber-400")
                                        : "text-white"
                                )}
                            >
                                {s.value}
                            </p>
                            <p className="text-[10px] text-zinc-600">{s.label}</p>
                        </div>
                    ))}
                </div>

                {/* ── Builder Toolbar (bottom overlay) ── */}
                <div className="absolute bottom-14 left-1/2 -translate-x-1/2 z-40 flex items-center gap-1 px-2 py-1 rounded-lg bg-zinc-800/90 border border-white/10 backdrop-blur-sm shadow-lg">
                    <div className="w-3 h-3 rounded-sm bg-violet-500" />
                    <div className="w-3 h-3 rounded-sm bg-rose-500" />
                    <div className="w-3 h-3 rounded-sm bg-emerald-500" />
                    <div className="w-3 h-3 rounded-sm bg-amber-500" />
                    <div className="w-px h-4 bg-white/10 mx-1" />
                    <span className="text-[9px] text-zinc-500 font-mono">Auto</span>
                </div>
            </div>
        </Safari>
    );
}

/* ═══════════════════════════════════════════════
   MAIN SHOWCASE SECTION
   ═══════════════════════════════════════════════ */
const showcaseItems = [
    {
        id: "receptionist",
        label: "AI Resepsjonist",
        tagline: "Din telefon — alltid besvart",
        description:
            "AI-en tar imot samtaler, forstår hva kunden trenger, booker timer i kalenderen og gir deg en komplett oppsummering — alt automatisk.",
        chips: ["📞 Svarer alltid", "📅 Booker timer", "📝 Oppsummerer"],
        component: ReceptionistDemo,
    },
    {
        id: "chatbot",
        label: "AI Chatbot",
        tagline: "Kundeservice som aldri sover",
        description:
            "Kundene dine får svar med en gang — døgnet rundt. Vi lager smarte chatboter som forstår spørsmål og gir riktige svar automatisk.",
        chips: ["🕐 Tilgjengelig 24/7", "💬 Snakker norsk", "📈 Øker salget"],
        component: ChatbotDemo,
    },
    {
        id: "email",
        label: "AI E-post",
        tagline: "Innboksen styrer seg selv",
        description:
            "AI-en leser e-postene dine, svarer på rutinespørsmål, sorterer og flagger det viktige. Du fokuserer bare på det som betyr noe.",
        chips: ["✉️ Auto-svar", "📂 Smart sortering", "⭐ Flagging"],
        component: EmailDemo,
    },
    {
        id: "notifications",
        label: "Live Oversikt",
        tagline: "Alt som skjer — i sanntid",
        description:
            "Nye kunder, bestillinger, betalinger. Alt dukker opp automatisk — du har full kontroll uten å løfte en finger.",
        chips: ["📊 Sanntidsdata", "🔔 Smarte varsler", "📱 Mobilvennlig"],
        component: NotificationDemo,
    },
    {
        id: "dashboard",
        label: "Kontrollpanel",
        tagline: "Alle tall på ett sted",
        description:
            "Alle tall du trenger, samlet i et vakkert dashboard. Salg, kunder, bestillinger — enkelt å forstå, alltid oppdatert.",
        chips: ["📊 Visuelt", "🔒 Sikkert", "🚀 Raskt"],
        component: DashboardDemo,
    },
    {
        id: "website",
        label: "Nettsider",
        tagline: "Nettsider som imponerer",
        description:
            "Vi lager moderne, raske nettsider som ser profesjonelle ut og fungerer perfekt på alle enheter. Ditt digitale visittkort.",
        chips: ["📱 Responsiv", "⚡ Lynrask", "🎨 Vakkert design"],
        component: WebsiteDemo,
    },
];

export default function Showcase() {
    const [activeTab, setActiveTab] = useState("receptionist");
    const activeItem = showcaseItems.find((item) => item.id === activeTab)!;
    const ActiveComponent = activeItem.component;

    return (
        <section id="showcase" className="relative py-24 px-6">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

            <div className="mx-auto max-w-6xl">
                {/* Header */}
                <div className="text-center mb-16">
                    <p className="text-sm uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400 mb-4">Se det selv</p>
                    <h2 className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/50">
                        Ting vi bygger for deg
                    </h2>
                    <p className="mt-4 max-w-lg mx-auto text-muted-foreground text-lg">
                        Ikke bare ord — trykk deg gjennom og se ekte eksempler på hva vi lager.
                    </p>
                </div>

                {/* Tab Switcher */}
                <div className="flex justify-center mb-12">
                    <div className="w-full max-w-full overflow-x-auto pb-4 sm:pb-0 scrollbar-hide -mx-6 px-6 sm:mx-0 sm:px-0 text-center">
                        <div className="inline-flex mx-auto p-1.5 rounded-full bg-muted/30 dark:bg-muted/20 border border-border">
                            {showcaseItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveTab(item.id)}
                                    className={cn(
                                        "relative px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 whitespace-nowrap z-10",
                                        activeTab === item.id
                                            ? "text-foreground"
                                            : "text-muted-foreground hover:text-foreground"
                                    )}
                                >
                                    {activeTab === item.id && (
                                        <div
                                            className="absolute inset-0 bg-background shadow-md rounded-full border border-border/50 -z-10 animate-in fade-in"
                                        />
                                    )}
                                    {item.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    {/* Demo */}
                    <div className="relative flex items-center justify-center min-h-[530px]">
                        {activeTab !== "receptionist" && (
                            <BorderBeam size={300} duration={10} colorFrom="#3b82f6" colorTo="#06b6d4" />
                        )}
                        <ActiveComponent />
                    </div>

                    {/* Description */}
                    <div className="lg:pl-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs text-blue-600 dark:text-blue-400 font-medium mb-6">
                            <Sparkles className="h-3 w-3" />
                            {activeItem.label}
                        </div>

                        <h3 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                            {activeItem.tagline}
                        </h3>

                        <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                            {activeItem.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-8">
                            {activeItem.chips.map((chip) => (
                                <span key={chip} className="px-3 py-1.5 rounded-full bg-muted/50 dark:bg-white/5 border border-border text-sm text-foreground/80">
                                    {chip}
                                </span>
                            ))}
                        </div>

                        <a
                            href="/booking"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-medium hover:opacity-90 transition-all duration-300 hover:scale-105"
                        >
                            Jeg vil ha dette
                            <ArrowRight className="h-4 w-4" />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
