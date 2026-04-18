import { heroMetrics, personalInfo } from '../constants/index.js';

const socialActions = [
    { id: 1, label: 'LinkedIn', href: personalInfo.socialLinks.linkedin },
    { id: 2, label: 'GitHub', href: personalInfo.socialLinks.github },
    { id: 3, label: 'Email', href: `mailto:${personalInfo.email}` },
];

const Hero = () => {
    return (
        <section className="section-wrap hero-section" id="home">
            <div className="shell hero-layout">
                <div className="hero-copy">
                    <p className="section-eyebrow">{personalInfo.availability}</p>
                    <p className="hero-name">
                        {personalInfo.fullName}
                        <span>{personalInfo.role}</span>
                    </p>
                    <h1 className="hero-display">
                        Building <em>reliable</em> software with backend depth and product-level polish.
                    </h1>
                    <p className="hero-body">
                        {personalInfo.intro} {personalInfo.summary}
                    </p>

                    <div className="hero-detail_row">
                        <span className="detail-chip">{personalInfo.location}</span>
                        <span className="detail-chip">Spring Boot, React, and system design</span>
                    </div>

                    <div className="hero-actions">
                        <a
                            href={personalInfo.resumeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="button-primary"
                        >
                            View Resume
                        </a>
                        <a href="#contact" className="button-secondary">
                            Let&apos;s Talk
                        </a>
                    </div>

                    <div className="hero-social_row" aria-label="Social links">
                        {socialActions.map((action) => (
                            <a
                                key={action.id}
                                href={action.href}
                                target={action.href.startsWith('http') ? '_blank' : undefined}
                                rel={action.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                className="text-link_chip"
                            >
                                {action.label}
                            </a>
                        ))}
                    </div>
                </div>

                <div className="hero-visual">
                    <article className="premium-card hero-portrait_card">
                        <span className="hero-status_badge">Open to SDE roles</span>
                        <div className="hero-portrait_glow" aria-hidden="true" />
                        <div className="hero-portrait_frame">
                            <img
                                src="/assets/Prahlad_Yadav_Photo.jpeg"
                                alt="Prahlad Yadav portrait"
                                className="hero-portrait_image"
                                loading="eager"
                                decoding="async"
                            />
                        </div>
                        <div className="hero-note_card">
                            <span className="card-label">Current focus</span>
                            <p>I&apos;m learning how to be the best human being I can be.</p>
                        </div>
                    </article>

                    <div className="hero-metrics_grid">
                        {heroMetrics.map((metric) => (
                            <article key={metric.id} className="metric-card">
                                <strong>{metric.value}</strong>
                                <span>{metric.label}</span>
                                <p>{metric.detail}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
