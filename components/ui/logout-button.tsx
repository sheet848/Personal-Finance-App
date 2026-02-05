'use client'

import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

export default function LogoutButton() {

    const supabase = createClient();
    const router = useRouter();

    const handleLogout = async() => {
        await supabase.auth.signOut();
        router.replace('/auth/login');
    }
    return (
        <button
            onClick={handleLogout} 
            className="bg-black text-white px-4 py-2 rounded-lg text-sm">
          + Logout
        </button>
    )
}