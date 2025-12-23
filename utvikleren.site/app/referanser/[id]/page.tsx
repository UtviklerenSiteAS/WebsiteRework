import { createClient } from "@/lib/supabase/server";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import ReferanseDetailClient from "./ReferanseDetailClient";

interface Props {
    params: Promise<{ id: string }>;
}

async function getProject(id: string) {
    const supabase = await createClient();
    const { data: project } = await supabase
        .from('referanser')
        .select('*')
        .eq('id', id)
        .single();
    
    return project;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    const project = await getProject(id);

    if (!project) {
        return {
            title: "Prosjekt ikke funnet | Utvikleren.site",
        };
    }

    return {
        title: `${project.client} | Referanse | Utvikleren.site`,
        description: project.description,
        openGraph: {
            title: `${project.client} - Case Study`,
            description: project.description,
            images: project.image ? [{ url: project.image }] : [],
        },
        twitter: {
            card: "summary_large_image",
            title: project.client,
            description: project.description,
            images: project.image ? [project.image] : [],
        },
    };
}

export default async function ReferanseDetailPage({ params }: Props) {
    const { id } = await params;
    const project = await getProject(id);

    if (!project) {
        notFound();
    }

    return <ReferanseDetailClient project={project} />;
}
