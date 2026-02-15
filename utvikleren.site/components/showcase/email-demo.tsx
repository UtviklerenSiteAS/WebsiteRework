"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Safari } from "@/components/ui/device-mockups";
import {
    Mail,
    Search,
    Brain,
    Database,
    PenTool,
    Send,
    Loader2,
    Check,
    Sparkles,
    User
} from "lucide-react";

type AgentState =
    | "idle"
    | "reading_email"
    | "analyzing_sentiment"
    | "querying_crm"
    | "crm_results"
    | "drafting"
    | "sending"
    | "sent";

const emailContent = {
    from: "Henrik Ibsen",
    subject: "Forespørsel om integrasjon",
    body: "Hei, vi vurderer å bytte til systemet deres. Har dere støtte for Visma eAccounting? Hva koster enterprise-lisensen? Mvh Henrik.",
};

export default function EmailDemo() {
    const [state, setState] = useState<AgentState>("idle");

    const [draft, setDraft] = useState("");

    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let mounted = true;

        const sequence = async () => {
            const delay = (ms: number) => new Promise(r => setTimeout(r, ms));
            const typeText = async (text: string) => {
                for (let i = 0; i <= text.length; i++) {
                    if (!mounted) break;
                    setDraft(text.slice(0, i));
                    // Varierende skrivehastighet for realisme
                    await delay(20 + Math.random() * 30);
                }
            };

            while (mounted) {
                setState("idle");
                setDraft("");
                await delay(1000);
                if (!mounted) break;

                setState("reading_email");
                await delay(2000);
                if (!mounted) break;

                setState("analyzing_sentiment");
                await delay(2000);
                if (!mounted) break;

                setState("querying_crm");
                await delay(2000);
                if (!mounted) break;

                setState("crm_results");
                await delay(1500);
                if (!mounted) break;

                setState("drafting");
                // Start typing the real response
                await typeText("Hei Henrik,\n\nTakk for din henvendelse!\n\nJa, vi har full toveis integrasjon mot Visma eAccounting. Dette er inkludert i alle våre pakker.\n\nEnterprise-lisensen koster 1490,- /mnd og inkluderer ubegrenset antall brukere samt dedikert support.\n\nMvh,\nAI Agent");
                await delay(1000); // Pause before sending
                if (!mounted) break;

                setState("sending");
                await delay(1000);
                if (!mounted) break;

                setState("sent");
                await delay(4000);
            }
        };

        sequence();

        return () => { mounted = false; };
    }, []);

    // Auto-scroll effect
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [draft, state]);

    const getStatusText = () => {
        switch (state) {
            case "reading_email": return "Leser ny e-post...";
            case "analyzing_sentiment": return "Analyserer innhold & tone...";
            case "querying_crm": return "Søker i CRM etter 'Henrik Ibsen'...";
            case "crm_results": return "Ingen treff. Slår opp i Knowledge Base...";
            case "drafting": return "Genererer svarutkast...";
            case "sending": return "Sender svar...";
            case "sent": return "E-post markert som 'Håndtert'";
            default: return "AI Agent aktiv";
        }
    };

    const getStatusIcon = () => {
        switch (state) {
            case "reading_email": return Mail;
            case "analyzing_sentiment": return Brain;
            case "querying_crm": return Database;
            case "crm_results": return Search;
            case "drafting": return PenTool;
            case "sending": return Send;
            case "sent": return Check;
            default: return Sparkles;
        }
    };

    const StatusIcon = getStatusIcon();

    return (
        <Safari url="mail.dinbedrift.no" className="h-full">
            <div className="relative h-[450px] w-full bg-background flex flex-col font-sans">

                {/* --------------------------------------------------------------------------------
                 * STATUS BAR (Dynamic Island)
                 * -------------------------------------------------------------------------------*/}
                <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
                    <div className={cn(
                        "flex items-center gap-3 px-4 py-2 rounded-full shadow-xl border border-border/50 backdrop-blur-md transition-all duration-500",
                        state === "idle" ? "bg-background/80 w-auto" : "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 border-transparent ring-2 ring-violet-500/20"
                    )}>
                        <div className={cn(
                            "flex items-center justify-center h-6 w-6 rounded-full transition-colors",
                            state === "sent" ? "bg-green-500" : "bg-violet-500"
                        )}>
                            <StatusIcon className="h-3.5 w-3.5 text-white animate-in zoom-in" />
                        </div>

                        <span className="text-xs font-medium min-w-[180px]">
                            {getStatusText()}
                        </span>

                        {state !== "idle" && state !== "sent" && (
                            <Loader2 className="h-3 w-3 animate-spin opacity-50" />
                        )}
                    </div>
                </div>

                {/* --------------------------------------------------------------------------------
                 * EMAIL CLIENT UI - WRAPPED IN SCROLL VIEW
                 * -------------------------------------------------------------------------------*/}
                <div
                    ref={scrollRef}
                    className="flex-1 p-8 flex flex-col gap-6 pt-20 overflow-y-auto scroll-smooth"
                >

                    {/* INCOMING EMAIL */}
                    <div className={cn(
                        "transition-all duration-700 transform origin-top shrink-0",
                        state === "idle" ? "opacity-50 blur-[1px] scale-95" : "opacity-100 blur-0 scale-100"
                    )}>
                        <div className="flex items-start gap-4">
                            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center text-blue-700 font-bold text-sm shrink-0">HI</div>
                            <div className="flex-1 bg-muted/30 p-4 rounded-xl rounded-tl-none border border-border/50">
                                <div className="flex justify-between items-baseline mb-2">
                                    <h4 className="text-sm font-bold text-foreground">Henrik Ibsen</h4>
                                    <span className="text-[10px] text-muted-foreground">10:42</span>
                                </div>
                                <p className="text-sm text-foreground/80 leading-relaxed">
                                    {emailContent.body}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* AI DRAFTING AREA */}
                    {(state === "drafting" || state === "sending" || state === "sent") && (
                        <div className="flex items-start gap-4 animate-in slide-in-from-bottom-4 duration-500 pb-8 shrink-0">
                            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shadow-lg ring-4 ring-background border border-white/10 shrink-0">
                                <Sparkles className="h-5 w-5 text-white" />
                            </div>
                            <div className="flex-1 bg-background border border-violet-200 dark:border-violet-900/50 p-5 rounded-xl rounded-tl-none shadow-sm relative overflow-hidden group">
                                {/* Shimmer effect while drafting */}
                                {state === "drafting" && (
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-violet-500/5 to-transparent -translate-x-full animate-shimmer" style={{ backgroundSize: '200% 100%' }} />
                                )}

                                <div className="relative z-10 min-h-[60px]">
                                    <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap font-medium">
                                        {draft}
                                        {state === "drafting" && <span className="inline-block w-1.5 h-4 ml-0.5 bg-violet-500 animate-pulse align-middle" />}
                                    </p>
                                </div>

                                <div className="mt-4 flex items-center gap-2">
                                    <div className="px-2 py-1 rounded bg-violet-100 dark:bg-violet-900/30 text-[10px] text-violet-700 dark:text-violet-300 font-medium border border-violet-200 dark:border-violet-800 animate-in fade-in zoom-in duration-500">
                                        Kilde: Prisliste 2024
                                    </div>
                                    <div className="px-2 py-1 rounded bg-violet-100 dark:bg-violet-900/30 text-[10px] text-violet-700 dark:text-violet-300 font-medium border border-violet-200 dark:border-violet-800 animate-in fade-in zoom-in duration-500 delay-100">
                                        Kilde: Integrasjoner
                                    </div>
                                </div>

                                {state === "sent" && (
                                    <div className="absolute bottom-4 right-4 flex items-center gap-1.5 text-xs font-bold text-green-600 animate-in zoom-in">
                                        <Check className="h-3.5 w-3.5" />
                                        Sendt
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                </div>

            </div>
        </Safari>
    );
}
