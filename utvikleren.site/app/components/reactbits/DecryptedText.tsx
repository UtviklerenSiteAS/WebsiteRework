"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

interface DecryptedTextProps {
    text: string;
    speed?: number;
    maxIterations?: number;
    className?: string;
    revealDirection?: "start" | "end" | "center";
    useOriginalCharsOnly?: boolean;
    characters?: string;
    animateOn?: "view" | "hover";
    sequential?: boolean;
}

export default function DecryptedText({
    text,
    speed = 50,
    maxIterations = 20,
    className = "",
    characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()_+",
    animateOn = "hover",
    sequential = false,
}: DecryptedTextProps) {
    const [displayText, setDisplayText] = useState(text);
    const [isHovering, setIsHovering] = useState(false);
    const [isScrambling, setIsScrambling] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const scramble = () => {
        if (isScrambling) return;
        setIsScrambling(true);

        let iteration = 0;

        clearInterval(intervalRef.current as NodeJS.Timeout);

        intervalRef.current = setInterval(() => {
            setDisplayText((prevText) =>
                text
                    .split("")
                    .map((letter, index) => {
                        if (index < iteration) {
                            return text[index];
                        }
                        return characters[Math.floor(Math.random() * characters.length)];
                    })
                    .join("")
            );

            if (iteration >= text.length) {
                clearInterval(intervalRef.current as NodeJS.Timeout);
                setIsScrambling(false);
            }

            iteration += 1 / (maxIterations / text.length);
        }, speed);
    };

    useEffect(() => {
        if (animateOn === "view") {
            scramble();
        }
    }, [animateOn]);

    useEffect(() => {
        // Setup text initially
        setDisplayText(text);
    }, [text]);


    return (
        <motion.span
            className={className}
            onMouseEnter={() => {
                if (animateOn === "hover") scramble();
            }}
            onViewportEnter={() => {
                if (animateOn === "view") scramble();
            }}
        >
            {displayText}
        </motion.span>
    );
}
