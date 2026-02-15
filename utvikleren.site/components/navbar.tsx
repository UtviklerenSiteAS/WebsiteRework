"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Logo } from "@/components/ui/logo";

const navLinks = [
    { label: "Hjem", href: "/" },
    { label: "Hva vi lager", href: "/#showcase" },
    { label: "Prosess", href: "/#prosess" },
    { label: "Kontakt", href: "/booking" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
                scrolled
                    ? "bg-background/80 backdrop-blur-xl border-b border-border shadow-2xl shadow-blue-500/5"
                    : "bg-transparent"
            )}
        >
            <div className="mx-auto max-w-6xl flex items-center justify-between px-6 py-4">
                {/* Logo */}
                <a href="/" className="flex items-center gap-2 group hover:opacity-80 transition-opacity">
                    <Logo />
                </a>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-1">
                    {navLinks.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-accent"
                        >
                            {link.label}
                        </a>
                    ))}
                    <div className="ml-2">
                        <ThemeToggle />
                    </div>
                    <a
                        href="/booking"
                        className="ml-3 px-5 py-2 text-sm font-medium rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:opacity-90 transition-opacity"
                    >
                        Book et møte
                    </a>
                </div>

                {/* Mobile Toggle */}
                <div className="md:hidden flex items-center gap-2">
                    <ThemeToggle />
                    <button
                        className="text-muted-foreground hover:text-foreground"
                        onClick={() => setMobileOpen(!mobileOpen)}
                    >
                        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileOpen && (
                <div className="md:hidden bg-background/95 backdrop-blur-xl border-t border-border px-6 pb-6 pt-2">
                    {navLinks.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            className="block py-3 text-muted-foreground hover:text-foreground transition-colors border-b border-border"
                            onClick={() => setMobileOpen(false)}
                        >
                            {link.label}
                        </a>
                    ))}
                    <a
                        href="/booking"
                        className="block mt-4 text-center px-5 py-3 text-sm font-medium rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white"
                        onClick={() => setMobileOpen(false)}
                    >
                        Book et møte
                    </a>
                </div>
            )}
        </nav>
    );
}
