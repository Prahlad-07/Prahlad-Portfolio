import { navLinks, personalInfo } from '../constants/index.js';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="site-footer">
            <div className="shell footer-layout">
                <div className="footer-copy">
                    <a href="#home" className="footer-brand">
                        {personalInfo.fullName}
                    </a>
                    <p>
                        Software engineer focused on scalable backend systems, polished product execution,
                        and reliable delivery.
                    </p>
                </div>

                <div className="footer-links_group">
                    <div className="footer-nav">
                        {navLinks.slice(1).map((link) => (
                            <a key={link.id} href={link.href}>
                                {link.name}
                            </a>
                        ))}
                    </div>

                    <div className="footer-nav">
                        <a href={`mailto:${personalInfo.email}`}>Email</a>
                        <a href={personalInfo.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                            LinkedIn
                        </a>
                        <a href={personalInfo.socialLinks.github} target="_blank" rel="noopener noreferrer">
                            GitHub
                        </a>
                    </div>
                </div>

                <p className="footer-meta">© {currentYear} {personalInfo.firstName}. Crafted with React and a design-first mindset.</p>
            </div>
        </footer>
    );
};

export default Footer;
