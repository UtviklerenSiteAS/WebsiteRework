"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Logo } from "@/components/ui/logo";

const navLinks = [
    { label: "Hjem", href: "/" },
    { label: "Prosjekter", href: "/prosjekter" },
    { label: "Hva vi lager", href: "/#showcase" },
    { label: "Prosess", href: "/#prosess" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setMobileOpen(false);
    }, [pathname]);

    const isActive = (href: string) => {
        if (href === "/") return pathname === "/";
        return pathname.startsWith(href.split("#")[0]) && href.split("#")[0] !== "/";
    };

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
                scrolled
                    ? "bg-background/80 backdrop-blur-xl border-b border-border shadow-sm"
                    : "bg-transparent"
            )}
        >
            <div className="mx-auto max-w-6xl flex items-center justify-between px-6 py-4">
                {/* Logo */}
                <a
                    href="/"
                    className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                    aria-label="Hjem"
                >
                    <Logo />
                </a>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-1">
                    {navLinks.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            className={cn(
                                "relative px-4 py-2 text-sm rounded-lg transition-colors",
                                isActive(link.href)
                                    ? "text-foreground font-medium bg-accent"
                                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                            )}
                        >
                            {link.label}
                            {isActive(link.href) && (
                                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 w-4 rounded-full bg-blue-500" />
                            )}
                        </a>
                    ))}
                    <div className="ml-2">
                        <ThemeToggle />
                    </div>
                    <a
                        href="/booking"
                        className="ml-3 px-5 py-2 text-sm font-medium rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:opacity-90 hover:scale-105 transition-all duration-200 shadow-sm shadow-blue-500/20"
                    >
                        Book et møte
                    </a>
                </div>

                {/* Mobile controls */}
                <div className="md:hidden flex items-center gap-2">
                    <ThemeToggle />
                    <button
                        className="flex items-center justify-center h-9 w-9 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                        onClick={() => setMobileOpen(!mobileOpen)}
                        aria-label={mobileOpen ? "Lukk meny" : "Åpne meny"}
                    >
                        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={cn(
                    "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
                    mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                )}
            >
                <div className="bg-background/95 backdrop-blur-xl border-t border-border px-6 pb-6 pt-2">
                    {navLinks.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            className={cn(
                                "flex items-center justify-between py-3 text-sm border-b border-border transition-colors",
                                isActive(link.href)
                                    ? "text-foreground font-medium"
                                    : "text-muted-foreground hover:text-foreground"
                            )}
                            onClick={() => setMobileOpen(false)}
                        >
                            {link.label}
                            {isActive(link.href) && (
                                <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                            )}
                        </a>
                    ))}
                    <a
                        href="/booking"
                        className="block mt-4 text-center px-5 py-3 text-sm font-medium rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-sm shadow-blue-500/20"
                        onClick={() => setMobileOpen(false)}
                    >
                        Book et møte
                    </a>
                </div>
            </div>
        </nav>
    );
}
