"use client";

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { ArrowRight, Check, Loader2, Plus, Edit, Settings } from "lucide-react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import AdminModal from "../components/ui/AdminModal";
import PricingPlanForm from "../components/forms/PricingPlanForm";

interface Plan {
    id: string;
    category: string;
    name: string;
    price: string;
    old_price: string;
    sub_price: string;
    features: string[];
    highlight: boolean;
    order: number;
}

export default function PricingPage() {
    const [plans, setPlans] = useState<Plan[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
    const supabase = createClient();

    const fetchData = useCallback(async () => {
        try {
            const { data, error } = await supabase
                .from('pricing_plans')
                .select('*')
                .order('order', { ascending: true });

            if (error) throw error;
            setPlans(data || []);
        } catch (error) {
            console.error("Error fetching pricing plans:", error);
        } finally {
            setLoading(false);
        }
    }, [supabase]);

    useEffect(() => {
        async function init() {
            await fetchData();
            // Check admin
            const { data: { user } } = await supabase.auth.getUser();
            if (user?.email === 'post@utvikleren.site') {
                setIsAdmin(true);
            }
        }
        init();
    }, [fetchData, supabase]);

    const handleEdit = (plan: Plan) => {
        setSelectedPlan(plan);
        setIsModalOpen(true);
    };

    const handleCreate = () => {
        setSelectedPlan(null);
        setIsModalOpen(true);
    };

    const handleSuccess = () => {
        setIsModalOpen(false);
        fetchData(); // Refresh list
    };

    // Group plans by category
    const categories = Array.from(new Set(plans.map(p => p.category)));

    return (
        <div className="bg-black text-white min-h-screen font-sans selection:bg-white selection:text-black">
            <Navbar />

            <div className="max-w-[1200px] mx-auto px-6 pb-40">
                {/* Header */}
                <header className="pt-40 pb-24 border-b border-white/20 flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div>
                        <h1 className="text-8xl font-medium tracking-tighter mb-8">
                            Priser
                        </h1>
                        <p className="text-2xl text-gray-400 max-w-2xl font-light leading-relaxed mb-8">
                            Tydelige priser. Ingen skjulte kostnader.<br />
                            Velg løsningen som passer din bedrift.
                        </p>
                        <div className="inline-block px-4 py-2 bg-white text-black text-sm font-bold rounded-full animate-pulse">
                            SÆRTILBUD: -30% Rabatt mot referanse
                        </div>
                    </div>

                    {isAdmin && (
                        <button
                            onClick={handleCreate}
                            className="group flex items-center gap-2 px-6 py-3 bg-white text-black font-medium rounded-full hover:bg-gray-200 transition-all hover:scale-105"
                        >
                            <Plus size={18} />
                            Ny plan
                        </button>
                    )}
                </header>

                <div className="divide-y divide-white/10">
                    {loading ? (
                        <div className="flex justify-center py-20">
                            <Loader2 className="w-10 h-10 animate-spin text-white/20" />
                        </div>
                    ) : categories.length > 0 ? (
                        categories.map(category => (
                            <PricingSection
                                key={category}
                                category={category}
                                description={category === 'Nettside Utvikling' ? "Fra enkle landingssider til skreddersydde plattformer." : "Skreddersydde løsninger for din bedrift."}
                            >
                                {plans.filter(p => p.category === category).map(plan => (
                                    <div 
                                        key={plan.id} 
                                        className="relative group cursor-pointer"
                                        onClick={() => isAdmin && handleEdit(plan)}
                                    >
                                        <PricingRow
                                            name={plan.name}
                                            oldPrice={plan.old_price}
                                            price={plan.price}
                                            subPrice={plan.sub_price}
                                            features={plan.features}
                                            highlight={plan.highlight}
                                        />
                                        {isAdmin && (
                                            <button
                                                onClick={(e) => { e.stopPropagation(); handleEdit(plan); }}
                                                className={`absolute top-4 right-4 z-10 p-2 rounded-full border opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all ${plan.highlight ? 'bg-black/5 border-black/10 text-black hover:bg-black hover:text-white' : 'bg-white/5 border-white/10 text-white hover:bg-white hover:text-black'}`}
                                            >
                                                <Edit size={16} />
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </PricingSection>
                        ))
                    ) : (
                        <div className="py-20 text-center text-gray-500">
                            <p className="text-xl">Ingen prisplaner funnet ennå.</p>
                        </div>
                    )}
                </div>

                <div className="pt-24 flex justify-center">
                    <Link
                        href="/#contact"
                        className="group inline-flex items-center gap-3 text-2xl font-medium border-b border-white pb-1 hover:text-gray-300 transition-colors"
                    >
                        Start et prosjekt
                        <ArrowRight className="transition-transform group-hover:translate-x-2" />
                    </Link>
                </div>
            </div>

            {/* Admin Modal */}
            <AdminModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={selectedPlan ? `Endre: ${selectedPlan.name}` : "Opprett ny prisplan"}
            >
                <PricingPlanForm
                    initialData={selectedPlan}
                    onSuccess={handleSuccess}
                />
            </AdminModal>
        </div>
    );
}

// Components

function PricingSection({ category, description, children }: any) {
    return (
        <section className="py-20 grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
                <h2 className="text-3xl font-medium tracking-tight mb-4 text-white">{category}</h2>
                <p className="text-gray-500 text-lg leading-relaxed">{description}</p>
            </div>
            <div className="md:col-span-8 flex flex-col gap-6">
                {children}
            </div>
        </section>
    );
}

function PricingRow({ name, price, oldPrice, subPrice, features, highlight }: any) {
    return (
        <div className={`p-6 md:p-8 border border-white/10 ${highlight ? 'bg-white text-black border-white' : 'bg-transparent text-white hover:border-white/30'} transition-colors grid grid-cols-1 md:grid-cols-2 gap-6 items-center`}>

            {/* Context */}
            <div>
                <h3 className={`text-xl font-medium mb-1 ${highlight ? 'text-black' : 'text-white'}`}>{name}</h3>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm opacity-70 mb-4 md:mb-0">
                    {features.map((f: string, i: number) => (
                        <span key={i}>• {f}</span>
                    ))}
                </div>
            </div>

            {/* Price */}
            <div className="text-left md:text-right">
                <div className="flex flex-col md:items-end">
                    {oldPrice && (
                        <span className={`text-sm line-through opacity-50 ${highlight ? 'text-black' : 'text-gray-400'}`}>
                            {oldPrice}
                        </span>
                    )}
                    <div className="text-3xl md:text-4xl font-medium tracking-tight whitespace-nowrap">
                        {price}
                    </div>
                </div>
                <div className={`text-sm md:text-base font-medium opacity-60`}>
                    {subPrice}
                </div>
            </div>

        </div>
    );
}
