import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

export const Meteors = ({ number = 20 }: { number?: number }) => {
    const [meteors, setMeteors] = useState<number[]>([]);

    useEffect(() => {
        setMeteors(new Array(number || 20).fill(true));
    }, [number]);

    return (
        <>
            {meteors.map((el, idx) => (
                <span
                    key={"meteor" + idx}
                    className={cn(
                        "pointer-events-none absolute left-1/2 top-1/2 h-0.5 w-0.5 rotate-[215deg] animate-meteor rounded-[9999px] bg-slate-500 shadow-[0_0_0_1px_#ffffff10]",
                    )}
                    style={{
                        top: 0,
                        left: Math.floor(Math.random() * (400 - -400) + -400) + "px",
                        animationDelay: Math.random() * (0.8 - 0.2) + 0.2 + "s",
                        animationDuration: Math.floor(Math.random() * (10 - 2) + 2) + "s",
                    }}
                >
                    {/* Meteor Tail */}
                    <span className="pointer-events-none absolute top-1/2 -z-10 h-[1px] w-[50px] -translate-y-1/2 bg-gradient-to-r from-slate-500 to-transparent" />
                </span>
            ))}
        </>
    );
};
