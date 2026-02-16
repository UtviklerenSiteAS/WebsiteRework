"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Safari, IPhone } from "@/components/ui/device-mockups";
import {
    Phone,
    Mic,
    MoreHorizontal,
    Calendar,
    ArrowRight,
    User,
    Check
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type CallState =
    | "incoming"
    | "active_listening"
    | "active_thinking"
    | "active_speaking"
    | "checking_calendar"
    | "booking_confirmed"
    | "ended";

const TRANSCRIPT_LOG = [
    { role: "ai", text: "Hei, du snakker med Maria fra Tannlege-senteret. Hva kan jeg hjelpe deg med i dag?" },
    { role: "user", text: "Hei, jeg har så vondt i en tann, har dere noe ledig i morgen?" },
    { role: "ai", text: "Uff, det hørtes ikke godt ut. Skal vi se... Jeg sjekker kalenderen for deg nå." },
    { role: "action", text: "Checking availability..." },
    { role: "ai", text: "Jeg har en ledig time i morgen kl 10:30 hos Tannlege Olsen, eller 14:00. Hva passer best?" },
    { role: "user", text: "10:30 passer fint." },
    { role: "ai", text: "Den er grei. Da har jeg booket time til deg i morgen kl 10:30. God bedring!" }
];

export default function ReceptionistDemo() {
    const [callState, setCallState] = useState<CallState>("incoming");
    const [transcriptIndex, setTranscriptIndex] = useState(0);
    const [timer, setTimer] = useState(0);

    // Call Timer
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (["active_listening", "active_thinking", "active_speaking", "checking_calendar", "booking_confirmed"].includes(callState)) {
            interval = setInterval(() => setTimer(t => t + 1), 1000);
        } else {
            setTimer(0);
        }
        return () => clearInterval(interval);
    }, [callState]);

    // Simulation Sequence
    useEffect(() => {
        let mounted = true;

        const runSimulation = async () => {
            const delay = (ms: number) => new Promise(r => setTimeout(r, ms));

            while (mounted) {
                setCallState("incoming");
                setTranscriptIndex(0);

                // 1. Incoming (2s)
                await delay(2000);
                if (!mounted) break;

                // 2. AI Greeting
                setCallState("active_speaking");
                await delay(2500);
                if (!mounted) break;
                setTranscriptIndex(1); // Show AI greeting

                // 3. User Speaking
                setCallState("active_listening");
                await delay(3000);
                if (!mounted) break;
                setTranscriptIndex(2); // Show User request

                // 4. AI Thinking / Checking
                setCallState("active_thinking");
                await delay(1000);
                if (!mounted) break;

                setCallState("checking_calendar");
                setTranscriptIndex(3); // Show AI response
                await delay(2500);
                if (!mounted) break;

                // 5. AI Offer
                setCallState("active_speaking");
                setTranscriptIndex(4); // Show "Checking..." log? No, skip to offer
                await delay(3000);
                if (!mounted) break;

                // 6. User Confirm
                setCallState("active_listening");
                setTranscriptIndex(5);
                await delay(2000);
                if (!mounted) break;

                // 7. Booking Confirmed
                setCallState("booking_confirmed");
                setTranscriptIndex(6);
                await delay(3000);
                if (!mounted) break;

                // Reset
                setCallState("ended");
                await delay(1000);
            }
        };

        runSimulation();
        return () => { mounted = false; };
    }, []);

    const formatTime = (sec: number) => {
        const m = Math.floor(sec / 60).toString().padStart(2, '0');
        const s = (sec % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    };

    return (
        <IPhone className="h-[530px] w-[280px] mx-auto">
            <div className="relative h-full w-full bg-zinc-950 text-white font-sans flex flex-col overflow-hidden">

                {/* STATUS BAR/HEADER */}
                <div className="px-6 pt-12 pb-4 text-center z-10">
                    <div className="flex flex-col items-center gap-2">
                        <div className="h-16 w-16 rounded-full bg-zinc-800 flex items-center justify-center mb-2 overflow-hidden border border-white/10">
                            <User className="h-8 w-8 text-zinc-400" />
                        </div>
                        <h3 className="text-xl font-semibold tracking-tight">AI Resepsjonist</h3>
                        {callState === "incoming" ? (
                            <p className="text-sm text-zinc-400 animate-pulse">Ringer...</p>
                        ) : (
                            <p className="text-sm text-emerald-400 font-mono">{formatTime(timer)}</p>
                        )}
                    </div>
                </div>

                {/* MAIN VISUALIZATION AREA */}
                <div className="flex-1 relative flex items-center justify-center">

                    {/* WAVEFORM ANIMATION */}
                    {(callState === "active_speaking" || callState === "active_listening") && (
                        <div className="relative flex items-center justify-center">
                            {/* Outer Rings */}
                            {[1, 2, 3].map((i) => (
                                <motion.div
                                    key={i}
                                    className={cn(
                                        "absolute rounded-full border border-white/10",
                                        callState === "active_speaking" ? "bg-blue-500/5" : "bg-emerald-500/5"
                                    )}
                                    animate={{
                                        width: [80, 160 + i * 40, 80],
                                        height: [80, 160 + i * 40, 80],
                                        opacity: [0.5, 0, 0.5]
                                    }}
                                    transition={{
                                        duration: 2 + i * 0.5,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                />
                            ))}
                            {/* Core Icon */}
                            <div className={cn(
                                "relative z-10 h-20 w-20 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(0,0,0,0.5)] transition-colors duration-500",
                                callState === "active_speaking" ? "bg-blue-600" : "bg-emerald-600"
                            )}>
                                {callState === "active_speaking" ? <Mic className="h-8 w-8" /> : <MoreHorizontal className="h-8 w-8 animate-pulse" />}
                            </div>
                        </div>
                    )}

                    {/* THINKING STATE */}
                    {callState === "active_thinking" && (
                        <div className="flex gap-2">
                            <span className="h-3 w-3 rounded-full bg-white animate-bounce" />
                            <span className="h-3 w-3 rounded-full bg-white animate-bounce delay-100" />
                            <span className="h-3 w-3 rounded-full bg-white animate-bounce delay-200" />
                        </div>
                    )}

                </div>

                {/* BOTTOM ACTION BAR */}
                <div className="h-24 px-6 pb-6 pt-2 flex items-center justify-around z-10 bg-gradient-to-t from-black/80 to-transparent">
                    <button className="h-14 w-14 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-zinc-700 transition">
                        <Mic className="h-6 w-6 text-white" />
                    </button>
                    <button className="h-16 w-16 rounded-full bg-red-500 flex items-center justify-center hover:bg-red-600 transition shadow-lg shadow-red-500/20">
                        <Phone className="h-8 w-8 text-white rotate-[135deg]" />
                    </button>
                    <button className="h-14 w-14 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-zinc-700 transition">
                        <span className="text-xs font-bold">Keypad</span>
                    </button>
                </div>

                {/* CALENDAR OVERLAY - Moved to root for full screen coverage */}
                <AnimatePresence>
                    {callState === "checking_calendar" && (
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 20, opacity: 0 }}
                            className="absolute inset-0 bg-zinc-950 flex flex-col z-20 overflow-hidden"
                        >
                            {/* Calendar Header */}
                            <div className="px-6 pt-16 pb-4 bg-zinc-900/50 border-b border-white/5 flex justify-between items-end backdrop-blur-md z-10">
                                <div>
                                    <h2 className="text-2xl font-bold text-white tracking-tight">I morgen</h2>
                                    <p className="text-zinc-400 text-sm font-medium">Tirsdag 18. okt</p>
                                </div>
                                <div className="h-8 w-8 rounded-full bg-zinc-800 flex items-center justify-center border border-white/10">
                                    <Calendar className="h-4 w-4 text-zinc-400" />
                                </div>
                            </div>

                            {/* Timeline Grid */}
                            <div className="flex-1 relative overflow-hidden p-5 space-y-6">
                                {/* Scanning Line */}
                                <motion.div
                                    className="absolute left-0 right-0 h-0.5 bg-sky-500/50 shadow-[0_0_15px_rgba(14,165,233,0.5)] z-10 pointer-events-none"
                                    initial={{ top: 0, opacity: 0 }}
                                    animate={{ top: ["10%", "70%"], opacity: [0, 1, 0] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                />

                                {/* 09:00 - Meeting */}
                                <div className="flex gap-4 opacity-50 grayscale">
                                    <span className="text-xs text-zinc-500 font-mono w-8 text-right pt-1">09:00</span>
                                    <div className="flex-1 bg-zinc-800/50 border-l-2 border-zinc-600 rounded-lg p-2.5">
                                        <p className="text-xs font-bold text-zinc-300">Personalmøte</p>
                                        <p className="text-[10px] text-zinc-500">09:00 - 10:00</p>
                                    </div>
                                </div>

                                {/* 10:00 - Split Slot */}
                                <div className="flex gap-4">
                                    <span className="text-xs text-zinc-500 font-mono w-8 text-right pt-1">10:00</span>
                                    <div className="flex-1 space-y-2">
                                        {/* 10:00 - 10:30 Busy */}
                                        <div className="bg-zinc-800/50 border-l-2 border-red-500/50 rounded-lg p-2 opacity-60">
                                            <p className="text-[10px] font-medium text-red-200/70">Akutt (Opptatt)</p>
                                        </div>

                                        {/* 10:30 - AVAILABLE SLOT */}
                                        <motion.div
                                            initial={{ scale: 0.95, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{ delay: 0.8, type: "spring" }}
                                            className="bg-emerald-500/10 border-l-2 border-emerald-500 rounded-lg p-3 relative overflow-hidden shadow-[0_0_20px_rgba(16,185,129,0.1)]"
                                        >
                                            <div className="absolute inset-0 bg-emerald-500/5 animate-pulse" />
                                            <div className="flex justify-between items-start relative z-10">
                                                <div>
                                                    <p className="text-xs font-bold text-emerald-300">Ledig time</p>
                                                    <p className="text-[10px] text-emerald-400/70">10:30 - 11:30</p>
                                                </div>
                                                <div className="h-5 w-5 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg">
                                                    <Check className="h-3 w-3 text-zinc-950 stroke-[3]" />
                                                </div>
                                            </div>
                                        </motion.div>
                                    </div>
                                </div>

                                {/* 12:00 - Lunch */}
                                <div className="flex gap-4 opacity-50 grayscale">
                                    <span className="text-xs text-zinc-500 font-mono w-8 text-right pt-1">12:00</span>
                                    <div className="flex-1 bg-blue-500/10 border-l-2 border-blue-500/30 rounded-lg p-2.5">
                                        <p className="text-xs font-bold text-blue-200/70">Lunsj</p>
                                        <p className="text-[10px] text-blue-300/50">12:00 - 12:30</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* CONFIRMATION OVERLAY - Moved to root for full screen coverage */}
                <AnimatePresence>
                    {callState === "booking_confirmed" && (
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="absolute inset-0 bg-green-600 flex flex-col items-center justify-center z-50"
                        >
                            <div className="h-24 w-24 rounded-full bg-white flex items-center justify-center mb-6 shadow-xl">
                                <Check className="h-12 w-12 text-green-600" />
                            </div>
                            <h3 className="text-2xl font-bold">Time bestilt!</h3>
                            <p className="text-green-100 mt-2">I morgen, 10:30</p>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* LIVE TRANSCRIPT TOAST */}
                <AnimatePresence mode="wait">
                    {transcriptIndex > 0 && !["checking_calendar", "booking_confirmed"].includes(callState) && (
                        <motion.div
                            key={transcriptIndex}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            className="absolute bottom-28 left-4 right-4 bg-zinc-900/90 backdrop-blur border border-zinc-800 p-3 rounded-2xl shadow-xl z-20"
                        >
                            <div className="flex items-start gap-3">
                                <div className={cn("h-6 w-6 rounded-full flex items-center justify-center shrink-0 mt-0.5", TRANSCRIPT_LOG[transcriptIndex].role === 'ai' ? "bg-blue-600" : "bg-emerald-600")}>
                                    <span className="text-[10px] font-bold text-white uppercase">{TRANSCRIPT_LOG[transcriptIndex].role}</span>
                                </div>
                                <p className="text-sm font-medium leading-snug">{TRANSCRIPT_LOG[transcriptIndex].text}</p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </IPhone>
    );
}
