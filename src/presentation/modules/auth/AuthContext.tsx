
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Linking } from 'react-native';
import { AuthStore } from '../../../data/store/AuthStore';
import { ApiService } from '../../../data/services/ApiService';

interface AuthContextType {
    isLoading: boolean;
    isAuthenticated: boolean;
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
    isLoading: true,
    isAuthenticated: false,
    login: () => { },
    logout: () => { },
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        checkAuthStatus();
    }, []);

    const checkAuthStatus = async () => {
        try {
            const hasToken = AuthStore.isAuthenticated();
            setIsAuthenticated(hasToken);
        } catch (error) {
            console.error('Auth check failed', error);
        } finally {
            setIsLoading(false);
        }
    };

    const login = (token: string) => {
        AuthStore.setToken(token);
        setIsAuthenticated(true);
    };

    const logout = () => {
        AuthStore.clearToken();
        setIsAuthenticated(false);
    };

    // Deep Link Handling
    useEffect(() => {
        const handleDeepLink = async (event: { url: string }) => {
            const { url } = event;
            console.log('Deep link received:', url);

            if (url.includes('auth/verify')) {
                // Simple manual parsing since URLSearchParams might not be available or polyfilled
                const tokenMatch = url.match(/token=([^&]*)/);
                const token = tokenMatch ? tokenMatch[1] : null;

                if (token) {
                    try {
                        // Verify with backend
                        const response = await ApiService.verifyLoginLink(token);
                        // Assuming backend returns { token: "..." } or similar success
                        // If backend returns a new session token, use that.
                        // For now, if verification succeeds, we store the *verified* token (or just mark as auth)
                        // The prompt said: "if verification sucess only than go to the homepage"

                        // We'll use the token from response if available, else the one from link?
                        // Usually backend returns a session JWT.
                        const sessionToken = response.token || token;

                        login(sessionToken);
                    } catch (error) {
                        console.error('Token verification failed:', error);
                    }
                }
            }
        };

        // Check for initial URL
        Linking.getInitialURL().then((url) => {
            if (url) {
                handleDeepLink({ url });
            }
        });

        // Listen for incoming links
        const subscription = Linking.addEventListener('url', handleDeepLink);

        return () => {
            subscription.remove();
        };
    }, []);

    return (
        <AuthContext.Provider value={{ isLoading, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
