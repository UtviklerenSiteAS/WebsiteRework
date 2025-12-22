"use client";

import { Bot, TabletSmartphone, Globe } from "lucide-react";
import ServiceCard from "./ServiceCard";
import { motion } from "framer-motion";

export default function Services() {
    const services = [
        {
            title: "AI Receptionist",
            description:
                "Intelligent automated customer service that handles inquiries 24/7 with a human touch.",
            icon: Bot,
        },
        {
            title: "App Development",
            description:
                "High-performance native and cross-platform applications for iOS and Android.",
            icon: TabletSmartphone,
        },
        {
            title: "Websites",
            description:
                "Modern, responsive websites tailored to your needs.",
            icon: Globe,
            subItems: ["One Pager", "Basic", "Medium", "Advanced"],
        },
    ];

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 },
    };

    return (
        <section className="max-w-7xl mx-auto px-4 pb-32">
            <motion.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-3xl font-bold text-white mb-10 text-center"
            >
                Services
            </motion.h2>
            <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
                {services.map((service) => (
                    <motion.div key={service.title} variants={item}>
                        <ServiceCard
                            title={service.title}
                            description={service.description}
                            icon={service.icon}
                            subItems={service.subItems}
                        />
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
}
