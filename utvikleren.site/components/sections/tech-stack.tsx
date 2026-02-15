"use client";

import Marquee from "@/components/ui/marquee";
import { cn } from "@/lib/utils";

const technologies = [
    { name: "Next.js", icon: "⚡" },
    { name: "React", icon: "⚛️" },
    { name: "TypeScript", icon: "📘" },
    { name: "Python", icon: "🐍" },
    { name: "OpenAI", icon: "🤖" },
    { name: "Supabase", icon: "🟢" },
    { name: "Tailwind", icon: "🎨" },
    { name: "PostgreSQL", icon: "🐘" },
    { name: "Node.js", icon: "🟩" },
    { name: "FastAPI", icon: "🚀" },
    { name: "Docker", icon: "🐳" },
    { name: "Vercel", icon: "▲" },
];

function TechChip({ name, icon }: { name: string; icon: string }) {
    return (
        <div
            className={cn(
                "flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.03] px-5 py-3",
                "hover:bg-white/[0.06] hover:border-white/10 transition-all duration-300 cursor-default"
            )}
        >
            <span className="text-xl">{icon}</span>
            <span className="text-sm font-medium text-zinc-300 whitespace-nowrap">
                {name}
            </span>
        </div>
    );
}

export default function TechStack() {
    return (
        <section className="relative py-20 overflow-hidden">
            {/* Top fade */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <div className="mx-auto max-w-6xl px-6 mb-12">
                <p className="text-center text-sm uppercase tracking-[0.2em] text-zinc-500">
                    Teknologier vi jobber med
                </p>
            </div>

            <Marquee pauseOnHover className="[--duration:40s] [--gap:1rem]">
                {technologies.map((tech) => (
                    <TechChip key={tech.name} {...tech} />
                ))}
            </Marquee>

            <div className="mt-4">
                <Marquee
                    reverse
                    pauseOnHover
                    className="[--duration:35s] [--gap:1rem]"
                >
                    {technologies
                        .slice()
                        .reverse()
                        .map((tech) => (
                            <TechChip key={tech.name + "-rev"} {...tech} />
                        ))}
                </Marquee>
            </div>

            {/* Bottom fade */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </section>
    );
}
