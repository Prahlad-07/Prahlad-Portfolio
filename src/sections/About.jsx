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
                    title="Full-stack engineer who ships."
                    description="I solve problems cleanly. I build backends that scale. I write code that makes sense. I ship fast and iterate based on feedback."
                />

                <div className="about-layout">
                    <article className="premium-card about-story_card">
                        <p className="about-story_lead">
                            I&apos;m a full-stack engineer focused on building backends that work. APIs, databases, system design, and problems that need thinking.
                        </p>
                        <p className="about-story_text">
                            Right now I&apos;m at Newton School, building compiler and runtime systems. It&apos;s taught me how systems really work, the importance of clean architecture, and that shipping good code is an art.
                        </p>
                        <p className="about-story_text">
                            I started competitive programming to get better at problem-solving. It worked. I&apos;ve solved 3000+ problems and it&apos;s made me a clearer thinker. I bring that rigor to every project.
                        </p>

                        <div className="detail-grid">
                            <article className="detail-card">
                                <span className="card-label">Education</span>
                                <strong>B.Tech IT - Government Engineering College Bilaspur</strong>
                                <p>2022-2026. CGPA: 8.1/10</p>
                            </article>
                            <article className="detail-card">
                                <span className="card-label">Best at</span>
                                <strong>Backend systems & APIs</strong>
                                <p>Spring Boot, databases, system design, debugging.</p>
                            </article>
                            <article className="detail-card">
                                <span className="card-label">Work style</span>
                                <strong>Fast shipping & clean code</strong>
                                <p>I move quick. Code is readable. I ask good questions.</p>
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
