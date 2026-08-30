import { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import ThemeContext from './theme-context.js';

const THEME_STORAGE_KEY = 'portfolio-theme';

const getStoredTheme = () => {
    if (typeof window === 'undefined') return null;

    const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    return storedTheme === 'light' || storedTheme === 'dark' ? storedTheme : null;
};

const applyTheme = (theme) => {
    if (typeof document === 'undefined') return;

    const root = document.documentElement;
    root.dataset.theme = theme;
    root.style.colorScheme = theme;

    const themeColorMeta = document.querySelector('meta[name="theme-color"]');
    if (themeColorMeta) {
        themeColorMeta.setAttribute('content', theme === 'dark' ? '#0a0a0c' : '#fcfbf9');
    }
};

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        if (typeof document === 'undefined') return 'light';
        return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
    });
    const [themePreference, setThemePreference] = useState(() => {
        const stored = getStoredTheme();
        return stored || 'light'; // Default to 'light' mode on first visit
    });

    useEffect(() => {
        if (typeof window === 'undefined') return undefined;

        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const syncTheme = () => {
            const storedTheme = getStoredTheme();
            const resolvedTheme = storedTheme || 'light'; // Default to light mode instead of system preference

            setThemePreference(storedTheme);
            setTheme(resolvedTheme);
            applyTheme(resolvedTheme);
        };

        syncTheme();

        const readyFrame = window.requestAnimationFrame(() => {
            document.documentElement.classList.add('theme-ready');
        });

        const handleMediaChange = () => {
            if (!getStoredTheme()) {
                // Always use light mode as default instead of system preference
                setThemePreference(null);
                setTheme('light');
                applyTheme('light');
            }
        };

        const handleStorage = (event) => {
            if (event.key === THEME_STORAGE_KEY) {
                syncTheme();
            }
        };

        if (typeof mediaQuery.addEventListener === 'function') {
            mediaQuery.addEventListener('change', handleMediaChange);
        } else {
            mediaQuery.addListener(handleMediaChange);
        }

        window.addEventListener('storage', handleStorage);

        return () => {
            window.cancelAnimationFrame(readyFrame);
            window.removeEventListener('storage', handleStorage);

            if (typeof mediaQuery.removeEventListener === 'function') {
                mediaQuery.removeEventListener('change', handleMediaChange);
            } else {
                mediaQuery.removeListener(handleMediaChange);
            }
        };
    }, []);

    const updateThemePreference = (nextTheme) => {
        if (typeof window !== 'undefined') {
            if (nextTheme) {
                window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
            } else {
                window.localStorage.removeItem(THEME_STORAGE_KEY);
            }
        }

        const resolvedTheme = nextTheme || 'light';
        setThemePreference(nextTheme);
        setTheme(resolvedTheme);
        applyTheme(resolvedTheme);
    };

    const contextValue = useMemo(
        () => ({
            isDark: theme === 'dark',
            theme,
            themePreference,
            setThemePreference: updateThemePreference,
            toggleTheme: () => updateThemePreference(theme === 'dark' ? 'light' : 'dark'),
        }),
        [theme, themePreference],
    );

    return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
};

ThemeProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ThemeProvider;


