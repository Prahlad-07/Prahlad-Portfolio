import useTheme from '../hooks/useTheme.js';

const ThemeToggleButton = () => {
    const { isDark, toggleTheme } = useTheme();
    const nextThemeLabel = isDark ? 'light' : 'dark';

    return (
        <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${nextThemeLabel} mode`}
            aria-pressed={isDark}
            title={`Switch to ${nextThemeLabel} mode`}
        >
            <span className="theme-toggle_track" aria-hidden="true">
                <svg
                    viewBox="0 0 24 24"
                    className="theme-toggle_icon theme-toggle_iconSun"
                    focusable="false"
                >
                    <circle cx="12" cy="12" r="4.3" />
                    <path d="M12 1.8v3.1M12 19.1v3.1M4.6 4.6l2.2 2.2M17.2 17.2l2.2 2.2M1.8 12h3.1M19.1 12h3.1M4.6 19.4l2.2-2.2M17.2 6.8l2.2-2.2" />
                </svg>
                <svg
                    viewBox="0 0 24 24"
                    className="theme-toggle_icon theme-toggle_iconMoon"
                    focusable="false"
                >
                    <path d="M20.4 14.7A8.8 8.8 0 0 1 9.3 3.6a9.2 9.2 0 1 0 11.1 11.1Z" />
                </svg>
            </span>
            <span className="theme-toggle_text">{isDark ? 'Dark' : 'Light'}</span>
        </button>
    );
};

export default ThemeToggleButton;
