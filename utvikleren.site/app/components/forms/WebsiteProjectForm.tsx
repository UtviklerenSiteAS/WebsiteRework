"use client";

import React, { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Loader2, Save, Trash2 } from "lucide-react";

interface WebsiteProjectFormProps {
    initialData?: any;
    onSuccess: () => void;
    isAdmin?: boolean;
}

export default function WebsiteProjectForm({ initialData, onSuccess, isAdmin }: WebsiteProjectFormProps) {
    const [loading, setLoading] = useState(false);
    const [profiles, setProfiles] = useState<any[]>([]);
    const [progress, setProgress] = useState(initialData?.progress || 0);
    const [error, setError] = useState<string | null>(null);
    const supabase = createClient();

    useEffect(() => {
        if (isAdmin) {
            const fetchProfiles = async () => {
                const { data, error } = await supabase
                    .from('profiles')
                    .select('id, email, full_name')
                    .order('email');
                if (!error && data) setProfiles(data);
            };
            fetchProfiles();
        }
    }, [isAdmin, supabase]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const formData = new FormData(e.currentTarget);
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) throw new Error("Du må være logget inn");

            const projectData = {
                user_id: formData.get("user_id") as string,
                name: formData.get("name") as string,
                description: formData.get("description") as string,
                status: formData.get("status") as string,
                url: formData.get("url") as string,
                analytics_url: formData.get("analytics_url") as string,
                progress: parseInt(formData.get("progress") as string),
                updated_at: new Date().toISOString(),
            };

            if (initialData?.id) {
                const { error: updateError } = await supabase
                    .from("website_projects")
                    .update(projectData)
                    .eq("id", initialData.id);
                if (updateError) throw updateError;
            } else {
                const { error: insertError } = await supabase
                    .from("website_projects")
                    .insert([projectData]);
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
        if (!initialData?.id || !confirm("Er du sikker på at du vil slette dette prosjektet?")) return;
        setLoading(true);
        try {
            const { error: deleteError } = await supabase
                .from("website_projects")
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
        <form onSubmit={handleSubmit} className="space-y-6 text-white font-sans">
            {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm">
                    {error}
                </div>
            )}

            {isAdmin && (
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">Tildel Kunde</label>
                    <select
                        name="user_id"
                        defaultValue={initialData?.user_id}
                        required
                        className="w-full px-4 py-3 bg-[#0A0A0A] border border-white/10 rounded-xl focus:outline-none focus:border-white/30 transition-colors"
                    >
                        <option value="">Velg en kunde...</option>
                        {profiles.map((profile) => (
                            <option key={profile.id} value={profile.id}>
                                {profile.email} {profile.full_name ? `(${profile.full_name})` : ''}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {!isAdmin && (
                <input type="hidden" name="user_id" value={initialData?.user_id} />
            )}

            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Prosjektnavn</label>
                <input
                    name="name"
                    defaultValue={initialData?.name}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-white/30 transition-colors"
                    placeholder="f.eks. Min Nye Nettbutikk"
                />
            </div>

            <div className="space-y-2">
                <div className="flex justify-between items-center mb-1">
                    <label className="text-sm font-medium text-gray-400">Fremgang</label>
                    <span className="text-sm font-bold text-white">{progress}%</span>
                </div>
                <input
                    type="range"
                    name="progress"
                    value={progress}
                    onChange={(e) => setProgress(parseInt(e.target.value))}
                    min="0"
                    max="100"
                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white"
                />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Beskrivelse</label>
                <textarea
                    name="description"
                    defaultValue={initialData?.description}
                    rows={3}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-white/30 transition-colors resize-none"
                    placeholder="Kort beskrivelse av prosjektet..."
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">Status</label>
                    <select
                        name="status"
                        defaultValue={initialData?.status || "I utvikling"}
                        className="w-full px-4 py-3 bg-[#0A0A0A] border border-white/10 rounded-xl focus:outline-none focus:border-white/30 transition-colors"
                    >
                        <option value="Planlagt">Planlagt</option>
                        <option value="I utvikling">I utvikling</option>
                        <option value="Sendt til vurdering">Sendt til vurdering</option>
                        <option value="Godkjent">Godkjent</option>
                        <option value="Avvist">Avvist</option>
                        <option value="Live">Live</option>
                        <option value="Arkivert">Arkivert</option>
                    </select>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">URL (Valgfri)</label>
                    <input
                        name="url"
                        defaultValue={initialData?.url}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-white/30 transition-colors"
                        placeholder="https://..."
                    />
                </div>
                {isAdmin && (
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-400">Analyse-URL (Valgfri)</label>
                        <input
                            name="analytics_url"
                            defaultValue={initialData?.analytics_url}
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-white/30 transition-colors"
                            placeholder="f.eks. Plausible eller Google Analytics"
                        />
                    </div>
                )}
            </div>

            <div className="pt-4 flex items-center justify-between gap-4">
                {initialData?.id && (
                    <button
                        type="button"
                        onClick={handleDelete}
                        disabled={loading}
                        className="flex items-center gap-2 px-6 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-xl transition-colors disabled:opacity-50"
                    >
                        <Trash2 size={18} />
                        Slett
                    </button>
                )}
                <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors disabled:opacity-50"
                >
                    {loading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                        <>
                            <Save size={18} />
                            Lagre prosjekt
                        </>
                    )}
                </button>
            </div>
        </form>
    );
}
