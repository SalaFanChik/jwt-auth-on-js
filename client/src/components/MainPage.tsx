import { useRouter } from 'next/navigation';
import React, { FC } from 'react'

interface IMainPageProps {
    session: any;
}

export const MainPage: FC<IMainPageProps> = ({session}) => {
    const router = useRouter();
    
    if(!session || !session.user || session.error) {
        router.push('/login');
    } else {
        router.push('/dashboard');
    }
    
  return (
    <div></div>
  )
}
