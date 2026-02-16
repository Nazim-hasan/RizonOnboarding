
import { createMMKV } from 'react-native-mmkv';

export const storage = createMMKV();

const TOKEN_KEY = 'auth.token';

export const AuthStore = {
    setToken: (token: string) => {
        console.log('[AuthStore] Setting token:', token);
        storage.set(TOKEN_KEY, token);
    },
    getToken: () => {
        return storage.getString(TOKEN_KEY);
    },
    clearToken: () => {
        console.log('[AuthStore] Clearing token');
        storage.remove(TOKEN_KEY);
    },
    isAuthenticated: () => {
        return !!storage.getString(TOKEN_KEY);
    },
    setHasSeenOnboarding: (hasSeen: boolean) => {
        console.log('[AuthStore] Setting hasSeenOnboarding:', hasSeen);
        storage.set('onboarding.seen', hasSeen);
    },
    hasSeenOnboarding: () => {
        const seen = storage.getBoolean('onboarding.seen') ?? false;
        console.log('[AuthStore] hasSeenOnboarding:', seen);
        return seen;
    }
};
