"use client";

import { useState, useEffect } from "react";

interface TypewriterProps {
    text: string[];
    speed?: number;
    waitTime?: number;
    className?: string;
    cursorClassName?: string;
}

export default function Typewriter({
    text,
    speed = 100,
    waitTime = 3000,
    className = "",
    cursorClassName = "",
}: TypewriterProps) {
    const [displayText, setDisplayText] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [textIndex, setTextIndex] = useState(0);

    useEffect(() => {
        const currentText = text[textIndex % text.length];

        const timeout = setTimeout(() => {
            if (!isDeleting) {
                // Typing
                if (currentIndex < currentText.length) {
                    setDisplayText((prev) => prev + currentText[currentIndex]);
                    setCurrentIndex((prev) => prev + 1);
                } else {
                    // Finished typing, wait before deleting
                    setTimeout(() => setIsDeleting(true), waitTime);
                }
            } else {
                // Deleting
                if (currentIndex > 0) {
                    setDisplayText((prev) => prev.slice(0, -1));
                    setCurrentIndex((prev) => prev - 1);
                } else {
                    // Finished deleting, move to next text
                    setIsDeleting(false);
                    setTextIndex((prev) => prev + 1);
                }
            }
        }, isDeleting ? speed / 2 : speed);

        return () => clearTimeout(timeout);
    }, [currentIndex, isDeleting, text, textIndex, speed, waitTime]);

    return (
        <span className={className}>
            {displayText}
            <span className={`${cursorClassName} animate-pulse`}>|</span>
        </span>
    );
}
