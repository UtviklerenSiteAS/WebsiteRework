"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function AuthCodeError() {
    return (
        <div className="bg-black text-white min-h-screen font-sans selection:bg-white selection:text-black flex items-center justify-center p-6">
            <div className="max-w-md text-center space-y-6">
                <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto">
                    <div className="text-3xl">⚠️</div>
                </div>
                <h1 className="text-4xl font-medium tracking-tight">Autentisering feilet</h1>
                <p className="text-gray-400 text-lg">
                    Det oppstod et problem med bekreftelseslenken. Dette kan skyldes:
                </p>
                <ul className="text-left text-gray-400 space-y-2 max-w-sm mx-auto">
                    <li>• Lenken har utløpt</li>
                    <li>• Lenken er allerede brukt</li>
                    <li>• Det er en konfigurasjonsfeil</li>
                </ul>
                <div className="flex flex-col gap-3 pt-6">
                    <Link
                        href="/registrer"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-black font-medium rounded-xl hover:bg-gray-200 transition-colors"
                    >
                        Prøv å registrere igjen
                        <ArrowRight size={16} />
                    </Link>
                    <Link
                        href="/login"
                        className="text-gray-500 hover:text-white transition-colors"
                    >
                        Tilbake til logg inn
                    </Link>
                </div>
            </div>
        </div>
    );
}
