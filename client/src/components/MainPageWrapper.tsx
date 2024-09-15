"use client";

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation';

export const MainPageWrapper = async() => {
  const router = useRouter();
  
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if(!token) {
      router.push('/login');
      console.log('No token found');
    } else {
      router.push('/dashboard');
      console.log('token found');
    }
  }, []);
    
  return (
    <div></div>
  )
}
