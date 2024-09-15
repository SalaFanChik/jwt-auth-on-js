import axios from "axios";
import { LoginCredentialsType } from "./auth.type";

export const AuthService = {
    login: async (user: LoginCredentialsType, locale?: string) => {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login/`, user, {
            headers: {
                'Accept-Language': locale || 'en',
            }
        });
        return response.data;
    },

    signup: async (user: LoginCredentialsType, locale?: string) => {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/register/`, user, {
            headers: {
                'Accept-Language': locale || 'en',
            }
        });
        return response.data;
    },

    refresh: async(token: string, locale?: string) => {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/token/refresh/`, {refresh: token}, {
            headers: {
                'Accept-Language': locale || 'en',
            }
        });
        return response.data;
    }
}