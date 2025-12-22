import DashboardSidebar from "../components/DashboardSidebar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="bg-black text-white min-h-screen font-sans selection:bg-white selection:text-black">
            <DashboardSidebar />
            <div className="lg:pl-64">
                {children}
            </div>
        </div>
    );
}
