"use client";

import Link from "next/link";
import { Button } from "./ui/button"; // Assuming a button component exists or I will use standard HTML/Tailwind for now if not
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils"; // Assuming cn utility might exist, if not I'll standardise
import { Menu, X } from "lucide-react";

// Fallback for cn if not present, but I'll assume standard Shadcn/Tailwind setup or just use template literals
const simpleCn = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(" ");

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Product", href: "#product" },
        { name: "Use Cases", href: "#use-cases" },
        { name: "Pricing", href: "#pricing" },
        { name: "Blog", href: "#blog" },
        { name: "Resources", href: "#resources" },
    ];

    return (
        <nav
            className={simpleCn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
                isScrolled ? "bg-black/80 backdrop-blur-md border-white/10" : "bg-transparent"
            )}
        >
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="text-xl font-medium tracking-tight text-white flex items-center gap-2">
                    {/* Using text for now as icon isn't extracted */}
                    <span className="font-bold">Antigravity</span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Right Side */}
                <div className="hidden md:flex items-center gap-4">
                    <button className="text-sm font-medium text-white hover:text-gray-300 transition-colors">
                        Sign in
                    </button>
                    <a
                        href="#"
                        className="bg-white text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors"
                    >
                        Download
                    </a>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden text-white"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-black border-b border-white/10">
                    <div className="px-6 py-4 flex flex-col gap-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-base font-medium text-gray-300 hover:text-white"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <div className="pt-4 border-t border-white/10 flex flex-col gap-4">
                            <button className="text-left text-base font-medium text-white">
                                Sign in
                            </button>
                            <a
                                href="#"
                                className="bg-white text-black px-4 py-2 rounded-full text-center text-sm font-medium hover:bg-gray-100"
                            >
                                Download
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
