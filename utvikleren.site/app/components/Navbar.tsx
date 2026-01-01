"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { User as SupabaseUser } from "@supabase/supabase-js";
import {
    Menu,
    X,
    ChevronDown,
    ChevronRight,
    Package,
    Layers,
    CreditCard,
    FileText,
    BookOpen,
    Download,
    User,
    Bot,
    FolderKanban,
    Settings,
    Contact,
    Phone,
    Loader2,
    Video,
    Smartphone
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AdminModal from "./ui/AdminModal";
import ServiceForm from "./forms/ServiceForm";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [user, setUser] = useState<SupabaseUser | null>(null);
    const [services, setServices] = useState<any[]>([]);
    const [loadingServices, setLoadingServices] = useState(true);
    const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const supabase = createClient();

    useEffect(() => {
        setMounted(true);
    }, []);

    // Icon Mapping Utility
    const IconMap: { [key: string]: any } = {
        'Bot': Bot,
        'FolderKanban': FolderKanban,
        'Settings': Settings,
        'Package': Package,
        'Layers': Layers,
        'CreditCard': CreditCard,
        'FileText': FileText,
        'BookOpen': BookOpen,
        'Download': Download,
        'User': User,
        'Contact': Contact,
        'Phone': Phone,
        'Video': Video,
        'Smartphone': Smartphone
    };

    const fetchServices = useCallback(async () => {
        setLoadingServices(true);
        try {
            const { data, error } = await supabase
                .from('services')
                .select('*')
                .order('order', { ascending: true });

            if (error) throw error;
            setServices(data || []);
        } catch (error) {
            console.error("Error fetching services:", error);
        } finally {
            setLoadingServices(false);
        }
    }, [supabase]);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        async function fetchUser() {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
        }
        fetchUser();
        fetchServices();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        return () => subscription.unsubscribe();
    }, [supabase, fetchServices]);

    const handleServiceSuccess = () => {
        setIsServiceModalOpen(false);
        fetchServices();
    };

    const navLinks = [
        {
            name: "Referanser",
            href: "/referanser",
            icon: Package
        },
        {
            name: "Tjenester",
            href: "/tjenester",
            icon: Layers,
            hasDropdown: true,
            megaMenu: {
                headline: "Lær hva AI kan gjøre for deg og din økonomi",
                subtext: "Oppdag ulike metoder og verktøy vi har for å hjelpe deg med å drive din bedrift",
                action: "Se oversikt",
                items: [
                    ...services
                        .filter(s =>
                            s.name.toLowerCase().includes('nettside') ||
                            s.name.toLowerCase().includes('app') ||
                            s.name.toLowerCase().includes('ai')
                        )
                        .map(s => ({
                            name: s.name,
                            href: s.href,
                            icon: IconMap[s.icon_name] || Layers
                        })),
                    // Ensure App Utvikling is always there if data might be missing
                    ...(services.some(s => s.name.toLowerCase().includes('app')) ? [] : [{
                        name: "App utvikling",
                        href: "/app-utvikling",
                        icon: Smartphone
                    }]),
                    // Add AI Chatbot if not already present
                    ...(services.some(s => s.name.toLowerCase().includes('chatbot') || s.name.toLowerCase().includes('resepsjonist')) ? [] : [{
                        name: "AI Chatbot",
                        href: "/ai-chatbot",
                        icon: Bot
                    }])
                ]
            }
        },
        {
            name: "Priser",
            href: "/priser",
            icon: CreditCard
        },
        {
            name: "Blog",
            href: "/blog",
            icon: FileText
        }
    ];

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent ${isScrolled ? "bg-black/80 backdrop-blur-md border-white/10" : "bg-transparent"
                }`}
            onMouseLeave={() => setActiveDropdown(null)}
        >
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between relative">

                {/* Left Section: Logo + Nav Links */}
                <div className="flex items-center gap-10">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3">
                        <Image
                            src="/assets/images/Logo.png"
                            alt="Logo"
                            width={40}
                            height={40}
                            className="h-8 w-8"
                            priority
                        />
                        <span className="text-xl font-medium tracking-tight text-white font-bold">Utvikleren.site</span>
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <div
                                key={link.name}
                                className="relative group h-16 flex items-center"
                                onMouseEnter={() => link.hasDropdown && setActiveDropdown(link.name)}
                            >
                                <Link
                                    href={link.hasDropdown ? "#" : link.href}
                                    onClick={(e) => {
                                        if (link.hasDropdown) {
                                            e.preventDefault();
                                            setActiveDropdown(activeDropdown === link.name ? null : link.name);
                                        }
                                    }}
                                    className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium transition-colors rounded-full ${activeDropdown === link.name
                                        ? "bg-white text-black"
                                        : "text-gray-300 hover:text-white hover:bg-white/10"
                                        }`}
                                >
                                    {link.name}
                                    {link.hasDropdown && <ChevronDown size={14} className={`transition-transform duration-200 ${activeDropdown === link.name ? "rotate-180" : ""}`} />}
                                </Link>

                                {/* Dropdown Logic */}
                                <AnimatePresence>
                                    {link.hasDropdown && activeDropdown === link.name && (
                                        <div className="absolute top-16 left-0 w-max">
                                            {link.megaMenu ? (
                                                /* Mega Menu Card */
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                    exit={{ opacity: 0, y: 5 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="bg-white rounded-3xl p-8 shadow-2xl w-[700px] text-black grid grid-cols-[1fr_1.5fr] gap-8"
                                                >
                                                    {/* Left Column */}
                                                    <div className="space-y-4">
                                                        <h3 className="text-2xl font-medium leading-tight tracking-tight">
                                                            {link.megaMenu.headline}
                                                        </h3>
                                                        <p className="text-gray-600 text-sm leading-relaxed">
                                                            {link.megaMenu.subtext}
                                                        </p>
                                                        <div className="flex items-center gap-2 pt-2">
                                                            <Link
                                                                href="/ai-fordeler"
                                                                onClick={() => setActiveDropdown(null)}
                                                                className="flex-1 px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-black text-sm font-medium rounded-full transition-colors text-center"
                                                            >
                                                                {link.megaMenu.action}
                                                            </Link>
                                                            {user?.email === 'post@utvikleren.site' && (
                                                                <button
                                                                    onClick={() => { setActiveDropdown(null); setIsServiceModalOpen(true); }}
                                                                    className="p-2.5 bg-black text-white rounded-full hover:bg-gray-800 transition-colors flex items-center justify-center shrink-0"
                                                                    title="Endre tjenester"
                                                                >
                                                                    <Settings size={18} />
                                                                </button>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div className="grid grid-flow-col grid-rows-3 gap-2">
                                                        {loadingServices && link.megaMenu.items.length === 0 ? (
                                                            <div className="col-span-2 flex items-center justify-center h-full">
                                                                <Loader2 className="w-6 h-6 animate-spin text-gray-200" />
                                                            </div>
                                                        ) : link.megaMenu.items.map((item) => (
                                                            <Link
                                                                key={item.name}
                                                                href={item.href}
                                                                className="group/item flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors whitespace-nowrap"
                                                            >
                                                                <div className="flex items-center gap-3">
                                                                    <div className="p-2 bg-gray-100 rounded-lg group-hover/item:bg-white border border-transparent group-hover/item:border-gray-200 transition-colors">
                                                                        <item.icon size={18} className="text-gray-700" />
                                                                    </div>
                                                                    <span className="font-medium text-gray-900 text-sm">{item.name}</span>
                                                                </div>
                                                                <ChevronRight size={16} className="text-gray-400 group-hover/item:text-black transition-colors" />
                                                            </Link>
                                                        ))}
                                                    </div>
                                                </motion.div>
                                            ) : (
                                                /* Standard Dropdown (Resources) */
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: 5 }}
                                                    className="bg-white rounded-2xl p-2 shadow-xl w-48 overflow-hidden text-black"
                                                >
                                                </motion.div>
                                            )}
                                        </div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Section: Actions */}
                <div className="hidden md:flex items-center gap-3">
                    {user ? (
                        <Link href="/dashboard" className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-white hover:text-gray-300 transition-colors">
                            <User size={16} />
                            Dashboard
                        </Link>
                    ) : (
                        <Link href="/login" className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-white hover:text-gray-300 transition-colors">
                            <User size={16} />
                            Logg inn
                        </Link>
                    )}
                    <Link
                        href="/kontakt"
                        className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors"
                    >
                        <Phone size={16} />
                        Kontakt meg
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden text-white p-1"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            <AnimatePresence>
                {mounted && isMobileMenuOpen && (
                    <MobileMenuOverlay
                        navLinks={navLinks}
                        activeDropdown={activeDropdown}
                        setActiveDropdown={setActiveDropdown}
                        setIsMobileMenuOpen={setIsMobileMenuOpen}
                        user={user}
                    />
                )}
            </AnimatePresence>

            {/* Admin Modal */}
            <AdminModal
                isOpen={isServiceModalOpen}
                onClose={() => setIsServiceModalOpen(false)}
                title="Administrer Tjenester"
            >
                <ServiceForm onSuccess={handleServiceSuccess} />
            </AdminModal>
        </nav>
    );
}

// Separate component for the overlay to keep logic clean and enable easier portalling if we moved strictly to a component structure,
// but for now we'll inline the portal usage or just define a helper.
// Actually, let's keep it simple and just Portal the content directly inside the main component return if possible,
// but createPortal needs a DOM node.
// To handle SSR, we check for window/document inside the render or effect?
// Actually, standard practice is to put the createPortal check in the render.

import { createPortal } from "react-dom";

function MobileMenuOverlay({ navLinks, activeDropdown, setActiveDropdown, setIsMobileMenuOpen, user }: any) {
    if (typeof document === "undefined") return null;

    return createPortal(
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-black text-white flex flex-col" // Dark theme
        >
            {/* Mobile Header */}
            <div className="h-16 flex items-center justify-between px-6 border-b border-white/10">
                <Link href="/" className="text-xl font-bold tracking-tight text-white flex items-center gap-3" onClick={() => setIsMobileMenuOpen(false)}>
                    <img
                        src="/assets/images/Logo.png"
                        alt="Logo"
                        width={32}
                        height={32}
                        className="h-8 w-8 object-contain"
                    />
                    <span>Utvikleren.site</span>
                </Link>
                <button
                    className="p-2 -mr-2 text-white hover:bg-white/10 rounded-full transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                >
                    <X size={24} />
                </button>
            </div>

            {/* Mobile Content */}
            <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                    {navLinks.map((link: any) => (
                        <div key={link.name} className="border-b border-white/5 last:border-0 pb-2 last:pb-0">
                            <div
                                className="flex items-center justify-between py-3 text-lg font-medium text-white"
                                onClick={() => {
                                    if (link.hasDropdown) {
                                        setActiveDropdown(activeDropdown === link.name ? null : link.name);
                                    } else {
                                        setIsMobileMenuOpen(false);
                                    }
                                }}
                            >
                                <Link
                                    href={link.href}
                                    className="flex items-center gap-3"
                                    onClick={(e) => {
                                        if (link.hasDropdown) {
                                            e.preventDefault();
                                        } else {
                                            setIsMobileMenuOpen(false);
                                        }
                                    }}
                                >
                                    <link.icon size={20} className="text-gray-400" />
                                    {link.name}
                                </Link>
                                {link.hasDropdown && (
                                    <ChevronDown
                                        size={16}
                                        className={`text-gray-500 transition-transform duration-200 ${activeDropdown === link.name ? "rotate-180" : ""}`}
                                    />
                                )}
                            </div>

                            {/* Mobile Submenu accordion */}
                            <AnimatePresence>
                                {link.hasDropdown && activeDropdown === link.name && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="pl-4 pb-4 pt-1 flex flex-col gap-2">
                                            {link.megaMenu ? (
                                                <>
                                                    <div className="mb-4 p-4 bg-white/5 border border-white/10 rounded-xl">
                                                        <p className="font-medium text-white mb-1">{link.megaMenu.headline}</p>
                                                        <p className="text-sm text-gray-400 mb-3">{link.megaMenu.subtext}</p>
                                                        <Link
                                                            href="/ai-fordeler"
                                                            onClick={() => setIsMobileMenuOpen(false)}
                                                            className="inline-block text-xs font-semibold bg-white text-black px-3 py-1.5 rounded-lg"
                                                        >
                                                            {link.megaMenu.action}
                                                        </Link>
                                                    </div>
                                                    {link.megaMenu.items.map((item: any) => (
                                                        <Link
                                                            key={item.name}
                                                            href={item.href}
                                                            className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
                                                            onClick={() => setIsMobileMenuOpen(false)}
                                                        >
                                                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                                                                <item.icon size={14} className="text-gray-300" />
                                                            </div>
                                                            <span className="text-sm font-medium">{item.name}</span>
                                                        </Link>
                                                    ))}
                                                </>
                                            ) : (
                                                link.dropdownItems?.map((item: any) => (
                                                    <Link
                                                        key={item.name}
                                                        href={item.href}
                                                        className="block px-3 py-2 text-base text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                                                        onClick={() => setIsMobileMenuOpen(false)}
                                                    >
                                                        {item.name}
                                                    </Link>
                                                ))
                                            )}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>

                {/* Mobile Actions */}
                <div className="mt-auto pt-6 flex flex-col gap-3">
                    {user ? (
                        <Link
                            href="/dashboard"
                            className="w-full h-12 flex items-center justify-center gap-2 rounded-full border border-white/10 text-white font-medium text-base hover:bg-white/5 transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <User size={18} />
                            Dashboard
                        </Link>
                    ) : (
                        <Link
                            href="/login"
                            className="w-full h-12 flex items-center justify-center gap-2 rounded-full border border-white/10 text-white font-medium text-base hover:bg-white/5 transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <User size={18} />
                            Logg inn
                        </Link>
                    )}
                    <Link
                        href="/kontakt"
                        className="w-full h-12 flex items-center justify-center gap-2 bg-white text-black rounded-full font-medium text-base hover:bg-gray-100 transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Kontakt meg
                    </Link>
                </div>
            </div>
        </motion.div>,
        document.body
    );
}
