import { AuthService } from '@/services/auth/auth.service';
import { AuthType } from '@/services/auth/auth.type';
import cn from 'clsx';
import { useRouter } from 'next/navigation';
import React, { FC, useState } from 'react'

interface IFormWidgetProps {
    type: AuthType;
    onChangeType: (newType: AuthType) => void;
    className?: string;
}

export const FormWidget: FC<IFormWidgetProps> = ({className, type, onChangeType}) => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const isPasswordMatch = () => {
        return password === confirmPassword
    }

    const handleChangeType = () => {
        setError(null);
        onChangeType(type === AuthType.LOGIN ? AuthType.SIGNUP : AuthType.LOGIN);
    }

    const handleClick = async() => {
        try {
            setError(null);
            if(type === AuthType.SIGNUP && !isPasswordMatch()) {
                setError("Passwords do not match");
                return;
            }
            let response;
            switch(type) {
                case AuthType.LOGIN:
                    response = await AuthService.login({username: userName, password});
                    break;
                case AuthType.SIGNUP:
                    response = await AuthService.signup({username: userName, password});
                    break;
                default:
                    break;
            }
            localStorage.setItem('accessToken', response.access);
            localStorage.setItem('refreshToken', response.refresh);
            router.push('/dashboard');
        } catch(err: any) {
            console.error(err);
            setError(err.response.data.detail || "Server error");
        }
    }
    
  return (
    <div className={cn('px-5 py-5', className)}>
        <form>
            <label className="flex flex-col gap-1 text-black">
                <span>Username</span>
                <input placeholder='ivanZolo2003' value={userName} onChange={(e) => setUserName(e.target.value)} className="rounded-md border px-3 py-2 border-black placeholder:text-gray-500"/>
            </label>
            <label className="flex flex-col gap-1 mt-5 text-black">
                <span>Password</span>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="rounded-md border px-3 py-2 border-black placeholder:text-gray-700"/>
            </label>
            {type === AuthType.SIGNUP && 
                <label className="flex flex-col gap-1 mt-5 text-black">
                    <span>Confirm password</span>
                    <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="rounded-md border px-3 py-2 border-black placeholder:text-gray-700"/>
                </label>
            }
            {error && <div className="text-red-500 text-sm mt-2">{error}</div>}

            <button type="submit"
                onClick={(e) => {
                    e.preventDefault();
                    handleClick();
                }}
                className="px-2 py-2 bg-blue-500 text-white rounded-md mt-5 block w-full"
            >
                {type === AuthType.LOGIN ? "Login" : "Register"}
            </button>
            <div className="mt-3 text-center">
                <span className="text-blue-500 cursor-pointer" onClick={handleChangeType}>
                    {type === AuthType.LOGIN ? "Register" : "Login"}
                </span>
            </div>
        </form>
    </div>
  )
}
