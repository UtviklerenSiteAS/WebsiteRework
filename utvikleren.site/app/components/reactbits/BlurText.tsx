"use client";

import { motion } from "framer-motion";
import React from "react";

interface BlurTextProps {
    text: string;
    className?: string;
    delay?: number;
    wordDelay?: number;
}

const BlurText: React.FC<BlurTextProps> = ({ text, className = "", delay = 0, wordDelay = 0.05 }) => {
    const words = text.split(" ");

    return (
        <span className={`inline-block ${className}`}>
            {words.map((word, i) => (
                <span key={i} className="inline-block mr-[0.2em] whitespace-nowrap">
                    {word.split("").map((char, j) => (
                        <motion.span
                            key={j}
                            initial={{ filter: "blur(10px)", opacity: 0, y: 5 }}
                            animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.4,
                                delay: delay + i * wordDelay + j * 0.02,
                                ease: "easeOut",
                            }}
                            className="inline-block"
                        >
                            {char}
                        </motion.span>
                    ))}
                </span>
            ))}
        </span>
    );
};

export default BlurText;
