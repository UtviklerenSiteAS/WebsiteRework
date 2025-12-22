"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { ArrowLeft, Bot, LayoutDashboard, FolderKanban, Settings, Menu, X, Video, BarChart3 } from "lucide-react";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";

interface MenuItem {
    label: string;
    icon: React.ReactNode;
    href: string;
    isBackButton?: boolean;
}

export default function DashboardSidebar() {
    const router = useRouter();
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const supabase = createClient();

    useEffect(() => {
        async function getUser() {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
        }
        getUser();
    }, [supabase]);

    const isAdmin = user?.email === 'post@utvikleren.site';

    const menuItems: MenuItem[] = [
        {
            label: "Gå tilbake",
            icon: <ArrowLeft size={20} />,
            href: "/",
            isBackButton: true,
        },
        {
            label: "Oversikt",
            icon: <LayoutDashboard size={20} />,
            href: "/dashboard",
        },
        ...(isAdmin ? [{
            label: "Admin Dashboard",
            icon: <BarChart3 size={20} />,
            href: "/dashboard/admin",
        }] : []),
        {
            label: "Nettside Prosjekter",
            icon: <FolderKanban size={20} />,
            href: "/dashboard/nettside-prosjekter",
        },
    ];

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed top-6 left-6 z-50 lg:hidden bg-white/10 border border-white/20 p-3 rounded-xl hover:bg-white/20 transition-colors"
                aria-label="Toggle menu"
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
                    fixed left-0 top-0 h-screen w-64 bg-black border-r border-white/10 flex flex-col z-40
                    transition-transform duration-300 ease-in-out
                    ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                `}
            >
                {/* Logo/Brand */}
                <div className="p-6 border-b border-white/10">
                    <h2 className="text-2xl font-bold tracking-tight">
                        <span className="text-white">Utvikleren</span>
                        <span className="text-gray-500">.site</span>
                    </h2>
                </div>

                {/* Menu Items */}
                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.href;
                        const isBack = item.isBackButton;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className={`
                                    group flex items-center gap-3 px-4 py-3 rounded-xl
                                    transition-all duration-200 relative overflow-hidden
                                    ${isActive
                                        ? 'bg-white/10 text-white'
                                        : isBack
                                            ? 'text-gray-400 hover:text-white hover:bg-white/5'
                                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                                    }
                                `}
                            >
                                {/* Hover gradient effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/5 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                {/* Active indicator */}
                                {isActive && (
                                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-purple-500 to-blue-500 rounded-r-full" />
                                )}

                                <span className="relative z-10 flex-shrink-0">
                                    {item.icon}
                                </span>
                                <span className="relative z-10 font-medium">
                                    {item.label}
                                </span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Footer/Version */}
                <div className="p-6 border-t border-white/10">
                    <p className="text-xs text-gray-500">Dashboard v1.0</p>
                </div>
            </aside>
        </>
    );
}
