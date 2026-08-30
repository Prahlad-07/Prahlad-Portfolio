/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useIDE } from './IDEContext.jsx';
import { FILES, PROJECT_FILES } from './ide-data.js';
import { IconChevron } from './icons.jsx';

const FileIcon = ({ icon }) => {
    const glyph = { md: 'M↓', json: '{ }', react: '⚛', ts: 'TS', folder: '' }[icon] ?? '·';
    return <span className={`tree_icon i-${icon}`} aria-hidden="true">{glyph}</span>;
};

const Row = ({ depth, twisty, icon, label, active, badge, onClick, href }) => {
    const inner = (
        <>
            <span className="tree_indent" style={{ width: 8 + depth * 12 }} />
            {twisty !== undefined ? <IconChevron open={twisty} /> : <span className="tree_twisty" />}
            <FileIcon icon={icon} />
            <span className="tree_label">{label}</span>
            {badge ? <span className="tree_badge">{badge}</span> : null}
        </>
    );
    if (href) {
        return (
            <a className="tree_row" href={href} target="_blank" rel="noopener noreferrer">
                {inner}
            </a>
        );
    }
    return (
        <button type="button" className={`tree_row ${active ? 'is-active' : ''}`} onClick={onClick}>
            {inner}
        </button>
    );
};

const Explorer = () => {
    const { sidebarOpen, activeFile, openFile } = useIDE();
    const [openFolders, setOpenFolders] = useState({ portfolio: true, src: true, projects: false });
    const toggle = (k) => setOpenFolders((f) => ({ ...f, [k]: !f[k] }));

    const file = (id) => FILES.find((f) => f.id === id);

    return (
        <aside className={`sidebar ${sidebarOpen ? '' : 'is-collapsed'}`} aria-label="Explorer">
            <div className="sidebar_head">
                <span>Explorer</span>
                <span aria-hidden="true">⋯</span>
            </div>
            <div className="sidebar_tree">
                <Row depth={0} twisty={openFolders.portfolio} icon="folder" label="PORTFOLIO" onClick={() => toggle('portfolio')} />
                {openFolders.portfolio && (
                    <>
                        <Row depth={1} icon="md" label="README.md" active={activeFile === 'readme'} onClick={() => openFile('readme')} badge="M" />

                        <Row depth={1} twisty={openFolders.src} icon="folder" label="src" onClick={() => toggle('src')} />
                        {openFolders.src && (
                            <>
                                <Row depth={2} icon="react" label="about.jsx" active={activeFile === 'about'} onClick={() => openFile('about')} />
                                <Row depth={2} icon="json" label="experience.json" active={activeFile === 'experience'} onClick={() => openFile('experience')} />
                                <Row depth={2} icon="json" label="skills.json" active={activeFile === 'skills'} onClick={() => openFile('skills')} />

                                <Row depth={2} twisty={openFolders.projects} icon="folder" label="projects" onClick={() => toggle('projects')} />
                                {openFolders.projects &&
                                    PROJECT_FILES.map((p) => (
                                        <Row
                                            key={p.id}
                                            depth={3}
                                            icon={p.icon}
                                            label={p.name}
                                            active={activeFile === 'projects'}
                                            onClick={() => openFile('projects', { projectIndex: p.projectIndex })}
                                        />
                                    ))}

                                <Row depth={2} icon="ts" label="contact.ts" active={activeFile === 'contact'} onClick={() => openFile('contact')} />
                            </>
                        )}

                        <Row depth={1} icon="md" label="recommendations.md" active={activeFile === 'recommendations'} onClick={() => openFile('recommendations')} />
                    </>
                )}
            </div>
            <div className="sidebar_head" style={{ borderTop: '1px solid var(--border)' }}>
                <span>Outline</span>
            </div>
            <div style={{ padding: '2px 0 10px' }}>
                {FILES.map((f) => (
                    <button
                        key={f.id}
                        type="button"
                        className={`tree_row ${activeFile === f.id ? 'is-active' : ''}`}
                        onClick={() => openFile(f.id)}
                    >
                        <span className="tree_indent" style={{ width: 14 }} />
                        <span className="tree_twisty">#</span>
                        <span className="tree_label">{file(f.id)?.name}</span>
                    </button>
                ))}
            </div>
        </aside>
    );
};

export default Explorer;
