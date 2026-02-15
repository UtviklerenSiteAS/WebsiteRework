"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
    const { theme, setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    if (!mounted) {
        return <div className="h-9 w-9" />; // placeholder to avoid layout shift
    }

    const isDark = resolvedTheme === "dark";

    return (
        <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="relative h-9 w-9 rounded-full flex items-center justify-center border border-border bg-background/50 backdrop-blur-sm hover:bg-accent transition-colors"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-foreground" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-foreground" />
        </button>
    );
}
