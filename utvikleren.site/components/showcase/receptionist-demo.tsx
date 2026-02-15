"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Safari } from "@/components/ui/device-mockups";
import {
    Phone,
    Mic,
    Calendar,
    CheckCircle2,
    Users,
    ArrowRight,
    X,
    Loader2,
    MessageSquare,
    Search
} from "lucide-react";

type Step =
    | "idle"
    | "incoming_call"
    | "transcribing"
    | "understanding"
    | "allocating_calendar"
    | "calendar_view_busy"
    | "calendar_view_free"
    | "generating_response"
    | "responding";

export default function ReceptionistDemo() {
    const [step, setStep] = useState<Step>("idle");
    const [transcript, setTranscript] = useState("");
    const [response, setResponse] = useState("");

    // Animation Loop
    useEffect(() => {
        let mounted = true;

        const runSequence = async () => {
            const delay = (ms: number) => new Promise(r => setTimeout(r, ms));

            while (mounted) {
                setStep("idle");
                setTranscript("");
                setResponse("");

                // 1. Incoming Call (1s)
                await delay(1000);
                if (!mounted) break;
                setStep("incoming_call");

                // 2. Transcribing User Input (3s)
                await delay(2000);
                if (!mounted) break;
                setStep("transcribing");
                typeWriter("Hei, har dere ledig time for en sjekk på mandag kl 14?", setTranscript);

                // 3. AI Understanding Intent (3.5s)
                await delay(3500);
                if (!mounted) break;
                setStep("understanding");

                // 4. Check Calendar (Switch Tab) (1.5s)
                await delay(1500);
                if (!mounted) break;
                setStep("allocating_calendar");

                // 5. Calendar Busy (Simulate checking Monday) (1.5s)
                await delay(1500);
                if (!mounted) break;
                setStep("calendar_view_busy");

                // 6. Calendar Free (Simulate checking Tuesday) (2s)
                await delay(2000);
                if (!mounted) break;
                setStep("calendar_view_free");

                // 7. Back to Workflow (Generating Response) (2s)
                await delay(2000);
                if (!mounted) break;
                setStep("generating_response");

                // 8. Output Response (1.5s)
                await delay(1500);
                if (!mounted) break;
                setStep("responding");
                typeWriter("Mandag kl 14 er dessverre opptatt, men jeg har ledig tirsdag kl 10. Passer det?", setResponse);

                // Loop finish delay (8s)
                await delay(8000);
            }
        };

        runSequence();

        return () => { mounted = false; };
    }, []);

    const typeWriter = (text: string, setter: (s: string) => void) => {
        let i = 0;
        const interval = setInterval(() => {
            if (i <= text.length) {
                setter(text.slice(0, i));
                i++;
            } else {
                clearInterval(interval);
            }
        }, 30);
    };

    // Derived States for UI
    const isCalendarView = step === "calendar_view_busy" || step === "calendar_view_free";
    const currentUrl = isCalendarView
        ? "calendar.google.com/calendar/r"
        : "app.n8n.io/workflow/ai-receptionist";

    return (
        <Safari url={currentUrl} className="h-full">
            <div className="relative h-[450px] w-full bg-background overflow-hidden font-sans flex flex-col">

                {/* --------------------------------------------------------------------------------
                 * VIEW 1: WORKFLOW EDITOR (Clean Nodes)
                 * -------------------------------------------------------------------------------*/}
                <div
                    className={cn(
                        "flex-1 p-6 transition-opacity duration-500 flex flex-col items-center",
                        isCalendarView ? "opacity-0 pointer-events-none absolute inset-0" : "opacity-100"
                    )}
                >
                    {/* Header */}
                    <div className="w-full flex justify-between items-center mb-8 border-b border-border pb-4">
                        <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Workflow Active</span>
                        </div>
                        <span className="text-xs text-muted-foreground">v2.1.0</span>
                    </div>

                    {/* Nodes Visualization - Clean, No Dynamic Text Inside */}
                    <div className="relative flex w-full justify-between items-center gap-4 px-4">
                        {/* Connecting Line */}
                        <div className="absolute top-1/2 left-10 right-10 h-0.5 bg-border -z-10" />

                        <WorkflowNode
                            active={step !== "idle"}
                            icon={Phone}
                            label="Call"
                            color="bg-emerald-500"
                        />

                        <WorkflowNode
                            active={["transcribing", "understanding", "allocating_calendar", "generating_response", "responding"].includes(step)}
                            icon={Mic}
                            label="Listen"
                            color="bg-blue-500"
                        />

                        <WorkflowNode
                            active={["understanding", "allocating_calendar", "generating_response", "responding"].includes(step)}
                            icon={Users}
                            label="Agent"
                            color="bg-violet-500"
                        />

                        <WorkflowNode
                            active={["allocating_calendar", "generating_response", "responding"].includes(step)}
                            icon={Calendar}
                            label="Calendar"
                            color="bg-orange-500"
                            pulse={step === "allocating_calendar"}
                        />

                        <WorkflowNode
                            active={step === "responding"}
                            icon={MessageSquare}
                            label="Reply"
                            color="bg-green-500"
                        />
                    </div>

                    {/* DYNAMIC ACTIVITY LOG (The "Think Process" Area) */}
                    <div className="mt-12 w-full max-w-lg mx-auto">
                        <div className="bg-muted/30 border border-border rounded-xl p-4 min-h-[100px] flex items-center justify-center transition-all duration-300">

                            {step === "idle" && (
                                <span className="text-sm text-muted-foreground animate-pulse">Venter på anrop...</span>
                            )}

                            {step === "incoming_call" && (
                                <div className="flex items-center gap-3 animate-in slide-in-from-bottom-2">
                                    <div className="h-10 w-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                                        <Phone className="h-5 w-5 text-emerald-600 animate-ring" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-foreground">Innkommende anrop</p>
                                        <p className="text-xs text-muted-foreground">+47 912 34 567</p>
                                    </div>
                                </div>
                            )}

                            {step === "transcribing" && (
                                <div className="w-full text-center space-y-2 animate-in fade-in">
                                    <p className="text-xs font-medium text-blue-500 uppercase tracking-wide">Transkriberer</p>
                                    <p className="text-lg font-medium text-foreground leading-snug">"{transcript}"<span className="animate-blink">|</span></p>
                                </div>
                            )}

                            {step === "understanding" && (
                                <div className="flex items-center gap-3 animate-in zoom-in-95">
                                    <Loader2 className="h-5 w-5 text-violet-500 animate-spin" />
                                    <div className="text-left">
                                        <p className="text-sm font-bold text-foreground">Analyserer intensjon</p>
                                        <p className="text-xs text-muted-foreground">Intent: <span className="text-violet-500 font-mono">booking_request</span></p>
                                        <p className="text-xs text-muted-foreground">Entity: <span className="text-violet-500 font-mono">Monday 14:00</span></p>
                                    </div>
                                </div>
                            )}

                            {step === "generating_response" && (
                                <div className="flex items-center gap-3 animate-pulse">
                                    <div className="h-2 w-2 rounded-full bg-foreground/50 animate-bounce" />
                                    <div className="h-2 w-2 rounded-full bg-foreground/50 animate-bounce delay-75" />
                                    <div className="h-2 w-2 rounded-full bg-foreground/50 animate-bounce delay-150" />
                                    <span className="text-sm text-muted-foreground ml-2">Genererer svar...</span>
                                </div>
                            )}

                            {step === "responding" && (
                                <div className="w-full text-center space-y-2 animate-in fade-in">
                                    <p className="text-xs font-medium text-green-500 uppercase tracking-wide">AI Svar</p>
                                    <p className="text-md font-medium text-foreground leading-relaxed">"{response}"</p>
                                </div>
                            )}

                        </div>
                    </div>
                </div>

                {/* --------------------------------------------------------------------------------
                 * VIEW 2: CALENDAR (Simulated Tab)
                 * -------------------------------------------------------------------------------*/}
                <div
                    className={cn(
                        "absolute inset-0 bg-background p-6 transition-all duration-500 transform",
                        isCalendarView ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                    )}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
                        <div className="flex items-center gap-2">
                            <div className="h-8 w-8 bg-blue-600 rounded-md flex items-center justify-center text-white font-bold text-xs">31</div>
                            <h3 className="text-lg font-semibold text-foreground">Kalender</h3>
                        </div>
                        <div className="flex gap-2">
                            <span className="px-3 py-1 text-sm bg-muted rounded-md text-muted-foreground">Uke 12</span>
                        </div>
                    </div>

                    {/* Grid */}
                    <div className="grid grid-cols-4 gap-4 h-[290px] overflow-hidden">
                        {/* Time Column */}
                        <div className="text-right pr-4 border-r border-border text-xs text-muted-foreground">
                            <div className="h-10"></div> {/* Header Spacer matches Day header */}

                            {/* Times */}
                            <div className="relative">
                                {["09:00", "10:00", "11:00", "12:00", "13:00", "14:00"].map((t) => (
                                    <div key={t} className="h-[45px] flex items-start justify-end -mt-2">
                                        {t}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Days */}
                        {["Man 17.", "Tir 18.", "Ons 19."].map((day, i) => (
                            <div key={day} className="relative border-l border-border/50 pl-2">
                                <div className="h-8 text-sm font-medium text-muted-foreground mb-2 flex items-center">{day}</div>

                                {/* Slot Container - Relative Grid (45px per hour) */}
                                <div className="relative h-full">

                                    {/* Pasient A at 09:00-10:00 (Top: 0) */}
                                    <div className="absolute top-0 left-0 right-1 h-[40px] bg-blue-500/10 rounded border border-blue-500/20 p-1.5 text-[10px] text-blue-600 font-medium truncate">
                                        Pasient A
                                    </div>

                                    {/* Lunsj at 12:00-12:30 (Top: 135px -> 3 hours * 45) */}
                                    <div className="absolute top-[135px] left-0 right-1 h-[30px] bg-blue-500/5 rounded border border-blue-500/10 p-1.5 text-[10px] text-blue-500 truncate">
                                        Lunsj
                                    </div>

                                    {/* MONDAY 14:00 BUSY HIGHLIGHT (5 hours * 45 = 225px) */}
                                    {i === 0 && (
                                        <div className={cn(
                                            "absolute top-[225px] left-0 right-1 h-[40px] rounded border p-2 transition-all duration-300 flex items-center justify-center backdrop-blur-sm",
                                            step === "calendar_view_busy"
                                                ? "bg-red-500/20 border-red-500 text-red-600 scale-105 shadow-xl z-20"
                                                : "bg-transparent border-transparent"
                                        )}>
                                            {step === "calendar_view_busy" && (
                                                <div className="flex items-center gap-1 font-bold text-xs animate-in zoom-in">
                                                    <X className="h-3 w-3" />
                                                    Opptatt
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* TUESDAY 10:00 FREE HIGHLIGHT (1 hour * 45 = 45px) */}
                                    {i === 1 && (
                                        <div className={cn(
                                            "absolute top-[45px] left-0 right-1 h-[40px] rounded border-2 p-2 transition-all duration-300 flex items-center justify-center",
                                            step === "calendar_view_free"
                                                ? "bg-green-500/20 border-green-500 border-dashed scale-105 shadow-xl z-20"
                                                : "border-transparent"
                                        )}>
                                            {step === "calendar_view_free" && (
                                                <div className="flex items-center gap-1 font-bold text-xs text-green-600 animate-in zoom-in">
                                                    <CheckCircle2 className="h-3 w-3" />
                                                    Ledig
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Floating Status Toast for Calendar */}
                    <div
                        className={cn(
                            "absolute bottom-8 left-1/2 -translate-x-1/2 bg-neutral-900/90 text-white dark:bg-white/90 dark:text-neutral-900 backdrop-blur text-xs px-4 py-2 rounded-full shadow-2xl transition-all duration-500 flex items-center gap-2 pointer-events-none z-50",
                            isCalendarView ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                        )}
                    >
                        {step === "calendar_view_busy" ? (
                            <>
                                <Search className="h-3 w-3 animate-spin" />
                                Sjekker mandag 14:00...
                            </>
                        ) : (
                            <>
                                <CheckCircle2 className="h-3 w-3 text-green-400" />
                                Fant ledig tid tirsdag 10:00
                            </>
                        )}
                    </div>
                </div>

            </div>
        </Safari>
    );
}

function WorkflowNode({ active, icon: Icon, label, color, pulse }: any) {
    return (
        <div
            className={cn(
                "flex flex-col items-center gap-2 transition-all duration-500 z-10",
                active ? "opacity-100 scale-105" : "opacity-40 grayscale scale-95"
            )}
        >
            <div
                className={cn(
                    "h-12 w-12 rounded-2xl flex items-center justify-center text-white shadow-lg transition-transform duration-300",
                    color,
                    active && "shadow-xl ring-2 ring-offset-2 ring-offset-background",
                    active ? `ring-${color.split('-')[1]}-400` : "", // Dynamic ring color attempt, simplified below usually
                    pulse && "animate-pulse"
                )}
            >
                <Icon className="h-5 w-5" />
            </div>
            <p className={cn(
                "text-[10px] font-bold tracking-wide uppercase transition-colors",
                active ? "text-foreground" : "text-muted-foreground"
            )}>{label}</p>
        </div>
    );
}
