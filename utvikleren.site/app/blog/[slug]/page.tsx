import { createClient } from "@/lib/supabase/server";
import Navbar from "../../components/Navbar";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface Post {
    id: string;
    title: string;
    category: string;
    content: string;
    created_at: string;
    slug: string;
}

export async function generateMetadata(
    { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
    const slug = (await params).slug;
    const supabase = await createClient();

    const { data: post } = await supabase
        .from('posts')
        .select('title')
        .eq('slug', slug)
        .single();

    return {
        title: post?.title || "Artikkel",
        description: "Les mer om " + (post?.title || "vår innsikt") + " på Utvikleren.site.",
    };
}

export default async function BlogPostPage(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const supabase = await createClient();

    const { data: post, error } = await supabase
        .from('posts')
        .select('*')
        .eq('slug', params.slug)
        .single();

    if (error || !post) {
        notFound();
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('no-NO', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    return (
        <div className="bg-black text-white min-h-screen font-sans selection:bg-white selection:text-black">
            <Navbar />

            <main className="pt-40 pb-24 px-6">
                <article className="max-w-[800px] mx-auto">
                    {/* Back Link */}
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-12 group"
                    >
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        Tilbake til oversikt
                    </Link>

                    {/* Header */}
                    <header className="mb-16">
                        <div className="flex items-center gap-6 mb-8">
                            <div className="flex items-center gap-2 text-xs font-mono text-white/50 uppercase tracking-widest">
                                <Calendar size={14} />
                                {formatDate(post.created_at)}
                            </div>
                            <div className="w-1 h-1 bg-white/20 rounded-full" />
                            <div className="flex items-center gap-2 text-xs font-mono text-white uppercase tracking-widest">
                                <Tag size={14} />
                                {post.category}
                            </div>
                        </div>

                        <h1 className="text-6xl md:text-8xl font-medium tracking-tighter leading-[0.9] mb-8">
                            {post.title}
                        </h1>
                    </header>

                    {/* Content */}
                    <div className="prose prose-invert prose-lg max-w-none">
                        <div className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed space-y-8 whitespace-pre-wrap">
                            {post.content}
                        </div>
                    </div>

                    {/* Footer */}
                    <footer className="mt-20 pt-10 border-t border-white/10">
                        <div className="flex items-center justify-between">
                            <p className="text-gray-500 text-sm">© 2025 Utvikleren.site AS</p>
                            <div className="flex gap-4">
                                {/* Share links could go here */}
                            </div>
                        </div>
                    </footer>
                </article>
            </main>
        </div>
    );
}
