"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";

export default function AuthCallbackListener() {
    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        const code = searchParams.get("code");
        const error = searchParams.get("error");
        const error_description = searchParams.get("error_description");

        if (code) {
            toast.success("Email verified successfully! You are now logged in.");
            // Optional: Clean up URL
            router.replace("/");
        }

        if (error) {
            toast.error(error_description || "An authentication error occurred.");
            // Optional: Clean up URL
            router.replace("/");
        }
    }, [searchParams, router]);

    return null;
}
