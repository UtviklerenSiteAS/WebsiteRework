import { cn } from "@/lib/utils";

interface ReviewCardProps {
    img: string;
    name: string;
    username: string;
    body: string;
}

export default function ReviewCard({
    img,
    name,
    username,
    body,
}: ReviewCardProps) {
    return (
        <figure
            className={cn(
                "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
                // light styles
                "border-zinc-950/[.1] bg-zinc-950/[.01] hover:bg-zinc-950/[.05]",
                // dark styles
                "dark:border-zinc-50/[.1] dark:bg-zinc-50/[.10] dark:hover:bg-zinc-50/[.15]",
                // Force dark mode look since site is dark
                "border-white/10 bg-white/5 hover:bg-white/10"
            )}
        >
            <div className="flex flex-row items-center gap-2">
                <img className="rounded-full" width="32" height="32" alt="" src={img} />
                <div className="flex flex-col">
                    <figcaption className="text-sm font-medium dark:text-white text-white">
                        {name}
                    </figcaption>
                    <p className="text-xs font-medium dark:text-white/40 text-white/40">{username}</p>
                </div>
            </div>
            <blockquote className="mt-2 text-sm text-white/70">{body}</blockquote>
        </figure>
    );
}
