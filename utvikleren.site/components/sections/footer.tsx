"use client";

import { ArrowRight, Mail, MapPin } from "lucide-react";
import ShimmerButton from "@/components/ui/shimmer-button";
import { Logo } from "@/components/ui/logo";

interface FooterProps {
    hideCTA?: boolean;
}

export default function Footer({ hideCTA = false }: FooterProps) {
    return (
        <footer {...(!hideCTA ? { id: "kontakt" } : {})} className="relative pt-24 pb-12 px-6 overflow-hidden">
            {/* Top separator */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

            {/* Glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-blue-600/5 dark:bg-blue-600/10 blur-[150px]" />

            <div className="relative z-10 mx-auto max-w-6xl">
                {/* CTA Card */}
                {!hideCTA && (
                    <div className="relative rounded-3xl border border-border bg-muted/30 dark:bg-muted/20 p-12 sm:p-16 text-center mb-20 overflow-hidden">
                        {/* Top glow line */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />

                        <h2 className="text-3xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/50 mb-4">
                            La oss snakke!
                        </h2>
                        <p className="max-w-md mx-auto text-muted-foreground text-lg mb-10">
                            Helt uforpliktende — fortell oss hva du trenger, så finner vi ut om vi kan hjelpe.
                        </p>

                        <ShimmerButton
                            href="/booking"
                            className="h-14 px-10 text-base font-semibold mx-auto"
                            shimmerColor="rgba(59, 130, 246, 0.5)"
                            background="linear-gradient(135deg, rgba(59, 130, 246, 0.9), rgba(6, 182, 212, 0.9))"
                        >
                            Book et gratis møte
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </ShimmerButton>
                    </div>
                )}

                {/* Footer Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 mb-16">
                    {/* Brand */}
                    <div>
                        <div className="mb-4">
                            <Logo />
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Vi hjelper norske bedrifter med å digitalisere og automatisere — enkelt og effektivt.
                        </p>
                    </div>

                    {/* Nav */}
                    <div>
                        <h4 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
                            Sider
                        </h4>
                        <div className="flex flex-col gap-3">
                            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Hjem</a>
                            <a href="#showcase" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Hva vi lager</a>
                            <a href="#prosess" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Prosess</a>
                            <a href="#kontakt" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Kontakt</a>
                        </div>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
                            Kontakt
                        </h4>
                        <div className="flex flex-col gap-3">
                            <a href="mailto:post@utvikleren.site" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                                <Mail className="h-4 w-4" />
                                post@utvikleren.site
                            </a>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <MapPin className="h-4 w-4" />
                                Kristiansand, Norge
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div className="border-t border-border pt-8 text-center">
                    <p className="text-xs text-muted-foreground">
                        © {new Date().getFullYear()} Utvikleren.site AS. Alle rettigheter reservert.
                    </p>
                </div>
            </div>
        </footer>
    );
}
