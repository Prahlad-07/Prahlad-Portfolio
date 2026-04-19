import { useEffect, useState } from 'react';
import ThemeToggleButton from '../components/ThemeToggleButton.jsx';
import { navLinks, personalInfo } from '../constants/index.js';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeHref, setActiveHref] = useState('#home');

    const closeMenu = () => setIsOpen(false);
    const toggleMenu = () => setIsOpen((previousState) => !previousState);

    useEffect(() => {
        if (typeof window === 'undefined') return undefined;

        const syncHash = () => {
            setActiveHref(window.location.hash || '#home');
        };

        syncHash();
        window.addEventListener('hashchange', syncHash);

        const targets = navLinks
            .map((link) => document.querySelector(link.href))
            .filter(Boolean);

        if (!targets.length || typeof window.IntersectionObserver === 'undefined') {
            return () => window.removeEventListener('hashchange', syncHash);
        }

        const observer = new window.IntersectionObserver(
            (entries) => {
                const visibleEntries = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort((entryA, entryB) => entryB.intersectionRatio - entryA.intersectionRatio);

                const activeSection = visibleEntries[0]?.target?.id;
                if (activeSection) {
                    setActiveHref(`#${activeSection}`);
                }
            },
            {
                threshold: [0.18, 0.35, 0.6],
                rootMargin: '-24% 0px -52% 0px',
            },
        );

        targets.forEach((target) => observer.observe(target));

        return () => {
            window.removeEventListener('hashchange', syncHash);
            observer.disconnect();
        };
    }, []);

    return (
        <header className="site-header">
            <div className="shell site-header_inner">
                <a href="#home" className="site-brand" onClick={closeMenu}>
                    <span className="site-brand_mark">PY</span>
                    <span className="site-brand_copy">
                        <strong>{personalInfo.fullName}</strong>
                        <small>{personalInfo.role}</small>
                    </span>
                </a>

                <button
                    type="button"
                    className="site-menu_button"
                    onClick={toggleMenu}
                    aria-expanded={isOpen}
                    aria-controls="site-navigation"
                    aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
                >
                    {isOpen ? 'Close' : 'Menu'}
                </button>

                <nav
                    id="site-navigation"
                    className={`site-nav ${isOpen ? 'site-nav_open' : ''}`}
                    aria-label="Primary"
                >
                    {navLinks.map((link) => (
                        <a
                            key={link.id}
                            href={link.href}
                            className={`site-nav_link ${
                                activeHref === link.href ? 'site-nav_linkActive' : ''
                            }`}
                            onClick={() => {
                                setActiveHref(link.href);
                                closeMenu();
                            }}
                        >
                            {link.name}
                        </a>
                    ))}

                    <ThemeToggleButton />

                    <a
                        href={personalInfo.resumeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="nav-cta"
                        onClick={closeMenu}
                    >
                        Resume
                    </a>
                </nav>
            </div>
        </header>
    );
};

export default Navbar;
