"use client";

import { useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";

interface CounterProps {
    value: number;
    prefix?: string;
    suffix?: string;
    decimals?: number;
}

export default function Counter({ value, prefix = "", suffix = "", decimals = 0 }: CounterProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, {
        damping: 30, // Higher damping = less bounce (smoother for numbers)
        stiffness: 60,
    });
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    useEffect(() => {
        if (isInView) {
            motionValue.set(value);
        }
    }, [isInView, motionValue, value]);

    useEffect(() => {
        // Subscriber to update text content directly for performance
        const unsubscribe = springValue.on("change", (latest) => {
            if (ref.current) {
                ref.current.textContent = `${prefix}${latest.toFixed(decimals)}${suffix}`;
            }
        });
        return () => unsubscribe();
    }, [springValue, prefix, suffix, decimals]);

    return <span ref={ref} className="tabular-nums" />;
}
