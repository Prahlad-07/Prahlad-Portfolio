import { useEffect, useMemo, useRef, useState } from 'react';
import { useIDE } from './IDEContext.jsx';
import { FILES, PROJECT_FILES } from './ide-data.js';
import { personalInfo } from '../../constants/index.js';

const CommandPalette = () => {
    const { paletteOpen, setPaletteOpen, openFile } = useIDE();
    const [query, setQuery] = useState('');
    const [cursor, setCursor] = useState(0);
    const inputRef = useRef(null);

    const commands = useMemo(() => {
        const fileCmds = FILES.map((f) => ({
            id: f.id,
            label: f.name,
            hint: f.lang,
            run: () => openFile(f.id),
        }));
        const projectCmds = PROJECT_FILES.map((p) => ({
            id: p.id,
            label: p.name,
            hint: 'projects/',
            run: () => openFile('projects', { projectIndex: p.projectIndex }),
        }));
        const links = [
            { id: 'resume', label: 'Open resume.pdf', hint: 'external', run: () => window.open(personalInfo.resumeUrl, '_blank') },
            { id: 'gh', label: 'Open GitHub', hint: 'external', run: () => window.open(personalInfo.socialLinks.github, '_blank') },
            { id: 'li', label: 'Open LinkedIn', hint: 'external', run: () => window.open(personalInfo.socialLinks.linkedin, '_blank') },
            { id: 'mail', label: `Email ${personalInfo.email}`, hint: 'mailto', run: () => { window.location.href = `mailto:${personalInfo.email}`; } },
        ];
        return [...fileCmds, ...projectCmds, ...links];
    }, [openFile]);

    const results = useMemo(() => {
        const q = query.trim().toLowerCase().replace(/^>/, '').trim();
        if (!q) return commands;
        return commands.filter((c) => c.label.toLowerCase().includes(q) || c.hint.toLowerCase().includes(q));
    }, [commands, query]);

    useEffect(() => {
        if (paletteOpen) {
            setQuery('');
            setCursor(0);
            window.setTimeout(() => inputRef.current?.focus(), 20);
        }
    }, [paletteOpen]);

    useEffect(() => {
        setCursor(0);
    }, [query]);

    if (!paletteOpen) return null;

    const onKeyDown = (e) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setCursor((c) => Math.min(c + 1, results.length - 1));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setCursor((c) => Math.max(c - 1, 0));
        } else if (e.key === 'Enter') {
            e.preventDefault();
            results[cursor]?.run();
            setPaletteOpen(false);
        }
    };

    return (
        <div
            className="palette-overlay"
            onMouseDown={(e) => {
                if (e.target === e.currentTarget) setPaletteOpen(false);
            }}
        >
            <div className="palette" role="dialog" aria-label="Command Palette">
                <input
                    ref={inputRef}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={onKeyDown}
                    placeholder="Go to file or command…"
                    aria-label="Command palette input"
                />
                <div className="palette_list">
                    {results.length === 0 && (
                        <div className="palette_item" style={{ opacity: 0.6 }}>
                            No matching results
                        </div>
                    )}
                    {results.map((c, i) => (
                        <button
                            key={c.id}
                            type="button"
                            className={`palette_item ${i === cursor ? 'is-active' : ''}`}
                            onMouseEnter={() => setCursor(i)}
                            onClick={() => {
                                c.run();
                                setPaletteOpen(false);
                            }}
                        >
                            <span>{c.label}</span>
                            <small>{c.hint}</small>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CommandPalette;
