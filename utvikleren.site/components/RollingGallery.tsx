"use client";

import React, { useEffect, useState, useRef } from "react";
import {
    motion,
    useMotionValue,
    useAnimation,
    useTransform,
    PanInfo,
} from "framer-motion";

interface RollingGalleryProps {
    autoplay?: boolean;
    pauseOnHover?: boolean;
    images: string[];
}

const RollingGallery: React.FC<RollingGalleryProps> = ({
    autoplay = true,
    pauseOnHover = true,
    images = [],
}) => {
    const [isScreenMobile, setIsScreenMobile] = useState(false);

    // Fixed measurements
    const cardWidth = 260;
    const cardGap = isScreenMobile ? 90 : 130;  // Wider gap on desktop

    // Dynamic calculations
    const faceCount = images.length;
    // Calculate radius to fit all cards with gap: Circumference = faceCount * (cardWidth + cardGap)
    // Radius = Circumference / 2PI
    // Calculate radius to fit all cards with gap
    // Radius = Circumference / 2PI
    const calculatedRadius = (faceCount * (cardWidth + cardGap)) / (2 * Math.PI);
    const radius = Math.max(calculatedRadius, isScreenMobile ? 200 : 300); // Reduced min radius

    // Cylinder width is just derived from radius for consistency
    const cylinderWidth = 2 * Math.PI * radius;
    const faceWidth = cylinderWidth / faceCount;
    const rotation = useMotionValue(0);
    const controls = useAnimation();
    const autoplayRef = useRef<NodeJS.Timeout>();

    useEffect(() => {
        const checkMobile = () => {
            setIsScreenMobile(window.innerWidth <= 768);
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const handleDrag = (_: any, info: PanInfo) => {
        const panFactor = 0.05; // Adjust sensitivity
        rotation.set(rotation.get() + info.delta.x * panFactor);
    };

    const handleDragEnd = (_: any, info: PanInfo) => {
        const velocityFactor = 0.02; // Adjust controls inertia
        controls.start({
            rotateY: rotation.get() + info.velocity.x * velocityFactor,
            transition: { type: "spring", stiffness: 50, damping: 20 },
        });
    };

    useEffect(() => {
        if (autoplay) {
            const startAutoplay = () => {
                const currentRotation = rotation.get();
                // Constant rotation speed
                controls.start({
                    rotateY: currentRotation - 360,
                    transition: {
                        duration: 60, // Slower rotation (seconds per revolution)
                        ease: "linear",
                        repeat: Infinity
                    }
                });
            };

            startAutoplay();

            // Sync rotation value to prevent jumps if autoplay restarts
            const unsubscribe = rotation.on("change", (latest) => {
                // Keep value normalized if needed, but framer motion handles large values fine
            });

            return () => {
                controls.stop();
                unsubscribe();
            };
        }
    }, [autoplay, controls, rotation]);

    const handleMouseEnter = () => {
        if (autoplay && pauseOnHover) {
            controls.stop();
        }
    };

    const handleMouseLeave = () => {
        if (autoplay && pauseOnHover) {
            // Resume rotation from current point
            const currentRotation = rotation.get();
            controls.start({
                rotateY: currentRotation - 360,
                transition: {
                    duration: 60,
                    ease: "linear",
                    repeat: Infinity
                }
            });
        }
    };

    return (
        <div className="relative w-full h-[500px] flex items-center justify-center overflow-hidden perspective-[1000px]">
            {/* Gradient overlays for depth fading at edges */}
            <div className="absolute left-0 top-0 bottom-0 w-[100px] bg-gradient-to-r from-[#030303] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-[100px] bg-gradient-to-l from-[#030303] to-transparent z-10 pointer-events-none" />

            <motion.div
                onPan={handleDrag}
                onPanEnd={handleDragEnd}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                animate={controls}
                style={{
                    transformStyle: "preserve-3d",
                    transform: `rotateY(${rotation.get()}deg) translateZ(${-radius}px)`, // Use native transform for complex composition if needed, but framer motion handles rotateY separately
                    rotateY: rotation,
                    // We need to apply the Z offset. 
                    // Since rotateY is handled by motion value, we can try adding z: -radius?
                    // Or translateZ: -radius.
                    z: -radius * 0.9, // Push back by radius (scaled slightly to keep it popped)
                    width: cylinderWidth,
                    position: "relative",
                    display: "flex", // Keep items in a row conceptually
                    cursor: "grab",
                }}
                whileTap={{ cursor: "grabbing" }}
                className="h-[300px]" // Face height
            >
                {images.map((imgUrl, i) => {
                    // Calculate angle for each face
                    // i * (360 / faceCount)
                    const angle = (360 / faceCount) * i;

                    return (
                        <div
                            key={i}
                            style={{
                                position: "absolute",
                                left: "50%",
                                top: "50%",
                                width: `${260}px`, // Fixed card width
                                height: `${340}px`, // Fixed card height
                                marginLeft: `-${130}px`, // Center offset (width/2)
                                marginTop: `-${170}px`, // Center offset (height/2)
                                transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                                backfaceVisibility: "hidden", // Or visible if we want to see back
                            }}
                            className="rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_15px_rgba(0,0,0,0.5)] bg-[#0A0A0A] group"
                        >
                            {/* Image */}
                            <img
                                src={imgUrl}
                                alt={`Gallery Item ${i}`}
                                draggable={false}
                                onDragStart={(e) => e.preventDefault()}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 select-none pointer-events-none"
                            />

                            {/* Overlay on hover */}
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <span className="text-white font-medium px-4 py-2 border border-white/30 rounded-full backdrop-blur-sm select-none">
                                    Se Prosjekt
                                </span>
                            </div>
                        </div>
                    );
                })}
            </motion.div>
        </div>
    );
};

export default RollingGallery;
