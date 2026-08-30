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

                    <h1 className="hero-display">
                        <span>I build <em>fast</em> backends.</span>
                        <span>I solve <em>hard</em> problems.</span>
                        <span>I ship <em>clean</em> code.</span>
                    </h1>

                    <p className="hero-body">
                        {personalInfo.intro} {personalInfo.summary}
                    </p>

                    <div className="hero-detail_row">
                        <span className="detail-chip">{personalInfo.location}</span>
                        <span className="detail-chip">Backend · Frontend · Mobile · DSA</span>
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
                </div>

                <div className="hero-visual">
                    <article className="hero-portrait_card">
                        <span className="hero-status_badge">Open to work</span>
                        <div className="hero-portrait_frame">
                            <img
                                src="/assets/Prahlad_Yadav_Photo.jpeg"
                                alt="Prahlad Yadav portrait"
                                className="hero-portrait_image"
                                loading="eager"
                                decoding="async"
                            />
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
