"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AnalyticsTracker() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const supabase = createClient();

    useEffect(() => {
        const logVisit = async () => {
            // Don't track admin pages or dashboard to avoid inflating your own stats
            if (pathname.includes("/admin") || pathname.includes("/dashboard") || pathname.includes("/api/")) {
                return;
            }

            try {
                // Get or create a session ID for the user (simple way to track unique sessions)
                let sessionId = localStorage.getItem("analytics_session_id");
                if (!sessionId) {
                    sessionId = crypto.randomUUID();
                    localStorage.setItem("analytics_session_id", sessionId);
                }

                await supabase.from("analytics_visits").insert({
                    path: pathname,
                    referrer: document.referrer || "Direct",
                    user_agent: navigator.userAgent,
                    session_id: sessionId,
                });
            } catch (err) {
                console.error("Analytics tracking failed:", err);
            }
        };

        logVisit();
    }, [pathname, searchParams, supabase]);

    return null; // This component doesn't render anything
}
