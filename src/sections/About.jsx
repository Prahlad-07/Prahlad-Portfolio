import { useState } from 'react';
import SectionHeader from '../components/SectionHeader.jsx';
import { aboutHighlights, achievements, personalInfo } from '../constants/index.js';

const copyText = async (value) => {
    if (!value) return false;

    if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(value);
        return true;
    }

    const textArea = document.createElement('textarea');
    textArea.value = value;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    textArea.style.pointerEvents = 'none';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    const copied = document.execCommand('copy');
    document.body.removeChild(textArea);

    return copied;
};

const facts = [
    { id: 1, label: 'Education', value: 'B.Tech IT — GEC Bilaspur', note: '2022–2026 · CGPA 8.1' },
    { id: 2, label: 'Best at', value: 'Backend systems & APIs', note: 'Spring Boot, databases, system design' },
    { id: 3, label: 'Based in', value: personalInfo.location, note: 'Open to relocate / remote' },
];

const About = () => {
    const [hasCopied, setHasCopied] = useState(false);

    const handleCopyEmail = async () => {
        const copied = await copyText(personalInfo.email);
        if (!copied) return;

        setHasCopied(true);
        window.setTimeout(() => setHasCopied(false), 2200);
    };

    return (
        <section className="section-wrap" id="about">
            <div className="shell">
                <SectionHeader
                    eyebrow="About"
                    title="Full-stack engineer who ships."
                    description="Backend-first. Fast to build, clean to maintain."
                />

                <div className="about-layout">
                    <article className="premium-card about-story_card">
                        <p className="about-story_lead">
                            I build backends that work — APIs, databases, system design, and the
                            problems that need real thinking.
                        </p>
                        <p className="about-story_text">
                            Right now I&apos;m at Newton School building runtime and platform systems.
                            Competitive programming (3000+ problems) is where I learned to think
                            clearly under pressure — I bring that rigor to every project.
                        </p>

                        <dl className="about-facts">
                            {facts.map((fact) => (
                                <div key={fact.id} className="about-fact">
                                    <dt>{fact.label}</dt>
                                    <dd>
                                        <strong>{fact.value}</strong>
                                        <span>{fact.note}</span>
                                    </dd>
                                </div>
                            ))}
                        </dl>

                        <div className="about-actions">
                            <button type="button" className="button-secondary" onClick={handleCopyEmail}>
                                {hasCopied ? 'Email Copied' : 'Copy Email'}
                            </button>
                            <a
                                href={personalInfo.resumeUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="button-ghost"
                            >
                                Open Resume
                            </a>
                        </div>
                    </article>

                    <aside className="premium-card about-panel">
                        <div className="about-panel_block">
                            <span className="card-label">Achievements</span>
                            <ul className="about-list">
                                {achievements.map((achievement) => (
                                    <li key={achievement}>
                                        <span className="achievement-dot" aria-hidden="true" />
                                        <p>{achievement}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="about-panel_block">
                            <span className="card-label">How I work</span>
                            <dl className="about-defs">
                                {aboutHighlights.map((item) => (
                                    <div key={item.id}>
                                        <dt>{item.title}</dt>
                                        <dd>{item.text}</dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                    </aside>
                </div>
            </div>
        </section>
    );
};

export default About;
