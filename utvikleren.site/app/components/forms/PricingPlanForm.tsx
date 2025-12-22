"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Loader2, Save, Trash2 } from "lucide-react";

interface PricingPlanFormProps {
    initialData?: any;
    onSuccess: () => void;
}

export default function PricingPlanForm({ initialData, onSuccess }: PricingPlanFormProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const supabase = createClient();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        const data = {
            category: formData.get("category") as string,
            name: formData.get("name") as string,
            price: formData.get("price") as string,
            old_price: formData.get("old_price") as string,
            sub_price: formData.get("sub_price") as string,
            features: (formData.get("features") as string).split(",").map(f => f.trim()).filter(f => f !== ""),
            highlight: formData.get("highlight") === "on",
            order: parseInt(formData.get("order") as string) || 0,
        };

        try {
            if (initialData?.id) {
                const { error: updateError } = await supabase
                    .from("pricing_plans")
                    .update(data)
                    .eq("id", initialData.id);
                if (updateError) throw updateError;
            } else {
                const { error: insertError } = await supabase
                    .from("pricing_plans")
                    .insert([data]);
                if (insertError) throw insertError;
            }
            onSuccess();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!initialData?.id || !confirm("Er du sikker på at du vil slette denne planen?")) return;
        setLoading(true);
        try {
            const { error: deleteError } = await supabase
                .from("pricing_plans")
                .delete()
                .eq("id", initialData.id);
            if (deleteError) throw deleteError;
            onSuccess();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">Kategori</label>
                    <select
                        name="category"
                        defaultValue={initialData?.category || "Nettside Utvikling"}
                        className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-white/30 text-sm appearance-none cursor-pointer"
                    >
                        <option value="Nettside Utvikling">Nettside Utvikling</option>
                        <option value="AI Resepsjonist">AI Resepsjonist</option>
                        <option value="Systemforvaltning">Systemforvaltning</option>
                    </select>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">Navn på pakke</label>
                    <input
                        name="name"
                        defaultValue={initialData?.name}
                        required
                        className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-white/30 transition-colors"
                        placeholder="f.eks. One-pager"
                    />
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">Pris (Ny)</label>
                    <input
                        name="price"
                        defaultValue={initialData?.price}
                        required
                        className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-white/30 transition-colors"
                        placeholder="1.990 kr"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">Pris (Gammel)</label>
                    <input
                        name="old_price"
                        defaultValue={initialData?.old_price}
                        className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-white/30 transition-colors"
                        placeholder="3.990 kr"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">Under-tekst</label>
                    <input
                        name="sub_price"
                        defaultValue={initialData?.sub_price}
                        className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-white/30 transition-colors"
                        placeholder="oppstart + 499 kr/mnd"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Funksjoner (kommaseparert)</label>
                <textarea
                    name="features"
                    defaultValue={initialData?.features?.join(", ")}
                    required
                    rows={3}
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-white/30 transition-colors resize-none"
                    placeholder="Sikring, SSL, Backup..."
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">Rekkefølge (Tall)</label>
                    <input
                        name="order"
                        type="number"
                        defaultValue={initialData?.order || 0}
                        className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-white/30 transition-colors"
                    />
                </div>
                <div className="flex items-center gap-3 pt-8">
                    <input
                        type="checkbox"
                        name="highlight"
                        id="highlight"
                        defaultChecked={initialData?.highlight}
                        className="w-5 h-5 bg-white/5 border-white/10 rounded focus:ring-0 accent-white"
                    />
                    <label htmlFor="highlight" className="text-sm font-medium text-gray-400 cursor-pointer">
                        Fremhev denne planen (Hvit bakgrunn)
                    </label>
                </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/10">
                {initialData?.id ? (
                    <button
                        type="button"
                        onClick={handleDelete}
                        disabled={loading}
                        className="flex items-center gap-2 px-4 py-2.5 text-red-500 hover:bg-red-500/10 rounded-xl transition-colors disabled:opacity-50"
                    >
                        {loading ? <Loader2 size={18} className="animate-spin" /> : <Trash2 size={18} />}
                        Slett
                    </button>
                ) : <div />}

                <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center gap-2 px-6 py-2.5 bg-white text-black font-medium rounded-xl hover:bg-gray-200 transition-colors disabled:opacity-50"
                >
                    {loading ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                    {initialData?.id ? "Lagre endringer" : "Opprett plan"}
                </button>
            </div>
        </form>
    );
}
