import Navbar from "@/components/navbar";
import Footer from "@/components/sections/footer";
import ProsjekterContent from "@/components/sections/prosjekter-content";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Prosjekter | Utvikleren.site AS",
    description: "Se hva vi har bygget — nettsider, apper og digitale løsninger for norske bedrifter.",
};

export default function ProsjekterPage() {
    return (
        <>
            <Navbar />
            <ProsjekterContent />
            <Footer hideCTA={false} />
        </>
    );
}
