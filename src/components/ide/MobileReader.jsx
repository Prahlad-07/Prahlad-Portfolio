/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react';
import useTheme from '../../hooks/useTheme.js';
import { personalInfo } from '../../constants/index.js';
import { useWorkspace } from './WorkspaceContext.jsx';
import { getSource } from '../../content/source.js';
import { highlight } from './highlight.js';
import CodeBlock from './CodeBlock.jsx';
import FileGlyph from './FileGlyph.jsx';
import MobileTerminal from './MobileTerminal.jsx';
import { IconChevron, IconExternal, IconMenu, IconMoon, IconSun } from './icons.jsx';

import HelloPreview from '../../sections/previews/HelloPreview.jsx';
import AboutPreview from '../../sections/previews/AboutPreview.jsx';
import ExperiencePreview from '../../sections/previews/ExperiencePreview.jsx';
import ProjectsPreview from '../../sections/previews/ProjectsPreview.jsx';
import SkillsPreview from '../../sections/previews/SkillsPreview.jsx';
import RecommendationsPreview from '../../sections/previews/RecommendationsPreview.jsx';
import ContactPreview from '../../sections/previews/ContactPreview.jsx';

const CARDS = [
    { id: 'about', Body: AboutPreview },
    { id: 'experience', Body: ExperiencePreview },
    { id: 'projects', Body: ProjectsPreview },
    { id: 'skills', Body: SkillsPreview },
    { id: 'recommendations', Body: RecommendationsPreview },
    { id: 'contact', Body: ContactPreview },
];

const Peek = ({ id }) => {
    const src = getSource(id).split('\n').filter((l) => l.trim()).slice(0, 3).join('\n');
    return <CodeBlock lines={highlight(src, "ts")} gutter={false} />;
};

const Card = ({ file, Body, expanded, onToggle }) => {
    const [showSource, setShowSource] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        if (expanded && ref.current) {
            ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [expanded]);

    return (
        <section className={`mcard ${expanded ? 'is-open' : ''}`} ref={ref} id={`card-${file.id}`}>
            <button type="button" className="mcard_head" onClick={onToggle} aria-expanded={expanded}>
                <FileGlyph icon={file.icon} />
                <span className="mcard_name">{file.name}</span>
                <span className="mcard_meta">{file.meta}</span>
                <IconChevron open={expanded} />
            </button>

            {!expanded && (
                <div className="mcard_peek" aria-hidden="true">
                    <Peek id={file.id} />
                </div>
            )}

            {expanded && (
                <div className="mcard_body">
                    <Body />
                    <button type="button" className="mcard_src" onClick={() => setShowSource((s) => !s)}>
                        {showSource ? 'hide source' : 'view source'}
                    </button>
                    {showSource && (
                        <div className="mcard_source">
                            <CodeBlock lines={highlight(getSource(file.id), file.lang)} />
                        </div>
                    )}
                </div>
            )}
        </section>
    );
};

const MobileReader = () => {
    const { files, expandedCard, setExpandedCard } = useWorkspace();
    const { theme, toggleTheme } = useTheme();
    const [menuOpen, setMenuOpen] = useState(false);
    const byId = (id) => files.find((f) => f.id === id);

    return (
        <div className="reader">
            <header className="reader_bar">
                <button type="button" className="reader_menu" onClick={() => setMenuOpen(true)} aria-label="Files">
                    <IconMenu />
                </button>
                <span className="reader_brand">prahlad.dev</span>
                <button type="button" className="reader_menu" onClick={toggleTheme} aria-label="Toggle theme">
                    {theme === 'dark' ? <IconSun /> : <IconMoon />}
                </button>
            </header>

            <main className="reader_scroll">
                <section className="reader_hero">
                    <HelloPreview />
                </section>

                {CARDS.map(({ id, Body }) => (
                    <Card
                        key={id}
                        file={byId(id)}
                        Body={Body}
                        expanded={expandedCard === id}
                        onToggle={() => setExpandedCard(expandedCard === id ? null : id)}
                    />
                ))}

                <footer className="reader_foot">
                    <p>{'// built as a code editor with React'}</p>
                    <p>
                        <a href={personalInfo.socialLinks.github} target="_blank" rel="noopener noreferrer">github</a>
                        {' · '}
                        <a href={personalInfo.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">linkedin</a>
                        {' · '}
                        <a href={`mailto:${personalInfo.email}`}>email</a>
                    </p>
                    <p>{`// © ${new Date().getFullYear()} ${personalInfo.fullName}`}</p>
                </footer>
            </main>

            <MobileTerminal />

            {menuOpen && (
                <div className="msheet msheet--files" role="dialog" aria-label="Files">
                    <div className="msheet_head">
                        <span>FILES</span>
                        <button type="button" onClick={() => setMenuOpen(false)}>close</button>
                    </div>
                    <ul className="msheet_files">
                        {files.map((f) => (
                            <li key={f.id}>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setExpandedCard(f.id);
                                        setMenuOpen(false);
                                        if (f.id !== 'hello') {
                                            document.getElementById(`card-${f.id}`)?.scrollIntoView({ behavior: 'smooth' });
                                        } else {
                                            document.querySelector('.reader_scroll')?.scrollTo({ top: 0, behavior: 'smooth' });
                                        }
                                    }}
                                >
                                    <FileGlyph icon={f.icon} />
                                    {f.name}
                                    <span>{f.meta}</span>
                                </button>
                            </li>
                        ))}
                        <li>
                            <a href={personalInfo.resumeUrl} target="_blank" rel="noopener noreferrer">
                                <FileGlyph icon="md" /> resume.pdf <span><IconExternal /></span>
                            </a>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default MobileReader;
