"use client";

import { useState, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { Loader2, Save, Trash2, Upload, X as CloseIcon } from "lucide-react";

interface ReferanseFormProps {
    initialData?: any;
    onSuccess: () => void;
}

export default function ReferanseForm({ initialData, onSuccess }: ReferanseFormProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(initialData?.image || null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const supabase = createClient();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const uploadImage = async (file: File): Promise<string> => {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
        const filePath = `projects/${fileName}`;

        const { error: uploadError, data } = await supabase.storage
            .from('referanser')
            .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
            .from('referanser')
            .getPublicUrl(filePath);

        return publicUrl;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const formData = new FormData(e.currentTarget);
            let imageUrl = initialData?.image || "";

            // Upload new image if selected
            if (imageFile) {
                imageUrl = await uploadImage(imageFile);

            }

            const data = {
                client: formData.get("client") as string,
                title: formData.get("title") as string,
                description: formData.get("description") as string,
                tags: (formData.get("tags") as string).split(",").map(t => t.trim()).filter(t => t !== ""),
                color: formData.get("color") as string,
                image: imageUrl,
                review_text: formData.get("review_text") as string,
                review_author: formData.get("review_author") as string,
                detailed_content: formData.get("detailed_content") as string,
            };

            if (initialData?.id) {
                const { error: updateError } = await supabase
                    .from("referanser")
                    .update(data)
                    .eq("id", initialData.id);
                if (updateError) throw updateError;
            } else {
                const { error: insertError } = await supabase
                    .from("referanser")
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
        if (!initialData?.id || !confirm("Er du sikker på at du vil slette denne referansen?")) return;
        setLoading(true);
        try {
            const { error: deleteError } = await supabase
                .from("referanser")
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
                    <label className="text-sm font-medium text-gray-400">Kunde / Navn</label>
                    <input
                        name="client"
                        defaultValue={initialData?.client}
                        required
                        className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-white/30 transition-colors"
                        placeholder="f.eks. Calvio"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">Tema (Valgfri)</label>
                    <input
                        name="title"
                        defaultValue={initialData?.title}
                        className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-white/30 transition-colors"
                        placeholder="f.eks. Landing Page"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Beskrivelse</label>
                <textarea
                    name="description"
                    defaultValue={initialData?.description}
                    required
                    rows={4}
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-white/30 transition-colors resize-none"
                    placeholder="Kort beskrivelse (vises på forsiden)"
                />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Detaljert innhold (Full case-beskrivelse)</label>
                <textarea
                    name="detailed_content"
                    defaultValue={initialData?.detailed_content}
                    rows={6}
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-white/30 transition-colors resize-none"
                    placeholder="Fortell mer om prosjektet, utfordringer og løsninger..."
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">Kundeomtale (Valgfri)</label>
                    <textarea
                        name="review_text"
                        defaultValue={initialData?.review_text}
                        rows={3}
                        className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-white/30 transition-colors resize-none"
                        placeholder="Hva sa kunden?"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">Omtalegiver (Navn/Tittel)</label>
                    <input
                        name="review_author"
                        defaultValue={initialData?.review_author}
                        className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-white/30 transition-colors"
                        placeholder="f.eks. Ola Nordmann, CEO"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Tags (kommaseparert)</label>
                <input
                    name="tags"
                    defaultValue={initialData?.tags?.join(", ")}
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-white/30 transition-colors"
                    placeholder="AI, Web, Design..."
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">Farge (tailwind-farge uten -500)</label>
                    <input
                        name="color"
                        defaultValue={initialData?.color || "blue"}
                        className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-white/30 transition-colors"
                        placeholder="blue, purple, indigo..."
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">Referanse-bilde</label>
                    <div
                        onClick={() => fileInputRef.current?.click()}
                        className="relative h-[120px] bg-white/5 border-2 border-dashed border-white/10 rounded-xl overflow-hidden cursor-pointer hover:border-white/20 transition-colors flex flex-col items-center justify-center gap-2"
                    >
                        {imagePreview ? (
                            <>
                                <img src={imagePreview} className="absolute inset-0 w-full h-full object-cover opacity-40" alt="Preview" />
                                <div className="relative z-10 flex flex-col items-center gap-1">
                                    <Upload size={20} className="text-white" />
                                    <span className="text-xs font-medium text-white">Endre bilde</span>
                                </div>
                            </>
                        ) : (
                            <>
                                <Upload size={24} className="text-gray-500" />
                                <span className="text-xs text-gray-500">Last opp bilde</span>
                            </>
                        )}
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept="image/*"
                            className="hidden"
                        />
                    </div>
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
                    {initialData?.id ? "Lagre endringer" : "Opprett referanse"}
                </button>
            </div>
        </form>
    );
}
