import { cn } from "@/lib/utils";

interface SafariProps {
    url?: string;
    className?: string;
    children?: React.ReactNode;
}

export function Safari({ url = "dinbedrift.no", className, children }: SafariProps) {
    return (
        <div className={cn("overflow-hidden rounded-xl border border-border bg-background shadow-2xl", className)}>
            {/* Safari Chrome */}
            <div className="flex items-center gap-2 border-b border-border bg-muted/40 px-4 py-3">
                {/* Traffic Lights */}
                <div className="flex gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                    <div className="h-3 w-3 rounded-full bg-[#febc2e]" />
                    <div className="h-3 w-3 rounded-full bg-[#28c840]" />
                </div>

                {/* URL Bar */}
                <div className="flex-1 flex justify-center">
                    <div className="flex items-center gap-2 rounded-lg bg-background border border-border px-4 py-1.5 min-w-[200px] max-w-[400px] w-full justify-center shadow-sm">
                        {/* Lock icon */}
                        <svg
                            className="h-3 w-3 text-muted-foreground"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                            />
                        </svg>
                        <span className="text-xs text-muted-foreground">{url}</span>
                    </div>
                </div>

                {/* Spacer for symmetry */}
                <div className="w-[52px]" />
            </div>

            {/* Content Area */}
            <div className="relative bg-background">
                {children}
            </div>
        </div>
    );
}

interface IPhoneProps {
    className?: string;
    children?: React.ReactNode;
}

export function IPhone({ className, children }: IPhoneProps) {
    return (
        <div className={cn("relative mx-auto w-[280px]", className)}>
            {/* Phone Frame */}
            <div className="overflow-hidden rounded-[2.5rem] border-[3px] border-zinc-700 bg-zinc-900 shadow-2xl">
                {/* Notch */}
                <div className="relative flex justify-center py-2 bg-zinc-900">
                    <div className="h-[22px] w-[100px] rounded-full bg-zinc-800" />
                </div>

                {/* Screen */}
                <div className="relative overflow-hidden bg-zinc-950">
                    {children}
                </div>

                {/* Home Indicator */}
                <div className="flex justify-center py-3 bg-zinc-900">
                    <div className="h-1 w-28 rounded-full bg-zinc-700" />
                </div>
            </div>
        </div>
    );
}
