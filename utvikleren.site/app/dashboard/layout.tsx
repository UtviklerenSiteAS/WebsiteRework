import DashboardSidebar from "../components/DashboardSidebar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="bg-[#050505] text-white min-h-screen font-sans selection:bg-white selection:text-black overflow-x-hidden">
            <DashboardSidebar />
            <div className="lg:pl-72 min-h-screen">
                <main className="w-full h-full">
                    {children}
                </main>
            </div>
        </div>
    );
}
