"use client";

import { useEffect, useRef } from "react";

export default function AiPlasmaAnimation() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let time = 0;

        const resize = () => {
            if (canvas.parentElement) {
                canvas.width = canvas.parentElement.clientWidth;
                canvas.height = canvas.parentElement.clientHeight;
            }
        };

        window.addEventListener("resize", resize);
        resize();

        // Particles
        const particles: { x: number; y: number; vx: number; vy: number; size: number; alpha: number }[] = [];
        const particleCount = 50;

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 1.5, // Faster movement
                vy: (Math.random() - 0.5) * 1.5,
                size: Math.random() * 3 + 2, // Larger particles
                alpha: Math.random() * 0.5 + 0.5, // Higher opacity
            });
        }

        const render = () => {
            time += 0.005;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Create organic moving blobs - STRONGER OPACITY
            const drawBlob = (x: number, y: number, radius: number, color: string) => {
                ctx.beginPath();
                const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
                gradient.addColorStop(0, color);
                gradient.addColorStop(1, "rgba(0,0,0,0)");
                ctx.fillStyle = gradient;
                ctx.arc(x, y, radius, 0, Math.PI * 2);
                ctx.fill();
            };

            // Oscillating blobs
            const cx = canvas.width / 2;
            const cy = canvas.height / 2;

            // Blob 1 (Cyan/Blue) - Increased Opacity
            drawBlob(
                cx + Math.cos(time) * 100,
                cy + Math.sin(time * 1.5) * 80,
                300,
                "rgba(0, 200, 255, 0.4)" // Was 0.15
            );

            // Blob 2 (Purple) - Increased Opacity
            drawBlob(
                cx + Math.sin(time * 0.8) * 120,
                cy + Math.cos(time * 1.2) * 100,
                250,
                "rgba(140, 0, 255, 0.4)" // Was 0.15
            );

            // Blob 3 (White/Pink glow) - Increased Opacity
            drawBlob(
                cx + Math.cos(time * 1.3) * 150,
                cy + Math.sin(time * 0.9) * 120,
                200,
                "rgba(255, 100, 255, 0.3)" // Was 0.1
            );


            // Draw Particles & Connections
            ctx.strokeStyle = "rgba(100, 200, 255, 0.2)"; // Stronger lines
            ctx.lineWidth = 1;

            particles.forEach((p, index) => {
                p.x += p.vx;
                p.y += p.vy;

                // Bounce
                if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

                // Draw Particle
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(200, 230, 255, ${p.alpha})`; // Higher alpha from init
                ctx.fill();

                // Connect nearby particles
                for (let j = index + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 150) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `rgba(100, 200, 255, ${0.4 * (1 - dist / 150)})`; // More visible lines
                        ctx.stroke();
                    }
                }
            });

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="w-full h-full min-h-[400px]"
        />
    );
}
