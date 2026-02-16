"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Tab {
    id: string;
    label: string;
}

interface AnimatedTabsProps {
    tabs: Tab[];
    activeTab: string;
    onChange: (id: string) => void;
    className?: string;
}

export function AnimatedTabs({ tabs, activeTab, onChange, className }: AnimatedTabsProps) {
    return (
        <div className={cn("flex flex-wrap items-center justify-center gap-2", className)}>
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => onChange(tab.id)}
                    className={cn(
                        "relative px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 focus:outline-none",
                        activeTab === tab.id ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                    )}
                    style={{
                        WebkitTapHighlightColor: "transparent",
                    }}
                >
                    {activeTab === tab.id && (
                        <motion.div
                            layoutId="active-tab"
                            className="absolute inset-0 bg-background shadow-sm border border-border/50 rounded-full dark:bg-zinc-800"
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                    )}
                    <span className="relative z-10">{tab.label}</span>
                </button>
            ))}
        </div>
    );
}
