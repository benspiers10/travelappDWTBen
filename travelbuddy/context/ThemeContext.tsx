import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

type AppTheme = 'light' | 'dark';

type ThemeContextType = {
    theme: AppTheme;
    toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

type ThemeProviderProps = {
    children: ReactNode;
};

export function ThemeProviderCustom({ children }: ThemeProviderProps) {
    // Store the current app theme.
    const [theme, setTheme] = useState<AppTheme>('dark');

    // Load the saved theme when the app starts.
    useEffect(() => {
        const loadTheme = async () => {
            try {
                const savedTheme = await AsyncStorage.getItem('appTheme');

                if (savedTheme === 'light' || savedTheme === 'dark') {
                    setTheme(savedTheme);
                }
            } catch (error) {
                console.error('Failed to load theme:', error);
            }
        };

        loadTheme();
    }, []);

    // Switch between light and dark mode.
    const toggleTheme = async () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);

        try {
            await AsyncStorage.setItem('appTheme', newTheme);
        } catch (error) {
            console.error('Failed to save theme:', error);
        }
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useAppTheme() {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error('useAppTheme must be used inside ThemeProviderCustom');
    }

    return context;
}