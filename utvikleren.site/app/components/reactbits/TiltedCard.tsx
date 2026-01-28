"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface TiltedCardProps {
    children: React.ReactNode;
    className?: string;
    rotateAmplitude?: number;
    scaleOnHover?: number;
}

const TiltedCard: React.FC<TiltedCardProps> = ({
    children,
    className = "",
    rotateAmplitude = 15,
    scaleOnHover = 1.05
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useTransform(y, [-0.5, 0.5], [rotateAmplitude, -rotateAmplitude]);
    const rotateY = useTransform(x, [-0.5, 0.5], [-rotateAmplitude, rotateAmplitude]);

    // Smooth springs
    const springConfig = { damping: 30, stiffness: 400 };
    const rotateXSpring = useSpring(rotateX, springConfig);
    const rotateYSpring = useSpring(rotateY, springConfig);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        // Calculate normalized mouse position from center (-0.5 to 0.5)
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = (mouseX / width) - 0.5;
        const yPct = (mouseY / height) - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX: rotateXSpring,
                rotateY: rotateYSpring,
                transformStyle: "preserve-3d",
            }}
            whileHover={{ scale: scaleOnHover }}
            className={`relative ${className}`}
        >
            {children}
        </motion.div>
    );
};

export default TiltedCard;
