import { useState } from 'react';
import FileShell from '../../components/ide/FileShell.jsx';
import CodeBlock from '../../components/ide/CodeBlock.jsx';
import { highlightCode } from '../../components/ide/highlight.js';
import { IconCopy, IconExternal, IconPlay } from '../../components/ide/icons.jsx';
import { aboutHighlights, achievements, personalInfo } from '../../constants/index.js';

const SRC = `// about.jsx — who is writing this code

const prahlad = {
  role: "Full-Stack Engineer",
  strongestAt: "backend systems, APIs, system design",
  currently: "Newton School — runtime & platform systems",
  education: "B.Tech IT, GEC Bilaspur (2022-2026) · CGPA 8.1",
  learnedToThink: "3000+ competitive programming problems",
  style: ["ship fast", "keep it readable", "ask good questions"],
};

export default function About() {
  return <Story data={prahlad} />;
}`;

const copyEmail = async (setDone) => {
    try {
        await navigator.clipboard.writeText(personalInfo.email);
        setDone(true);
        setTimeout(() => setDone(false), 1800);
    } catch {
        /* no-op */
    }
};

const AboutFile = () => {
    const [copied, setCopied] = useState(false);

    return (
        <FileShell id="about">
            <CodeBlock lines={highlightCode(SRC)} />

            <div className="preview">
                <div className="preview_bar">
                    <IconPlay />
                    <span>Preview — &lt;About /&gt;</span>
                </div>
                <div className="preview_body">
                    <p style={{ fontSize: 15, lineHeight: 1.6, marginBottom: 16 }}>
                        I build backends that work — APIs, databases, system design, and the problems
                        that need real thinking. Competitive programming is where I learned to stay
                        calm under pressure; I bring that rigor to every project.
                    </p>

                    <div className="about-grid">
                        {aboutHighlights.map((h) => (
                            <div className="about-card" key={h.id}>
                                <h4>{h.title.replace(/\s/g, '')}()</h4>
                                <p>{h.text}</p>
                            </div>
                        ))}
                        <div className="about-card">
                            <h4>achievements[]</h4>
                            <ul className="about-list">
                                {achievements.map((a) => (
                                    <li key={a}>{a}</li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="hero_actions" style={{ marginTop: 16 }}>
                        <button type="button" className="vs-btn vs-btn--secondary" onClick={() => copyEmail(setCopied)}>
                            <IconCopy /> {copied ? 'Copied email' : 'Copy email'}
                        </button>
                        <a className="vs-btn vs-btn--secondary" href={personalInfo.resumeUrl} target="_blank" rel="noopener noreferrer">
                            <IconExternal /> Open resume
                        </a>
                    </div>
                </div>
            </div>
        </FileShell>
    );
};

export default AboutFile;
