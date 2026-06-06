import { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const [dark, setDark] = useState(false);

    function toggleTheme() {
        setDark(!dark);
    }

    const theme = {
        dark,
        bg:         dark ? "#1a1a2e" : "#f0f2f5",
        surface:    dark ? "#16213e" : "#ffffff",
        surfaceAlt: dark ? "#0f3460" : "#f8f9fa",
        border:     dark ? "#2a2a4a" : "#dee2e6",
        text:       dark ? "#e0e0e0" : "#333333",
        textMuted:  dark ? "#9090b0" : "#666666",
        navBg:      dark ? "#0d0d1a" : "#343a40",
        inputBg:    dark ? "#1e1e3a" : "#ffffff",
        inputBorder: dark ? "#3a3a5a" : "#cccccc",
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}