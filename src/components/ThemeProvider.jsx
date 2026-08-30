import { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import ThemeContext from './theme-context.js';

const THEME_STORAGE_KEY = 'portfolio-theme';
const DEFAULT_THEME = 'dark';

const getStoredTheme = () => {
    if (typeof window === 'undefined') return null;
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    return stored === 'light' || stored === 'dark' ? stored : null;
};

const applyTheme = (theme) => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    root.dataset.theme = theme;
    root.style.colorScheme = theme;
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#1e1e1e' : '#ffffff');
};

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        if (typeof document === 'undefined') return DEFAULT_THEME;
        return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
    });

    useEffect(() => {
        if (typeof window === 'undefined') return undefined;
        const resolved = getStoredTheme() || DEFAULT_THEME;
        setTheme(resolved);
        applyTheme(resolved);

        const onStorage = (e) => {
            if (e.key === THEME_STORAGE_KEY) {
                const next = getStoredTheme() || DEFAULT_THEME;
                setTheme(next);
                applyTheme(next);
            }
        };
        window.addEventListener('storage', onStorage);
        return () => window.removeEventListener('storage', onStorage);
    }, []);

    const setThemeValue = (next) => {
        const resolved = next === 'light' || next === 'dark' ? next : DEFAULT_THEME;
        try {
            window.localStorage.setItem(THEME_STORAGE_KEY, resolved);
        } catch {
            /* ignore */
        }
        setTheme(resolved);
        applyTheme(resolved);
    };

    const value = useMemo(
        () => ({
            isDark: theme === 'dark',
            theme,
            setTheme: setThemeValue,
            toggleTheme: () => setThemeValue(theme === 'dark' ? 'light' : 'dark'),
        }),
        [theme],
    );

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

ThemeProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ThemeProvider;
