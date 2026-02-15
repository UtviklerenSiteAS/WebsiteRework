"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TerminalProps {
    children: React.ReactNode;
    className?: string;
}

export function Terminal({ children, className }: TerminalProps) {
    return (
        <div
            className={cn(
                "z-0 h-full max-h-[400px] w-full rounded-xl border border-white/10 bg-zinc-950",
                className
            )}
        >
            {/* Terminal Header */}
            <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
                <div className="flex gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-red-500/70" />
                    <div className="h-3 w-3 rounded-full bg-yellow-500/70" />
                    <div className="h-3 w-3 rounded-full bg-green-500/70" />
                </div>
                <span className="ml-2 text-xs text-zinc-500 font-mono">terminal</span>
            </div>

            {/* Terminal Body */}
            <div className="p-4 font-mono text-sm overflow-y-auto max-h-[calc(100%-48px)]">
                <div className="flex flex-col gap-1">{children}</div>
            </div>
        </div>
    );
}

interface AnimatedSpanProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
}

export function AnimatedSpan({ children, className, delay = 0 }: AnimatedSpanProps) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setVisible(true), delay);
        return () => clearTimeout(timer);
    }, [delay]);

    return (
        <span
            className={cn(
                "transition-opacity duration-300",
                visible ? "opacity-100" : "opacity-0",
                className
            )}
        >
            {children}
        </span>
    );
}

interface TerminalTypingAnimationProps {
    children: string;
    className?: string;
    delay?: number;
    duration?: number;
}

export function TerminalTypingAnimation({
    children,
    className,
    delay = 0,
    duration = 60,
}: TerminalTypingAnimationProps) {
    const [displayedText, setDisplayedText] = useState("");
    const [started, setStarted] = useState(false);

    useEffect(() => {
        const startTimer = setTimeout(() => setStarted(true), delay);
        return () => clearTimeout(startTimer);
    }, [delay]);

    useEffect(() => {
        if (!started) return;
        let i = 0;
        const interval = setInterval(() => {
            if (i < children.length) {
                setDisplayedText(children.substring(0, i + 1));
                i++;
            } else {
                clearInterval(interval);
            }
        }, duration);
        return () => clearInterval(interval);
    }, [started, children, duration]);

    return (
        <span className={cn("text-zinc-300", className)}>
            {displayedText}
            {started && displayedText.length < children.length && (
                <span className="animate-pulse text-zinc-400">▌</span>
            )}
        </span>
    );
}
