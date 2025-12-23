"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { 
    ArrowLeft, 
    LayoutDashboard, 
    FolderKanban, 
    Settings, 
    Menu, 
    X, 
    LogOut, 
    BarChart3,
    User as UserIcon,
    Shield,
    MessageSquare,
    Zap
} from "lucide-react";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import Image from "next/image";

interface MenuItem {
    label: string;
    icon: React.ReactNode;
    href: string;
    isAdminOnly?: boolean;
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
            label: "Oversikt",
            icon: <LayoutDashboard size={20} />,
            href: "/dashboard",
        },
        {
            label: "Prosjekter",
            icon: <FolderKanban size={20} />,
            href: "/dashboard/nettside-prosjekter",
        },
        {
            label: "AI Resepsjonist",
            icon: <Zap size={20} />,
            href: "/dashboard/ai-resepsjonist",
        },
        {
            label: "Systemforvaltning",
            icon: <Shield size={20} />,
            href: "/dashboard/systemforvaltning",
        },
        {
            label: "Admin",
            icon: <BarChart3 size={20} />,
            href: "/dashboard/admin",
            isAdminOnly: true,
        },
    ];

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.push("/");
        router.refresh();
    };

    return (
        <>
            {/* Mobile Menu Toggle */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed top-5 left-5 z-[60] lg:hidden bg-white/5 backdrop-blur-xl border border-white/10 p-3 rounded-2xl text-white hover:bg-white/10 transition-all active:scale-95 shadow-2xl"
                aria-label="Toggle menu"
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
                    fixed left-0 top-0 h-screen w-64 bg-black/40 backdrop-blur-2xl border-r border-white/5 flex flex-col z-50
                    transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
                    ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                `}
            >
                {/* Brand */}
                <div className="p-10 pb-12">
                    <Link href="/" className="group flex items-center gap-3">
                        <Image 
                            src="/assets/images/Logo.png" 
                            alt="Logo" 
                            width={32} 
                            height={32} 
                            className="h-8 w-8"
                        />
                        <h2 className="text-xl font-bold tracking-tight text-white">Utvikleren.site</h2>
                    </Link>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-8 space-y-1 overflow-y-auto custom-scrollbar">
                    {menuItems.map((item) => {
                        if (item.isAdminOnly && !isAdmin) return null;
                        
                        const isActive = pathname === item.href;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className={`
                                    group flex items-center gap-4 py-3 rounded-2xl
                                    transition-all duration-300 relative
                                    ${isActive
                                        ? 'text-white'
                                        : 'text-gray-500 hover:text-white'
                                    }
                                `}
                            >
                                <span className={`relative z-10 transition-all duration-500 ${isActive ? 'scale-110' : 'group-hover:scale-110 opacity-60 group-hover:opacity-100'}`}>
                                    {item.icon}
                                </span>
                                <span className="relative z-10 font-medium tracking-tight text-sm">
                                    {item.label}
                                </span>
                                {isActive && (
                                    <motion.div 
                                        layoutId="active-nav-bg"
                                        className="absolute -inset-x-2 inset-y-0 bg-white/5 rounded-2xl -z-0"
                                        transition={{ type: "spring", bounce: 0, duration: 0.6 }}
                                    />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* Footer User Section */}
                <div className="p-8 pt-6 mt-auto border-t border-white/5">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 text-sm font-bold">
                            {user?.user_metadata?.full_name?.[0] || user?.email?.[0]?.toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-white truncate leading-none mb-1">
                                {user?.user_metadata?.full_name?.split(' ')[0] || 'Bruker'}
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                                Pro Member
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={handleSignOut}
                        className="w-full flex items-center justify-center gap-3 py-3 rounded-2xl text-xs font-bold text-gray-500 hover:text-white hover:bg-red-500/10 hover:text-red-500 transition-all active:scale-95 group"
                    >
                        <LogOut size={16} />
                        Logg ut
                    </button>
                </div>
            </aside>
        </>
    );
}

// Minimal framer motion mock if not installed, but usually project has it.
import { motion } from "framer-motion";
