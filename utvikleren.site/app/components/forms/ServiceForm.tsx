"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Loader2, Save, Trash2, Plus, GripVertical } from "lucide-react";

interface ServiceFormProps {
    onSuccess: () => void;
}

export default function ServiceForm({ onSuccess }: ServiceFormProps) {
    const [services, setServices] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const supabase = createClient();

    useEffect(() => {
        fetchServices();
    }, []);

    async function fetchServices() {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from("services")
                .select("*")
                .order("order", { ascending: true });
            if (error) throw error;
            setServices(data || []);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    const handleAdd = () => {
        setServices([...services, { id: 'temp-' + Date.now(), name: "", href: "", icon_name: "Bot", order: services.length + 1 }]);
    };

    const handleChange = (id: string, field: string, value: any) => {
        setServices(services.map(s => s.id === id ? { ...s, [field]: value } : s));
    };

    const handleDelete = async (id: string) => {
        if (id.toString().startsWith('temp-')) {
            setServices(services.filter(s => s.id !== id));
            return;
        }

        if (!confirm("Er du sikker på at du vil slette denne tjenesten?")) return;

        setSaving(true);
        try {
            const { error: deleteError } = await supabase
                .from("services")
                .delete()
                .eq("id", id);
            if (deleteError) throw deleteError;
            setServices(services.filter(s => s.id !== id));
        } catch (err: any) {
            setError(err.message);
        } finally {
            setSaving(false);
        }
    };

    const handleSaveAll = async () => {
        setSaving(true);
        setError(null);
        try {
            // Split into new and existing
            const toUpdate = services.filter(s => !s.id.toString().startsWith('temp-')).map((s, i) => ({
                id: s.id,
                name: s.name,
                href: s.href,
                icon_name: s.icon_name,
                order: i + 1
            }));

            const toInsert = services.filter(s => s.id.toString().startsWith('temp-')).map((s, i) => ({
                name: s.name,
                href: s.href,
                icon_name: s.icon_name,
                order: toUpdate.length + i + 1
            }));

            if (toUpdate.length > 0) {
                const { error: updateError } = await supabase.from("services").upsert(toUpdate);
                if (updateError) throw updateError;
            }

            if (toInsert.length > 0) {
                const { error: insertError } = await supabase.from("services").insert(toInsert);
                if (insertError) throw insertError;
            }

            onSuccess();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin text-white/20" /></div>;

    return (
        <div className="space-y-6">
            {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm">
                    {error}
                </div>
            )}

            <div className="space-y-4">
                {services.map((service, index) => (
                    <div key={service.id} className="flex items-center gap-3 p-4 bg-white/[0.03] border border-white/10 rounded-2xl group">
                        <div className="cursor-grab active:cursor-grabbing text-gray-600">
                            <GripVertical size={18} />
                        </div>

                        <div className="flex-1 grid grid-cols-3 gap-3">
                            <input
                                value={service.name}
                                onChange={(e) => handleChange(service.id, "name", e.target.value)}
                                className="px-3 py-2 bg-black/40 border border-white/10 rounded-lg focus:outline-none focus:border-white/30 text-sm"
                                placeholder="Navn (f.eks. AI Resepsjonist)"
                            />
                            <input
                                value={service.href}
                                onChange={(e) => handleChange(service.id, "href", e.target.value)}
                                className="px-3 py-2 bg-black/40 border border-white/10 rounded-lg focus:outline-none focus:border-white/30 text-sm"
                                placeholder="Link (f.eks. /ai-resepsjonist)"
                            />
                            <select
                                value={service.icon_name}
                                onChange={(e) => handleChange(service.id, "icon_name", e.target.value)}
                                className="px-3 py-2 bg-black/40 border border-white/10 rounded-lg focus:outline-none focus:border-white/30 text-sm appearance-none cursor-pointer"
                            >
                                <option value="Bot">Bot</option>
                                <option value="FolderKanban">Prosjekt</option>
                                <option value="Settings">Innstillinger</option>
                                <option value="Package">Pakke</option>
                                <option value="Layers">Lag</option>
                                <option value="CreditCard">Betaling</option>
                            </select>
                        </div>

                        <button
                            onClick={() => handleDelete(service.id)}
                            className="p-2 text-gray-500 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                        >
                            <Trash2 size={18} />
                        </button>
                    </div>
                ))}
            </div>

            <button
                onClick={handleAdd}
                className="w-full flex items-center justify-center gap-2 p-3 border border-dashed border-white/20 rounded-2xl text-gray-400 hover:border-white/40 hover:text-white transition-all"
            >
                <Plus size={18} />
                Legg til tjeneste
            </button>

            <div className="flex items-center justify-end pt-6 border-t border-white/10">
                <button
                    onClick={handleSaveAll}
                    disabled={saving}
                    className="flex items-center gap-2 px-8 py-3 bg-white text-black font-medium rounded-xl hover:bg-gray-200 transition-colors disabled:opacity-50"
                >
                    {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                    Lagre endringer
                </button>
            </div>
        </div>
    );
}
