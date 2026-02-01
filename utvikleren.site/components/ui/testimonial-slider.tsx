"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface Testimonial {
    img: string;
    quote: string;
    name: string;
    role: string;
}

interface TestimonialSliderProps {
    testimonials: Testimonial[];
    className?: string;
    autoplay?: boolean;
    interval?: number;
}

export default function TestimonialSlider({
    testimonials,
    className,
    autoplay = true,
    interval = 5000,
}: TestimonialSliderProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (!autoplay) return;

        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        }, interval);

        return () => clearInterval(timer);
    }, [autoplay, interval, testimonials.length]);

    return (
        <div className={cn("relative w-full max-w-4xl mx-auto px-4", className)}>
            <div className="relative min-h-[400px] flex items-center justify-center">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="flex flex-col items-center text-center gap-8"
                    >


                        {/* Quote */}
                        <p className="text-2xl md:text-4xl font-light leading-relaxed text-white tracking-tight">
                            &quot;{testimonials[currentIndex].quote}&quot;
                        </p>

                        {/* Author */}
                        <div className="flex flex-col items-center gap-4 mt-4">
                            <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-white/10">
                                <img
                                    src={testimonials[currentIndex].img}
                                    alt={testimonials[currentIndex].name}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            <div className="space-y-1">
                                <h3 className="text-lg font-medium text-white">
                                    {testimonials[currentIndex].name}
                                </h3>
                                <p className="text-sm text-white/50 font-mono">
                                    {testimonials[currentIndex].role}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Indicators */}
            <div className="flex justify-center gap-2 mt-8">
                {testimonials.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={cn(
                            "w-2 h-2 rounded-full transition-all duration-300",
                            index === currentIndex
                                ? "bg-white w-6"
                                : "bg-white/20 hover:bg-white/40"
                        )}
                        aria-label={`Go to testimonial ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}
