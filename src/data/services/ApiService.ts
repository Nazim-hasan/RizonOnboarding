
import { Platform } from 'react-native';

const BASE_URL = Platform.select({
    android: 'http://10.0.2.2:8080', // Default Android emulator localhost
    ios: 'http://localhost:8080',
    default: 'http://localhost:8080',
});

interface LoginResponse {
    message: string;
}

export const ApiService = {
    requestLoginLink: async (email: string): Promise<LoginResponse> => {
        try {
            const response = await fetch(`${BASE_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    },

    verifyLoginLink: async (token: string): Promise<{ token: string }> => {
        try {
            const response = await fetch(`${BASE_URL}/auth/verify?token=${token}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Verification Error:', error);
            throw error;
        }
    },

    submitFeedback: async (feedback: string, token: string): Promise<void> => {
        try {
            const response = await fetch(`${BASE_URL}/feedback`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ content: feedback }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        } catch (error) {
            console.error('Feedback Error:', error);
            throw error;
        }
    }
};
