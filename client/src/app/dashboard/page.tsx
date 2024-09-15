"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardPage() {
    const router = useRouter();
    const [err, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    
    useEffect(() => {
        const fetchData = async() => {
            try {
                const token = localStorage.getItem('accessToken');
            if(!token) {
                router.push('/login');
                console.log('No token found');
            }
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/protected/dashboard`, {
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            const data = await res.json();
            if(!res.ok) {
                setError(data.detail);
                return;
            }

            if(data.message) {
                setMessage(data.message);   
            }
            } catch(err) {
                console.error(err);
            }
        }

        fetchData();
    }, []);
    
    return (
        <div className="flex flex-col h-sceen w-screen  bg-bg-main">
            {err ? (
                <h1 className="font-bold text-2xl text-red-500">{err}</h1>
            ) : (
                <h1 className="font-bold text-2xl text-white">{message}</h1>
            )}
            <button onClick={() => {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                router.push('/login');
            }}
            className="border font-bold text-3xl border-white text-white px-3 py-2 rounded-md mt-5"
            >Logout</button>
        </div>
    );
}