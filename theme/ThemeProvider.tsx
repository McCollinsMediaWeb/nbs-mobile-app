// import React, { createContext, ReactNode, useContext, useState } from 'react';
// import { darkColors, lightColors } from './colors';

// interface ThemeContextType {
//     dark: boolean;
//     colors: typeof lightColors;
//     setScheme: (scheme: 'light' | 'dark') => void;
// }

// const defaultThemeContext: ThemeContextType = {
//     dark: false,
//     colors: lightColors,
//     setScheme: () => {},
// };

// export const ThemeContext = createContext<ThemeContextType>(defaultThemeContext);

// interface ThemeProviderProps {
//     children: ReactNode;
// }

// export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
//     // Default to light mode (false = light)
//     const [isDark, setIsDark] = useState(false);

//     const defaultTheme: ThemeContextType = {
//         dark: isDark,
//         colors: isDark ? darkColors : lightColors,
//         setScheme: (scheme: 'light' | 'dark') => setIsDark(scheme === 'dark'),
//     };

//     return (
//         <ThemeContext.Provider value={defaultTheme}>
//             {children}
//         </ThemeContext.Provider>
//     );
// };

// export const useTheme = () => useContext(ThemeContext);




import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { darkColors, lightColors } from './colors';

interface ThemeContextType {
    dark: boolean;
    colors: typeof lightColors;
    setScheme: (scheme: 'light' | 'dark') => void;
}

const defaultThemeContext: ThemeContextType = {
    dark: false,
    colors: lightColors,
    setScheme: () => { },
};

export const ThemeContext = createContext<ThemeContextType>(defaultThemeContext);

interface ThemeProviderProps {
    children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const [isDark, setIsDark] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadTheme = async () => {
            const savedScheme = await AsyncStorage.getItem('theme');
            if (savedScheme === 'dark' || savedScheme === 'light') {
                setIsDark(savedScheme === 'dark');
            }
            setLoading(false);
        };
        loadTheme();
    }, []);

    const setScheme = async (scheme: 'light' | 'dark') => {
        setIsDark(scheme === 'dark');
        await AsyncStorage.setItem('theme', scheme);
    };

    const themeContextValue: ThemeContextType = {
        dark: isDark,
        colors: isDark ? darkColors : lightColors,
        setScheme,
    };

    if (loading) return null; // or splash screen while loading theme

    return (
        <ThemeContext.Provider value={themeContextValue}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);

