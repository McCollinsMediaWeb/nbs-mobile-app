// import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
// import { useColorScheme } from 'react-native';
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
//     const colorScheme = useColorScheme();
//     const [isDark, setIsDark] = useState(colorScheme === 'dark');

//     useEffect(() => {
//         setIsDark(colorScheme === 'dark');
//     }, [colorScheme]);

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

import React, { createContext, ReactNode, useContext, useState } from 'react';
import { darkColors, lightColors } from './colors';

interface ThemeContextType {
    dark: boolean;
    colors: typeof lightColors;
    setScheme: (scheme: 'light' | 'dark') => void;
}

const defaultThemeContext: ThemeContextType = {
    dark: false,
    colors: lightColors,
    setScheme: () => {},
};

export const ThemeContext = createContext<ThemeContextType>(defaultThemeContext);

interface ThemeProviderProps {
    children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    // Default to light mode (false = light)
    const [isDark, setIsDark] = useState(false);

    const defaultTheme: ThemeContextType = {
        dark: isDark,
        colors: isDark ? darkColors : lightColors,
        setScheme: (scheme: 'light' | 'dark') => setIsDark(scheme === 'dark'),
    };

    return (
        <ThemeContext.Provider value={defaultTheme}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
