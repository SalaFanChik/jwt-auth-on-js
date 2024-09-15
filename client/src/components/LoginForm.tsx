"use client";

import { AuthType } from '@/services/auth/auth.type';
import { FormWidget } from '@/widgets/FormWidget';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export const LoginForm = () => {
    const [type, setType] = useState<AuthType>(AuthType.LOGIN);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if(token) {
            router.push('/dashboard');
        }
    }, []);

    const onChangeType = (newType: AuthType) => setType(newType);

    return (
        <div className="py-10 px-5 mt-3 lg:mt-0 sm:px-10 bg-gray-50 rounded-xl shadow-md w-[400px]">
            <h1 className="font-bold text-2xl text-black">{type === AuthType.LOGIN ? "Login" : "SignUp"}</h1>
            <FormWidget
                className="mt-7"
                type={type}
                onChangeType={onChangeType}
            />
        </div>
    );
}
