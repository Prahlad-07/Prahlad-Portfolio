import { useState } from 'react';
import { navLinks, personalInfo } from '../constants/index.js';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const closeMenu = () => setIsOpen(false);
    const toggleMenu = () => setIsOpen((previousState) => !previousState);

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
                            className="site-nav_link"
                            onClick={closeMenu}
                        >
                            {link.name}
                        </a>
                    ))}

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
