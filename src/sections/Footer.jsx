import { personalInfo } from "../constants/index.js";

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const getExternalProps = (href) =>
        href.startsWith('http')
            ? { target: '_blank', rel: 'noopener noreferrer' }
            : {};

    const socialProfiles = [
        { href: personalInfo.socialLinks.linkedin, label: 'LinkedIn', icon: '/assets/icons8-linkedin.svg' },
        { href: personalInfo.socialLinks.github, label: 'GitHub', icon: '/assets/github.svg' },
        { href: personalInfo.socialLinks.instagram, label: 'Instagram', icon: '/assets/instagram.svg' },
    ].filter((item) => item.href && item.href !== '#');

    return (
        <section className="c-space pt-10 pb-6 border-t border-black-300/70 flex justify-between items-start flex-wrap gap-6 mt-24 footer-shell">
            <div className="max-w-xl">
                <p className="footer-title">
                    Building reliable products with clear engineering.
                </p>
                <p className="text-white-500 mt-2">
                    Open to full-time SDE roles, backend-focused internships, and high-impact collaborations.
                </p>
                <div className="footer-links">
                    <a href={`mailto:${personalInfo.email}`} className="footer-chip">
                        Email
                    </a>
                    <a href="#contact" className="footer-chip">
                        Contact
                    </a>
                </div>
            </div>

            {socialProfiles.length > 0 && (
                <div className="flex gap-3">
                    {socialProfiles.map((item) => (
                        <div className="social-icon" key={item.label}>
                            <a href={item.href} {...getExternalProps(item.href)} className="social-link" aria-label={item.label}>
                                <img src={item.icon} alt={item.label} className="social-image" />
                            </a>
                        </div>
                    ))}
                </div>
            )}

            <p className="text-white-500 w-full">
                © {currentYear} {personalInfo.firstName}. All rights reserved.
            </p>
        </section>
    )
}

export default Footer
