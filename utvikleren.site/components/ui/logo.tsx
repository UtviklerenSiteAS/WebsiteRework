import React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface LogoProps {
    className?: string;
    wordmark?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className, wordmark = true }) => {
    return (
        <div className={cn("flex items-center gap-3 select-none", className)}>
            {/* Icon Mark: Logo Image */}
            <div className="relative h-8 w-8 flex items-center justify-center">
                <Image
                    src="/logo.png"
                    alt="Utvikleren Logo"
                    width={32}
                    height={32}
                    className="object-contain"
                />
            </div>

            {/* Wordmark: Bold + Light style like PARAL DYNAMIC */}
            {wordmark && (
                <span className="text-xl tracking-wide flex items-baseline">
                    <span className="font-bold text-foreground">UTVIKLEREN</span>
                    <span className="font-light text-muted-foreground ml-0.5">SITE</span>
                </span>
            )}
        </div>
    );
};

export default Logo;
