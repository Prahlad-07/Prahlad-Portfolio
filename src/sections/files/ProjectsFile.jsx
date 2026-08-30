import { useEffect, useRef, useState } from 'react';
import FileShell from '../../components/ide/FileShell.jsx';
import CodeBlock from '../../components/ide/CodeBlock.jsx';
import { highlightCode } from '../../components/ide/highlight.js';
import { IconExternal, IconPlay } from '../../components/ide/icons.jsx';
import { useIDE } from '../../components/ide/IDEContext.jsx';
import { myProjects } from '../../constants/index.js';

const SRC = `// projects/index.tsx
import type { Project } from "./types";

export const projects: Project[] = [
${myProjects
        .map(
            (p) =>
                `  { name: "${p.title}", stack: [${p.tags
                    .slice(0, 4)
                    .map((t) => `"${t.name}"`)
                    .join(', ')}], status: "${p.repoState.toLowerCase().includes('public') ? 'public' : 'private'}" },`,
        )
        .join('\n')}
];`;

const ProjectsFile = () => {
    const { projectIndex, setProjectIndex } = useIDE();
    const active = myProjects[projectIndex] ?? myProjects[0];
    const [imgIndex, setImgIndex] = useState(0);
    const [orientation, setOrientation] = useState('landscape');
    const thumbsRef = useRef(null);

    useEffect(() => {
        setImgIndex(0);
        setOrientation('landscape');
    }, [projectIndex]);

    useEffect(() => {
        if (active.images.length < 2) return undefined;
        const t = window.setInterval(() => {
            setImgIndex((i) => (i + 1) % active.images.length);
        }, 4200);
        return () => window.clearInterval(t);
    }, [active.images.length, projectIndex]);

    const img = active.images[imgIndex];

    return (
        <FileShell id="projects">
            <CodeBlock lines={highlightCode(SRC)} />

            <div className="preview">
                <div className="preview_bar">
                    <IconPlay />
                    <span>Preview — projects/ ({myProjects.length} files)</span>
                </div>
                <div className="preview_body">
                    <div className="proj">
                        <div className="proj_list">
                            {myProjects.map((p, i) => (
                                <button
                                    key={p.id}
                                    type="button"
                                    className={`proj_listItem ${i === projectIndex ? 'is-active' : ''}`}
                                    onClick={() => setProjectIndex(i)}
                                >
                                    <span className="proj_mark">{p.mark}</span>
                                    <b>{p.title}</b>
                                </button>
                            ))}
                        </div>

                        <div className="proj_detail">
                            <div className="proj_meta">
                                {active.category} · {active.year} · {active.repoState}
                            </div>
                            <h3 className="proj_title">{active.title}</h3>
                            <p className="proj_summary">{active.summary}</p>

                            <ul className="proj_points">
                                {active.impact.map((pt, i) => (
                                    <li key={pt} data-i={String(i + 1).padStart(2, '0')}>
                                        {pt}
                                    </li>
                                ))}
                            </ul>

                            <div className="proj_tags">
                                {active.tags.map((t) => (
                                    <span className="proj_tag" key={t.id}>
                                        {t.path ? <img src={t.path} alt="" loading="lazy" /> : null}
                                        {t.name}
                                    </span>
                                ))}
                            </div>

                            {active.repoUrl ? (
                                <a className="vs-btn" href={active.repoUrl} target="_blank" rel="noopener noreferrer">
                                    <IconExternal /> {active.repoLabel}
                                </a>
                            ) : (
                                <span className="vs-btn vs-btn--secondary" style={{ opacity: 0.6 }}>
                                    {active.repoLabel}
                                </span>
                            )}

                            <div className="proj_shot">
                                <div className="proj_shotBar">
                                    <i />
                                    <i />
                                    <i />
                                    <span>
                                        {String(imgIndex + 1).padStart(2, '0')} / {String(active.images.length).padStart(2, '0')}
                                    </span>
                                </div>
                                <div className="proj_shotView">
                                    <img
                                        key={img.src}
                                        src={img.src}
                                        alt={img.alt}
                                        loading="lazy"
                                        decoding="async"
                                        style={orientation === 'portrait' ? { maxWidth: '18rem' } : undefined}
                                        onLoad={(e) => {
                                            const { naturalWidth, naturalHeight } = e.currentTarget;
                                            setOrientation(naturalHeight > naturalWidth ? 'portrait' : 'landscape');
                                        }}
                                    />
                                </div>
                                <div className="proj_thumbs" ref={thumbsRef}>
                                    {active.images.map((im, i) => (
                                        <button
                                            key={im.id}
                                            type="button"
                                            className={`proj_thumb ${i === imgIndex ? 'is-active' : ''}`}
                                            onClick={() => setImgIndex(i)}
                                            aria-label={`Screenshot ${i + 1}`}
                                        >
                                            <img src={im.src} alt="" loading="lazy" />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </FileShell>
    );
};

export default ProjectsFile;
