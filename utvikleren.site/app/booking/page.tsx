"use client";

import Navbar from "@/components/navbar";
import Footer from "@/components/sections/footer";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function BookingPage() {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const calUrl = `https://cal.eu/utvikleren?embed=true&theme=${resolvedTheme === "dark" ? "dark" : "light"}&transparent=true&lang=no`;

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <Navbar />
            <main className="relative z-10 flex-1 pt-32 pb-20 px-6">
                <div className="mx-auto max-w-5xl text-center">
                    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
                        Book et uforpliktende møte
                    </h1>
                    <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
                        Finn en tid som passer deg i kalenderen under, så tar vi en prat om hvordan vi kan hjelpe din bedrift.
                    </p>

                    {/* Cal.com Embed - Completely clean container */}
                    <div className="w-full h-[800px] overflow-hidden">
                        {mounted && (
                            <iframe
                                src={calUrl}
                                className="w-full h-full"
                                style={{ border: "none", background: "transparent" }}
                                title="Cal.com Booking"
                            />
                        )}
                    </div>
                </div>
            </main>
            <Footer hideCTA={true} />
        </div>
    );
}
