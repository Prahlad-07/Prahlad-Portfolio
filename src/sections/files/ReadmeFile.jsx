import FileShell from '../../components/ide/FileShell.jsx';
import CodeBlock from '../../components/ide/CodeBlock.jsx';
import { highlightMarkdown } from '../../components/ide/highlight.js';
import { IconCopy, IconExternal, IconPlay } from '../../components/ide/icons.jsx';
import { heroMetrics, personalInfo } from '../../constants/index.js';

const MD = `# Prahlad Yadav

> Backend-first engineer. I turn messy problems into clean systems that scale.

\`Full-Stack Engineer\`  \`Delhi, India\`  \`Open to full-time SDE roles\`

## What I do

- I build **fast** backends
- I solve **hard** problems
- I ship **clean** code

## Highlights

- Top 1% competitive programmer — **3000+** problems solved
- **5+** full-stack products shipped to real users
- **2500+** GitHub commits over 12 months, no gaps
- **4** Android apps used by 1000+ campus users

## Run

- \`npm run resume\`   → opens the latest resume
- \`⌘K\`              → jump to any file`;

const ReadmeFile = () => (
    <FileShell id="readme">
        <CodeBlock lines={highlightMarkdown(MD)} />

        <div className="preview">
            <div className="preview_bar">
                <IconPlay />
                <span>Preview — README.md</span>
            </div>
            <div className="preview_body">
                <div className="hero">
                    <div>
                        <p className="hero_kicker">{`// ${personalInfo.availability}`}</p>
                        <h1 className="hero_name">{personalInfo.fullName}</h1>
                        <p className="hero_role">{personalInfo.role} · {personalInfo.location}</p>

                        <div className="hero_lines">
                            <span><span className="tk-comment">const</span> approach = [</span>
                            <span>&nbsp;&nbsp;<span className="tk-string">&quot;build fast backends&quot;</span>,</span>
                            <span>&nbsp;&nbsp;<span className="tk-string">&quot;solve hard problems&quot;</span>,</span>
                            <span>&nbsp;&nbsp;<span className="tk-string">&quot;ship clean code&quot;</span>,</span>
                            <span>];</span>
                        </div>

                        <div className="hero_tags">
                            <span className="hero_tag">Backend</span>
                            <span className="hero_tag">Frontend</span>
                            <span className="hero_tag">Mobile</span>
                            <span className="hero_tag">DSA</span>
                        </div>

                        <div className="hero_actions">
                            <a className="vs-btn" href={personalInfo.resumeUrl} target="_blank" rel="noopener noreferrer">
                                <IconExternal /> View Resume
                            </a>
                            <a className="vs-btn vs-btn--secondary" href="#file-contact">
                                Let&apos;s Talk
                            </a>
                            <a
                                className="vs-btn vs-btn--secondary"
                                href={personalInfo.socialLinks.github}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <IconCopy /> GitHub
                            </a>
                        </div>
                    </div>

                    <div className="hero_photo">
                        <img
                            src="/assets/Prahlad_Yadav_Photo.jpeg"
                            alt="Prahlad Yadav"
                            loading="eager"
                            decoding="async"
                        />
                    </div>
                </div>

                <div className="stat-grid">
                    {heroMetrics.map((m) => (
                        <div className="stat" key={m.id}>
                            <b>{m.value}</b>
                            <span>{m.label}</span>
                            <i>{m.detail}</i>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </FileShell>
);

export default ReadmeFile;
