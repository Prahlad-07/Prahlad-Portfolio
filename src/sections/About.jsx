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
                    eyebrow="About Me"
                    title="Engineering that balances depth, clarity, and execution."
                    description="I bring competitive programming rigor, backend engineering focus, and a strong bias toward shipping reliable work that feels thoughtfully built."
                />

                <div className="about-layout">
                    <article className="premium-card about-story_card">
                        <p className="about-story_lead">
                            I&apos;m a backend-focused software engineer who enjoys turning complex requirements into dependable systems and clean user-facing experiences.
                        </p>
                        <p className="about-story_text">
                            I&apos;m pursuing a B.Tech in Information Technology at Government Engineering College Bilaspur and currently working at Newton School, where I&apos;m building compiler and runtime abstractions that demand precision, debugging discipline, and systems thinking.
                        </p>
                        <p className="about-story_text">
                            My strongest work sits at the intersection of backend architecture, problem solving, and product-minded implementation. I care about code quality, maintainability, and making software feel solid for both users and teams.
                        </p>

                        <div className="detail-grid">
                            <article className="detail-card">
                                <span className="card-label">Education</span>
                                <strong>B.Tech in Information Technology</strong>
                                <p>Government Engineering College Bilaspur, 2022-2026</p>
                            </article>
                            <article className="detail-card">
                                <span className="card-label">Core strengths</span>
                                <strong>Backend systems and problem solving</strong>
                                <p>Spring Boot, APIs, system design, debugging, and DSA.</p>
                            </article>
                            <article className="detail-card">
                                <span className="card-label">Work style</span>
                                <strong>Ownership with clean execution</strong>
                                <p>Fast learner, structured builder, and dependable collaborator.</p>
                            </article>
                        </div>

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

                    <div className="about-aside">
                        <article className="premium-card about-achievements_card">
                            <span className="card-label">Selected achievements</span>
                            <div className="achievement-list">
                                {achievements.map((achievement) => (
                                    <div key={achievement} className="achievement-item">
                                        <span className="achievement-dot" aria-hidden="true" />
                                        <p>{achievement}</p>
                                    </div>
                                ))}
                            </div>
                        </article>

                        <div className="about-highlights_grid">
                            {aboutHighlights.map((item) => (
                                <article key={item.id} className="premium-card highlight-card">
                                    <span className="card-label">{item.title}</span>
                                    <p>{item.text}</p>
                                </article>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
